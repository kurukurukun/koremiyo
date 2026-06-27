// ==========================================
// 💰 アフィリエイトリンク設定エリア
// ==========================================
// A8.netなどで取得した「テキストリンク用URL（https://...）」を以下に貼り付けてください。
// 設定されていないサービスは、自動的にGoogle検索へ飛びます。
const AFFILIATE_LINKS = {
    'U-NEXT': 'https://t.afi-b.com/xxxx/unext', // ←ここにU-NEXTのリンクを貼る
    'Amazon Prime Video': 'https://amzn.to/xxxx', // ←ここにAmazonのリンクを貼る
    'Hulu': 'https://t.afi-b.com/xxxx/hulu',      // ←ここにHuluのリンクを貼る
    'Netflix': 'https://www.netflix.com/jp/',     // (Netflixはアフィリエイトがないため公式サイト)
    'Disney Plus': 'https://www.disneyplus.com/ja-jp' // (Disney+のアフィリがあれば差し替え)
};
// ==========================================

class UIManager {
    constructor() {
        this.heroSection = document.getElementById('heroSection');
        this.heroTitle = document.getElementById('heroTitle');
        this.heroOverview = document.getElementById('heroOverview');
        this.heroBackdrop = document.getElementById('heroBackdrop');
        this.heroMoreBtn = document.getElementById('heroMoreBtn');
        
        this.sectionTitle = document.getElementById('sectionTitle');
        this.moviesGrid = document.getElementById('moviesGrid');
        this.loader = document.getElementById('loader');
        
        this.movieModal = document.getElementById('movieModal');
        this.movieModalBody = document.getElementById('movieModalBody');
        
        this.settingsModal = document.getElementById('settingsModal');
        this.apiKeyInput = document.getElementById('apiKeyInput');
    }

    showLoader() {
        this.loader.style.display = 'flex';
        this.moviesGrid.style.display = 'none';
    }

    hideLoader() {
        this.loader.style.display = 'none';
        this.moviesGrid.style.display = 'grid';
    }

    renderHero(movie) {
        if (!movie) return;
        this.heroTitle.textContent = movie.title || movie.original_title;
        this.heroOverview.textContent = movie.overview || 'あらすじがありません。';
        
        const backdropUrl = api.getImageUrl(movie.backdrop_path, 'original');
        this.heroBackdrop.style.backgroundImage = `url('${backdropUrl}')`;
        
        this.heroMoreBtn.style.display = 'inline-flex';
        this.heroMoreBtn.onclick = () => window.dispatchEvent(new CustomEvent('openMovie', { detail: movie.id }));
    }

