document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const closeMovieModal = document.getElementById('closeMovieModal');
    const header = document.querySelector('header');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const logoBtn = document.getElementById('logoBtn');
    
    // Store current state
    let currentTrendingMovies = [];
    let academyMoviesCache = {}; // cache TMDB details for academy movies
    initApp();

    // Scroll Effect for Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // App Initialization
    async function initApp() {
        ui.showLoader();
        try {
            const data = await api.getTrendingMovies();
            if (data && data.results) {
                currentTrendingMovies = data.results;
                // Randomly pick one trending movie for the Hero section
                const randomHero = data.results[Math.floor(Math.random() * Math.min(10, data.results.length))];
                ui.renderHero(randomHero);
                
                // Render grid
                if (document.querySelector('.tab-btn.active').dataset.tab === 'trending') {
                    ui.renderMovieGrid(data.results);
                }
            }
        } catch (error) {
            console.error('Failed to load trending movies:', error);
            if (error.message.includes('API Key')) {
                ui.showError('通信エラー：APIキーまたはローカルサーバー（vercel dev）の起動状態を確認してください。');
            } else {
                ui.showError('データの読み込みに失敗しました。');
            }
        } finally {
            ui.hideLoader();
        }

        // Check URL for routing
        const urlParams = new URLSearchParams(window.location.search);
        const movieIdFromUrl = urlParams.get('movie');
        if (movieIdFromUrl) {
            window.dispatchEvent(new CustomEvent('openMovie', { detail: { id: movieIdFromUrl, skipUrlUpdate: true } }));
        }
    }

    // Search Logic
    async function handleSearch() {
        const query = searchInput.value.trim();
        if (!query) return;

        ui.showLoader();
        try {
            const data = await api.searchMovies(query);
            if (data && data.results) {
                ui.renderMovieGrid(data.results, `「${query}」の検索結果`);
                // scroll to results
                document.getElementById('sectionTitle').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } catch (error) {
            console.error('Search failed:', error);
            ui.showError('検索中にエラーが発生しました。');
        } finally {
            ui.hideLoader();
        }
    }

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Tab Switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const tab = btn.dataset.tab;
            if (tab === 'trending') {
                ui.renderMovieGrid(currentTrendingMovies, "公開中の話題作");
            } else if (tab === 'academy') {
                if (typeof academyWinners !== 'undefined') {
                    ui.renderAcademyGrid(academyWinners, "歴代アカデミー賞 作品賞");
                } else {
                    ui.showError('アカデミー賞のデータが見つかりません。');
                }
            } else if (tab === 'goldenglobe') {
                if (typeof goldenGlobeWinners !== 'undefined') {
                    ui.renderAcademyGrid(goldenGlobeWinners, "ゴールデングローブ賞 映画部門 作品賞（ドラマ部門）");
                } else {
                    ui.showError('ゴールデングローブ賞のデータが見つかりません。');
                }
            }
        });
    });

    // Logo Click (Return to top / trending)
    if (logoBtn) {
        logoBtn.addEventListener('click', () => {
            // Reset to trending tab
            tabBtns.forEach(b => b.classList.remove('active'));
            const trendingBtn = document.querySelector('.tab-btn[data-tab="trending"]');
            if (trendingBtn) trendingBtn.classList.add('active');
            
            // Render trending
            ui.renderMovieGrid(currentTrendingMovies, "公開中の話題作");
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Modal Events

    closeMovieModal.addEventListener('click', () => {
        ui.hideModal('movieModal');
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete('movie');
        window.history.pushState(null, '', newUrl);

        // SEO対策: タイトルを元に戻す
        document.title = "コレミヨ (KOREMIYO) - 歴代アカデミー賞から厳選！外さないおすすめ名作映画まとめ";
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', "コレミヨ(KOREMIYO) - 歴代アカデミー賞から厳選！外さないおすすめ名作映画");
    });

    // Listen for custom 'openMovie' event triggered by ui.js
    window.addEventListener('openMovie', async (e) => {
        const data = e.detail;
        const movieId = data.id || data;
        const skipUrlUpdate = data.skipUrlUpdate || false;

        if (!movieId) return;

        if (!skipUrlUpdate) {
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('movie', movieId);
            window.history.pushState({ movieId }, '', newUrl);
        }

        try {
            const movieDetails = await api.getMovieDetails(movieId);
            ui.renderMovieDetails(movieDetails);
        } catch (error) {
            console.error('Failed to fetch movie details:', error);
            alert('映画の詳細を取得できませんでした。');
        }
    });

    // Handle fetching poster dynamically for Academy list
    window.addEventListener('fetchPoster', async (e) => {
        const { title, year, imgElementId } = e.detail;
        if (!api.hasApiKey()) return;
        
        try {
            // Check cache first
            if (!academyMoviesCache[title]) {
                const data = await api.searchMovies(title);
                if (data && data.results && data.results.length > 0) {
                    // Try to match year, or just take the first
                    const matched = data.results.find(m => m.release_date && m.release_date.startsWith(year.toString())) || data.results[0];
                    academyMoviesCache[title] = matched;
                }
            }
            
            const movie = academyMoviesCache[title];
            if (movie && movie.poster_path) {
                const imgEl = document.getElementById(imgElementId);
                if (imgEl) {
                    imgEl.src = api.getImageUrl(movie.poster_path, 'w500');
                }
            }
        } catch (error) {
            console.warn(`Could not fetch poster for ${title}`);
        }
    });

    // Handle opening static movie modal (for both Academy and Golden Globe)
    window.addEventListener('openAcademyMovie', async (e) => {
        const staticData = e.detail;
        const cachedMovie = academyMoviesCache[staticData.title];
        
        if (cachedMovie && cachedMovie.id) {
            // Trigger regular TMDB fetch using the cached ID
            window.dispatchEvent(new CustomEvent('openMovie', { detail: cachedMovie.id }));
        } else {
            // Fallback: If TMDB data not found, display simple modal
            ui.movieModalBody.innerHTML = `
                <div class="modal-details" style="margin-top: 0; display: block; text-align: center;">
                    <h2>${staticData.year}年: ${staticData.title}</h2>
                    <p style="margin: 2rem 0;">TMDBからの詳細データが取得できませんでした。</p>
                    <div class="rating-blocks" style="justify-content: center;">
                        <div class="rating-block eiga">
                            <span class="brand">映画.com</span>
                            <div class="score"><i class="fa-solid fa-star"></i> ${staticData.eigaScore}</div>
                            <a href="https://eiga.com/search/${encodeURIComponent(staticData.title)}/" target="_blank" class="rating-btn">レビューを検索</a>
                        </div>
                        <div class="rating-block filmarks">
                            <span class="brand">Filmarks</span>
                            <div class="score"><i class="fa-solid fa-star"></i> ${staticData.filmarksScore}</div>
                            <a href="https://filmarks.com/search/movies?q=${encodeURIComponent(staticData.title)}" target="_blank" class="rating-btn">レビューを検索</a>
                        </div>
                    </div>
                </div>
            `;
            ui.showModal('movieModal');
        }
    });

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            ui.hideModal(e.target.id);
            if (e.target.id === 'movieModal') {
                const newUrl = new URL(window.location);
                newUrl.searchParams.delete('movie');
                window.history.pushState(null, '', newUrl);

                // SEO対策: タイトルを元に戻す
                document.title = "コレミヨ (KOREMIYO) - 今日の映画選びを絶対に外さない";
                const ogTitle = document.querySelector('meta[property="og:title"]');
                if (ogTitle) ogTitle.setAttribute('content', "コレミヨ (KOREMIYO)");
            }
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const movieIdFromUrl = urlParams.get('movie');
        if (movieIdFromUrl) {
            window.dispatchEvent(new CustomEvent('openMovie', { detail: { id: movieIdFromUrl, skipUrlUpdate: true } }));
        } else {
            ui.hideModal('movieModal');
            document.title = "コレミヨ (KOREMIYO) - 今日の映画選びを絶対に外さない";
        }
    });
});
