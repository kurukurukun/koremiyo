export default async function handler(req, res) {
    const { endpoint, ...queryParams } = req.query;

    if (!endpoint) {
        return res.status(400).json({ error: 'Endpoint is required' });
    }

    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    
    if (!TMDB_API_KEY) {
        return res.status(500).json({ error: 'TMDB_API_KEY is not configured on the server' });
    }

    try {
        // Construct the query string from remaining parameters
        const searchParams = new URLSearchParams(queryParams);
        searchParams.append('api_key', TMDB_API_KEY);
        
        // Ensure language is set if not provided
        if (!searchParams.has('language')) {
            searchParams.append('language', 'ja-JP');
        }

        // Endpoint will be something like "movie/popular" or "search/movie"
        const tmdbUrl = `https://api.themoviedb.org/3/${endpoint}?${searchParams.toString()}`;
        
        const response = await fetch(tmdbUrl);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        // Vercel Edge Cache: Cache for 1 hour, serve stale up to 1 day while revalidating
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
        res.status(200).json(data);
    } catch (error) {
        console.error('TMDB API Proxy Error:', error);
        res.status(500).json({ error: 'Internal Server Error fetching from TMDB' });
    }
}
