import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint');
  
  if (!endpoint) {
    return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
  }

  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  if (!TMDB_API_KEY) {
    return NextResponse.json({ error: 'TMDB_API_KEY is not configured on the server' }, { status: 500 });
  }

  try {
    const tmdbParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== 'endpoint') {
        tmdbParams.append(key, value);
      }
    });
    
    tmdbParams.append('api_key', TMDB_API_KEY);
    if (!tmdbParams.has('language')) {
      tmdbParams.append('language', 'ja-JP');
    }

    const tmdbUrl = `https://api.themoviedb.org/3/${endpoint}?${tmdbParams.toString()}`;
    
    const response = await fetch(tmdbUrl, {
      next: { revalidate: 3600 }
    });
    
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('TMDB API Proxy Error:', error);
    return NextResponse.json({ error: 'Internal Server Error fetching from TMDB' }, { status: 500 });
  }
}
