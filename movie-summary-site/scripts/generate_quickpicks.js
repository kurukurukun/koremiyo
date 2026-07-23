const fs = require('fs');
const https = require('https');
const path = require('path');

// Execute GET request
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

// Read and parse the TS files by removing 'export const ... =' and evaluating
function readArrayFromTs(filePath, arrayName) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Very hacky but works for this specific format
  const match = content.match(new RegExp(`export const ${arrayName} = (\\[[\\s\\S]*?\\]);`));
  if (match && match[1]) {
    // replace unquoted keys with quoted keys for JSON.parse if needed, or just use eval
    let jsonStr = match[1]
      .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":') // quote keys
      .replace(/'/g, '"') // replace single quotes
      .replace(/,\s*]/g, ']'); // remove trailing commas
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      // Fallback to eval since it's our own trusted local file
      return eval(match[1]);
    }
  }
  return [];
}

async function run() {
  const basePath = path.join(__dirname, '..', 'lib', 'data');
  const academy = readArrayFromTs(path.join(basePath, 'academy.ts'), 'academyWinners');
  const academyShort = readArrayFromTs(path.join(basePath, 'academy_short.ts'), 'academyShortWinners');
  const gg = readArrayFromTs(path.join(basePath, 'golden_globe.ts'), 'goldenGlobeWinners');
  const ggc = readArrayFromTs(path.join(basePath, 'golden_globe.ts'), 'goldenGlobeComedyWinners');

  // Combine and deduplicate by title
  const allMovies = [...academy, ...academyShort, ...gg, ...ggc];
  const uniqueMoviesMap = new Map();
  for (const m of allMovies) {
    if (!uniqueMoviesMap.has(m.title)) {
      uniqueMoviesMap.set(m.title, m);
    }
  }
  const uniqueMovies = Array.from(uniqueMoviesMap.values());
  
  console.log(`Processing ${uniqueMovies.length} unique movies...`);

  const results = [];
  
  for (let i = 0; i < uniqueMovies.length; i++) {
    const movie = uniqueMovies[i];
    const query = movie.searchQuery || movie.title;
    console.log(`[${i+1}/${uniqueMovies.length}] Fetching: ${query}`);
    
    try {
      // 1. Search
      const searchUrl = `https://www.koremiyo.com/api/tmdb?endpoint=search/movie&query=${encodeURIComponent(query)}&primary_release_year=${movie.year}`;
      let searchData = await fetchJson(searchUrl);
      
      if (!searchData || !searchData.results || searchData.results.length === 0) {
        // Fallback without year
        const searchUrl2 = `https://www.koremiyo.com/api/tmdb?endpoint=search/movie&query=${encodeURIComponent(query)}`;
        searchData = await fetchJson(searchUrl2);
      }

      if (searchData && searchData.results && searchData.results.length > 0) {
        const tmdbMovie = searchData.results[0];
        
        // 2. Details
        const detailsUrl = `https://www.koremiyo.com/api/tmdb?endpoint=movie/${tmdbMovie.id}`;
        const details = await fetchJson(detailsUrl);
        
        if (details) {
          const runtime = details.runtime || 120;
          let timeCategory = '120';
          if (runtime <= 105) timeCategory = '90';
          else if (runtime >= 136) timeCategory = '150';

          const genres = details.genres ? details.genres.map(g => g.name) : [];
          let mood = 'emotional'; // default
          
          if (genres.includes('コメディ') || genres.includes('ファミリー') || genres.includes('アニメーション') || genres.includes('音楽')) {
            mood = 'relaxing';
          }
          if (genres.includes('アクション') || genres.includes('スリラー') || genres.includes('ホラー') || genres.includes('SF') || genres.includes('アドベンチャー') || genres.includes('犯罪')) {
            mood = 'exciting';
          }
          
          // Generate short description from overview
          let desc = details.overview || "あらすじがありません。";
          if (desc.length > 50) {
            desc = desc.substring(0, 50) + '...';
          }
          if (desc.includes('あらすじがありません')) {
            desc = "数々の賞を受賞した、世界が認める名作です。";
          }

          results.push({
            title: movie.title,
            year: movie.year,
            searchQuery: movie.searchQuery,
            timeCategory,
            mood,
            description: desc
          });
          
          // Rate limit protection
          await new Promise(r => setTimeout(r, 200));
        } else {
          console.log(`Failed details for ${query}`);
        }
      } else {
        console.log(`Not found in search: ${query}`);
      }
    } catch (e) {
      console.error(`Error processing ${query}:`, e);
    }
  }

  // Write to quickpicks.ts
  let tsContent = `export type TimeCategory = '90' | '120' | '150';\n`;
  tsContent += `export type MoodCategory = 'exciting' | 'emotional' | 'relaxing';\n\n`;
  tsContent += `export interface QuickPickMovie {\n  title: string;\n  searchQuery?: string;\n  year?: number;\n  timeCategory: TimeCategory;\n  mood: MoodCategory;\n  description: string;\n}\n\n`;
  tsContent += `export const quickPicks: QuickPickMovie[] = [\n`;
  
  for (const r of results) {
    tsContent += `  {\n`;
    tsContent += `    title: "${r.title}",\n`;
    if (r.year) tsContent += `    year: ${r.year},\n`;
    if (r.searchQuery) tsContent += `    searchQuery: "${r.searchQuery}",\n`;
    tsContent += `    timeCategory: '${r.timeCategory}',\n`;
    tsContent += `    mood: '${r.mood}',\n`;
    tsContent += `    description: "${r.description.replace(/"/g, '\\"')}"\n`;
    tsContent += `  },\n`;
  }
  
  tsContent += `];\n`;

  fs.writeFileSync(path.join(basePath, 'quickpicks.ts'), tsContent, 'utf-8');
  console.log(`Successfully generated quickpicks.ts with ${results.length} movies!`);
}

run();
