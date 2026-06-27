export async function fetchTMDBServer(endpoint: string, params: Record<string, string | number> = {}) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  if (!TMDB_API_KEY) throw new Error('TMDB_API_KEY is not configured on the server');

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const tmdbParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(params)) {
    tmdbParams.append(key, value.toString());
  }
  
  tmdbParams.append('api_key', TMDB_API_KEY);
  if (!tmdbParams.has('language')) {
    tmdbParams.append('language', 'ja-JP');
  }

  const url = `https://api.themoviedb.org/3/${cleanEndpoint}?${tmdbParams.toString()}`;
  
  const response = await fetch(url, { next: { revalidate: 3600 } });
  
  if (!response.ok) {
    throw new Error(`TMDB Server API Error: ${response.status}`);
  }
  
  return response.json();
}
