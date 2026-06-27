const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export const api = {
  async fetchTMDB(endpoint: string, params: Record<string, string | number> = {}) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const url = new URL('/api/tmdb', typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    url.searchParams.append('endpoint', cleanEndpoint);
    
    for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, value.toString());
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    return response.json();
  },

  async getTrendingMovies(page = 1) {
    return this.fetchTMDB('/movie/now_playing', { page, region: 'JP' });
  },

  async searchMovies(query: string, page = 1) {
    return this.fetchTMDB('/search/movie', { query, page });
  },

  async getMovieDetails(id: string | number) {
    return this.fetchTMDB(`/movie/${id}`, { append_to_response: 'credits,videos' });
  },

  async getMovieProviders(id: string | number) {
    return this.fetchTMDB(`/movie/${id}/watch/providers`);
  },

  getImageUrl(path: string | null | undefined, size = 'w500') {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `${IMAGE_BASE_URL}${size}${path}`;
  }
};
