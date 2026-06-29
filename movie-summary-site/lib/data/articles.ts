import fs from 'fs';
import path from 'path';

export interface Article {
  id: string;
  title: string;
  date: string;
  description: string;
  contentHtml: string;
  movieQueries: { title: string; year?: number; searchQuery?: string }[];
}

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');

// Lightweight custom YAML frontmatter parser to avoid external dependencies
function parseSimpleYamlFrontmatter(fileContents: string) {
  const matterRegex = /^---\n([\s\S]+?)\n---\n([\s\S]*)$/;
  const match = fileContents.match(matterRegex);
  
  if (!match) return { data: {}, content: fileContents };
  
  const frontmatterStr = match[1];
  const content = match[2];
  
  const data: any = {};
  const lines = frontmatterStr.split('\n');
  
  let currentKey = '';
  let inArray = false;
  let currentArray: any[] = [];
  let currentObject: any = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') continue;
    
    // Array item start
    if (line.startsWith('  - ')) {
      if (inArray && Object.keys(currentObject).length > 0) {
        currentArray.push({...currentObject});
      }
      inArray = true;
      currentObject = {};
      
      const kvMatch = line.match(/^  - (\w+):\s*(.+)$/);
      if (kvMatch) {
        let val: any = kvMatch[2].replace(/^["']|["']$/g, '');
        if (!isNaN(Number(val))) val = Number(val);
        currentObject[kvMatch[1]] = val;
      }
    } 
    // Array item property
    else if (line.startsWith('    ') && inArray) {
      const kvMatch = line.match(/^    (\w+):\s*(.+)$/);
      if (kvMatch) {
        let val: any = kvMatch[2].replace(/^["']|["']$/g, '');
        if (!isNaN(Number(val))) val = Number(val);
        currentObject[kvMatch[1]] = val;
      }
    } 
    // Root level property
    else {
      if (inArray) {
        if (Object.keys(currentObject).length > 0) {
          currentArray.push({...currentObject});
        }
        data[currentKey] = currentArray;
        inArray = false;
        currentArray = [];
        currentObject = {};
      }
      
      const rootMatch = line.match(/^(\w+):\s*(.+)?$/);
      if (rootMatch) {
        currentKey = rootMatch[1];
        if (rootMatch[2]) {
          data[currentKey] = rootMatch[2].replace(/^["']|["']$/g, '');
        } else {
          data[currentKey] = [];
        }
      }
    }
  }
  
  if (inArray && Object.keys(currentObject).length > 0) {
    currentArray.push({...currentObject});
    data[currentKey] = currentArray;
  }
  
  return { data, content };
}

// Simple Markdown to HTML converter (Paragraphs)
function simpleMarkdownToHtml(markdown: string) {
  return markdown
    .trim()
    .split('\n\n')
    .map(para => `<p>${para.replace(/\n/g, '<br/>')}</p>`)
    .join('\n');
}

export function getArticles(): Article[] {
  let fileNames;
  try {
    fileNames = fs.readdirSync(articlesDirectory);
  } catch (e) {
    return []; // Directory might not exist yet
  }
  
  const allArticles = fileNames
    .filter(fileName => fileName.endsWith('.md') && !fileName.startsWith('.'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const matterResult = parseSimpleYamlFrontmatter(fileContents);
      
      return {
        id,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
        description: matterResult.data.description || '',
        movieQueries: matterResult.data.movieQueries || [],
        contentHtml: simpleMarkdownToHtml(matterResult.content),
      };
    });
    
  // Sort articles by date
  return allArticles.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getArticleById(id: string): Article | undefined {
  const articles = getArticles();
  return articles.find(article => article.id === id);
}

// Provide backward compatibility for existing imports
export const articles = getArticles();
