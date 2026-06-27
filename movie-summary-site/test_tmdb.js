const https = require('https');
const API_KEY = process.env.TMDB_API_KEY;

function search(query) {
  return new Promise((resolve, reject) => {
    https.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ja-JP&query=${encodeURIComponent(query)}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data).results));
    }).on('error', reject);
  });
}

async function run() {
  const q1 = await search('つばさ');
  console.log('つばさ:', q1.map(m => `${m.title} (${m.release_date}) - ID: ${m.id}`).slice(0, 3));
  
  const q2 = await search('西部戦線異状なし');
  console.log('西部戦線異状なし:', q2.map(m => `${m.title} (${m.release_date}) - ID: ${m.id}`).slice(0, 3));
  
  const q3 = await search('グランド・ホテル');
  console.log('グランド・ホテル:', q3.map(m => `${m.title} (${m.release_date}) - ID: ${m.id}`).slice(0, 3));
  
  const q4 = await search('我が道を往く');
  console.log('我が道を往く:', q4.map(m => `${m.title} (${m.release_date}) - ID: ${m.id}`).slice(0, 3));
  
  const q5 = await search('マーティ');
  console.log('マーティ:', q5.map(m => `${m.title} (${m.release_date}) - ID: ${m.id}`).slice(0, 3));
}
run();