    renderMovieGrid(movies, title = "トレンド映画") {
        this.sectionTitle.textContent = title;
        this.moviesGrid.innerHTML = '';

        if (!movies || movies.length === 0) {
            this.moviesGrid.innerHTML = '<p>映画が見つかりませんでした。</p>';
            return;
        }

        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            
            const posterUrl = movie.poster_path ? api.getImageUrl(movie.poster_path, 'w500') : 'https://via.placeholder.com/500x750?text=No+Image';
            
            // Format rating
            const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '-';

            card.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title}" class="movie-poster" loading="lazy">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-rating">
                        <i class="fa-solid fa-star"></i> ${rating}
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                window.dispatchEvent(new CustomEvent('openMovie', { detail: movie.id }));
            });

            this.moviesGrid.appendChild(card);
        });
    }

    renderAcademyGrid(movies, title = "歴代アカデミー賞 作品賞") {
        this.sectionTitle.textContent = title;
        this.moviesGrid.innerHTML = '';

        if (!movies || movies.length === 0) {
            this.moviesGrid.innerHTML = '<p>データがありません。</p>';
            return;
        }

        movies.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            
            // For now, use a generic placeholder or fetch poster by title
            // If we want to fetch the poster dynamically we can, but let's use a nice title placeholder first
            const posterUrl = 'https://via.placeholder.com/500x750/1a1d24/e50914?text=' + encodeURIComponent(movie.title);

            card.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title}" class="movie-poster" loading="lazy" id="poster-${movie.year}">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.year}年受賞: ${movie.title}</h3>
                    <div class="movie-rating academy-scores">
                        <div>映画.com: <span class="eiga"><i class="fa-solid fa-star"></i> ${movie.eigaScore}</span></div>
                        <div>Filmarks: <span class="filmarks"><i class="fa-solid fa-star"></i> ${movie.filmarksScore}</span></div>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                // Trigger an open search event or open movie detail if we get TMDB id
                window.dispatchEvent(new CustomEvent('openAcademyMovie', { detail: movie }));
            });

            this.moviesGrid.appendChild(card);
            
            // Asynchronously fetch poster from TMDB to update the placeholder
            window.dispatchEvent(new CustomEvent('fetchPoster', { detail: { title: movie.title, year: movie.year, imgElementId: `poster-${movie.year}` } }));
        });
    }

    async renderMovieDetails(movie) {
        let eigaScore = '?.?';
        let filmarksScore = '?.?';

        // Check if the movie is in academyWinners or goldenGlobeWinners to use scraped scores
        let matched = null;
        if (typeof academyWinners !== 'undefined') {
            matched = academyWinners.find(m => m.title === movie.title || m.title === movie.original_title);
        }
        if (!matched && typeof goldenGlobeWinners !== 'undefined') {
            matched = goldenGlobeWinners.find(m => m.title === movie.title || m.title === movie.original_title);
        }
        
        if (matched) {
            eigaScore = matched.eigaScore || eigaScore;
            filmarksScore = matched.filmarksScore || filmarksScore;
        }

        const posterUrl = movie.poster_path ? api.getImageUrl(movie.poster_path, 'w500') : 'https://via.placeholder.com/500x750?text=No+Image';
        const backdropUrl = movie.backdrop_path ? api.getImageUrl(movie.backdrop_path, 'original') : '';
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '-';
        const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '不明';
        const genres = movie.genres ? movie.genres.map(g => `<span class="genre-tag">${g.name}</span>`).join('') : '';

        // Generate search links for Eiga.com and Filmarks
        const encodedTitle = encodeURIComponent(movie.title);
        const eigaSearchUrl = `https://eiga.com/search/${encodedTitle}/`;
        const filmarksSearchUrl = `https://filmarks.com/search/movies?q=${encodedTitle}`;

        // Fetch VOD Providers
        let providersHtml = '';
        try {
            const providersData = await api.getMovieProviders(movie.id);
            const jpProviders = providersData.results?.JP?.flatrate; // flatrate = 見放題
            
            if (jpProviders && jpProviders.length > 0) {
                providersHtml = '<div class="vod-providers" style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);"><h3><i class="fa-solid fa-play"></i> 現在配信中のサービス</h3><div class="provider-list" style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">';
                jpProviders.forEach(provider => {
                    // アフィリエイトリンクがない場合はGoogle検索へ
                    const link = AFFILIATE_LINKS[provider.provider_name] || `https://www.google.com/search?q=${encodedTitle}+${provider.provider_name}`;
                    const logoUrl = api.getImageUrl(provider.logo_path, 'original');
                    providersHtml += `
                        <a href="${link}" target="_blank" class="provider-link" title="${provider.provider_name}で見る" style="display: flex; align-items: center; gap: 0.5rem; background: var(--surface-light); padding: 0.5rem 1rem; border-radius: 8px; color: var(--text-color); text-decoration: none; transition: background 0.3s;">
                            <img src="${logoUrl}" alt="${provider.provider_name}" class="provider-logo" style="width: 30px; height: 30px; border-radius: 4px;">
                            <span style="font-size: 0.9rem; font-weight: 600;">${provider.provider_name}</span>
                        </a>
                    `;
                });
                providersHtml += '</div></div>';
            }
        } catch (error) {
            console.warn('Could not fetch VOD providers', error);
        }

        this.movieModalBody.innerHTML = `
            ${backdropUrl ? `<div class="modal-hero"><div class="modal-hero-overlay"></div><img src="${backdropUrl}" alt="backdrop"></div>` : ''}
            <div class="modal-details" style="${!backdropUrl ? 'margin-top: 0;' : ''}">
                <img src="${posterUrl}" alt="poster" class="modal-poster">
                <div class="modal-info">
                    <h2>${movie.title}</h2>
                    <div class="modal-meta">
                        <span>${releaseYear}</span>
                        <span>${movie.runtime ? movie.runtime + '分' : '-'}</span>
                    </div>
                    <div class="modal-genres">${genres}</div>
                    <p class="modal-overview">${movie.overview || '日本語のあらすじが提供されていません。'}</p>
                    
                    ${providersHtml}

                    <div class="rating-blocks" style="${providersHtml ? 'margin-top: 2rem;' : ''}">
                        <div class="rating-block tmdb">
                            <span class="brand">TMDB</span>
                            <div class="score"><i class="fa-solid fa-star"></i> ${rating}</div>
                        </div>
                        <div class="rating-block eiga">
                            <span class="brand">映画.com</span>
                            <div class="score"><i class="fa-solid fa-star"></i> ${eigaScore}</div>
                            <a href="${eigaSearchUrl}" target="_blank" class="rating-btn">レビューを検索</a>
                        </div>
                        <div class="rating-block filmarks">
                            <span class="brand">Filmarks</span>
                            <div class="score"><i class="fa-solid fa-star"></i> ${filmarksScore}</div>
                            <a href="${filmarksSearchUrl}" target="_blank" class="rating-btn">レビューを検索</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.showModal('movieModal');

        // SPA SEO対策: 動的タイトルの変更
        document.title = `${movie.title} - コレミヨ(KOREMIYO) | おすすめ名作映画`;
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', `${movie.title} - コレミヨ(KOREMIYO)`);

        // JSON-LD 構造化データの追加（Googleの検索結果リッチスニペット対応）
        let schemaScript = document.getElementById('movie-schema');
        if (!schemaScript) {
            schemaScript = document.createElement('script');
            schemaScript.id = 'movie-schema';
            schemaScript.type = 'application/ld+json';
            document.head.appendChild(schemaScript);
        }
        
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "Movie",
            "name": movie.title,
            "image": posterUrl,
            "dateCreated": movie.release_date || "",
            "description": movie.overview || 'コレミヨがおすすめする名作映画です。'
        };
        
        // TMDBの評価データがあれば構造化データに追加
        if (movie.vote_average && movie.vote_count) {
            schemaData.aggregateRating = {
                "@type": "AggregateRating",
                "ratingValue": movie.vote_average.toFixed(1),
                "bestRating": "10",
                "ratingCount": movie.vote_count
            };
        }
        
        schemaScript.textContent = JSON.stringify(schemaData);
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    showError(message) {
        // Simple error display
        this.moviesGrid.innerHTML = `<div style="text-align: center; width: 100%; padding: 2rem; color: var(--primary-color);">${message}</div>`;
    }
}

const ui = new UIManager();
