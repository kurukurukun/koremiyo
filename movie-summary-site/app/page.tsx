'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { academyWinners } from '@/lib/data/academy';
import { goldenGlobeWinners, goldenGlobeComedyWinners } from '@/lib/data/golden_globe';
import { trendingMovies } from '@/lib/data/trending';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import Logo from '@/components/Logo';
import HamburgerMenu from '@/components/HamburgerMenu';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'trending' | 'academy' | 'goldenglobe' | 'goldenglobe-comedy'>('academy');
  const [movies, setMovies] = useState<any[]>(academyWinners);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [heroMovie, setHeroMovie] = useState<any>(null);
  const [sectionTitle, setSectionTitle] = useState('歴代アカデミー賞 作品賞');

  useEffect(() => {
    let isMounted = true;
    
    // Set a random academy winner as the hero movie initially
    if (!heroMovie && academyWinners.length > 0) {
      const randomHero = academyWinners[Math.floor(Math.random() * Math.min(20, academyWinners.length))];
      const query = randomHero.searchQuery || randomHero.title;
      
      api.searchMovies(query, 1, randomHero.year).then(data => {
        if (isMounted && data && data.results && data.results.length > 0) {
          setHeroMovie({ ...randomHero, ...data.results[0] });
        } else if (isMounted) {
          api.searchMovies(query).then(fallbackData => {
            if (isMounted && fallbackData && fallbackData.results && fallbackData.results.length > 0) {
              setHeroMovie({ ...randomHero, ...fallbackData.results[0] });
            } else if (isMounted) {
              setHeroMovie(randomHero);
            }
          });
        }
      }).catch(() => {
        if (isMounted) setHeroMovie(randomHero);
      });
    }

    const saved = localStorage.getItem('koremiyo_search_history');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (e) {}
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const saveHistory = (query: string) => {
    const updated = [query, ...searchHistory.filter(q => q !== query)].slice(0, 5);
    setSearchHistory(updated);
    localStorage.setItem('koremiyo_search_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('koremiyo_search_history');
  };

  const loadTrending = async () => {
    setLoading(true);
    try {
      if (trendingMovies && trendingMovies.length > 0) {
        setMovies(trendingMovies);
        if (!heroMovie) {
          const randomHero = trendingMovies[Math.floor(Math.random() * Math.min(10, trendingMovies.length))];
          setHeroMovie(randomHero);
        }
      } else {
        const data = await api.getTrendingMovies();
        if (data && data.results) {
          setMovies(data.results);
          if (!heroMovie) {
            const randomHero = data.results[Math.floor(Math.random() * Math.min(10, data.results.length))];
            setHeroMovie(randomHero);
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const executeSearch = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setShowHistory(false);
    saveHistory(query);
    try {
      const data = await api.searchMovies(query);
      setMovies(data.results || []);
      setSectionTitle(`「${query}」の検索結果`);
      setActiveTab('trending'); // Reset tab state
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    executeSearch(searchQuery);
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    if (tab === 'trending') {
      setSectionTitle('公開中の話題作');
      loadTrending();
    } else if (tab === 'academy') {
      setSectionTitle('歴代アカデミー賞 作品賞');
      setMovies(academyWinners);
    } else if (tab === 'goldenglobe') {
      setSectionTitle('ゴールデングローブ賞 映画部門 作品賞（ドラマ部門）');
      setMovies(goldenGlobeWinners);
    } else if (tab === 'goldenglobe-comedy') {
      setSectionTitle('ゴールデングローブ賞 映画部門 作品賞（ミュージカル・コメディ部門）');
      setMovies(goldenGlobeComedyWinners);
    }
  };

  return (
    <>
      <header className="scrolled">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => handleTabChange('academy')}>
          <Logo />
        </div>
        <div className="search-wrapper">
          <form className="search-container" onSubmit={handleSearch}>
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              onFocus={() => setShowHistory(true)}
              onBlur={() => setTimeout(() => setShowHistory(false), 200)}
              placeholder="映画タイトルで検索..." 
            />
            <button type="submit"><i className="fa-solid fa-search"></i></button>
          </form>
          {showHistory && searchHistory.length > 0 && (
            <div className="search-history-dropdown">
              <div className="search-history-header">
                <span>最近の検索</span>
                <button type="button" className="clear-history-btn" onClick={clearHistory}>履歴をクリア</button>
              </div>
              {searchHistory.map((query, idx) => (
                <div key={idx} className="search-history-item" onClick={() => { setSearchQuery(query); executeSearch(query); }}>
                  <i className="fa-solid fa-clock-rotate-left"></i>
                  <span>{query}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <HamburgerMenu />
      </header>

      <main>
        {heroMovie && (
          <section className="hero">
            <div className="hero-content">
              <h1>{heroMovie.title || heroMovie.original_title}</h1>
              <p>{heroMovie.overview || 'あらすじがありません。'}</p>
              <Link href={`/movie/${heroMovie.id}`} className="primary-btn">詳細を見る</Link>
            </div>
            <div className="hero-backdrop" style={{ backgroundImage: `url('${api.getImageUrl(heroMovie.backdrop_path, 'original')}')` }}></div>
            <div className="hero-overlay"></div>
          </section>
        )}

        <div className="tab-container" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '1rem', marginBottom: '1rem', whiteSpace: 'nowrap' }}>
          {/* <button className={`tab-btn ${activeTab === 'trending' ? 'active' : ''}`} onClick={() => handleTabChange('trending')}>公開中の話題作</button> */}
          <button className={`tab-btn ${activeTab === 'academy' ? 'active' : ''}`} onClick={() => handleTabChange('academy')}>歴代アカデミー賞</button>
          <button className={`tab-btn ${activeTab === 'goldenglobe' ? 'active' : ''}`} onClick={() => handleTabChange('goldenglobe')}>ゴールデングローブ賞（ドラマ）</button>
          <button className={`tab-btn ${activeTab === 'goldenglobe-comedy' ? 'active' : ''}`} onClick={() => handleTabChange('goldenglobe-comedy')}>ゴールデングローブ賞（コメディ・ミュージカル）</button>
          <Link href="/articles" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, var(--accent-color) 0%, #00b4cc 100%)', padding: '0.8rem 1.5rem', borderRadius: '30px', color: 'var(--bg-color)', textDecoration: 'none', fontWeight: 'bold', marginLeft: 'auto', flexShrink: 0, boxShadow: '0 4px 15px rgba(0, 229, 255, 0.3)' }}>
            <i className="fa-solid fa-book-open"></i> まとめ記事一覧
          </Link>
        </div>

        <section className="movies-section">
          <h2 className="section-title">{sectionTitle}</h2>
          
          {loading ? (
            <div className="loader"><div className="spinner"></div></div>
          ) : (
            <div className="movies-grid">
              {movies.map((movie, idx) => (
                <MovieCard key={movie.id || idx} movie={movie} idx={idx} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <Link href="/contact" className="footer-link">
            <i className="fa-solid fa-envelope"></i> お問い合わせ
          </Link>
          <p className="copyright" style={{ marginTop: '0.5rem', marginBottom: '0.2rem' }}>&copy; {new Date().getFullYear()} KOREMIYO. All rights reserved.</p>
          <p className="copyright" style={{ fontSize: '0.7rem', opacity: 0.5 }}>Amazonのアソシエイトとして、KOREMIYOは適格販売により収入を得ています。</p>
        </div>
      </footer>
    </>
  );
}
