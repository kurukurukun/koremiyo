const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

class MovieAPI {
    constructor() {
        // API Proxyを使用するため、ローカルストレージのキー管理は不要
    }

    hasApiKey() {
        // プロキシ側でキーを持っているため常にtrueを返す
        return true;
    }

    async _fetch(endpoint, params = {}) {
        // 先頭のスラッシュを削除（例: '/movie/popular' -> 'movie/popular'）
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
        
        // Vercel Serverless Functionを叩く
        // 注意: ローカル環境の場合は `vercel dev` コマンドで起動する必要があります
        const url = new URL('/api/tmdb', window.location.origin);
        url.searchParams.append('endpoint', cleanEndpoint);
        
        for (const [key, value] of Object.entries(params)) {
            url.searchParams.append(key, value);
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            alert('API通信エラーが発生しました。ローカル環境の場合は vercel dev で起動しているか確認してください。');
            throw error;
        }
    }

    async getTrendingMovies(page = 1) {
        // 「日本で現在公開中の映画 (Now Playing in JP)」を取得
        // デフォルトで人気順（popularity.desc）に近い形で返ってきます
        return this._fetch('/movie/now_playing', { page, region: 'JP' });
    }

    async searchMovies(query, page = 1) {
        return this._fetch('/search/movie', { query, page });
    }

    async getMovieDetails(id) {
        return this._fetch(`/movie/${id}`, { append_to_response: 'credits,videos' });
    }

    async getMovieProviders(id) {
        return this._fetch(`/movie/${id}/watch/providers`);
    }

    getImageUrl(path, size = 'w500') {
        if (!path) return 'assets/no-image.png'; // Placeholder if no image
        return `${IMAGE_BASE_URL}${size}${path}`;
    }
}

const api = new MovieAPI();
