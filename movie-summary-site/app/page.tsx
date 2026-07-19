'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { academyWinners } from '@/lib/data/academy';
import { japanAcademyWinners } from '@/lib/data/japan_academy';
import { goldenGlobeWinners, goldenGlobeComedyWinners } from '@/lib/data/golden_globe';
import { trendingMovies } from '@/lib/data/trending';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import Logo from '@/components/Logo';
import HamburgerMenu from '@/components/HamburgerMenu';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'trending' | 'academy' | 'goldenglobe' | 'goldenglobe-comedy' | 'japan-academy'>('academy');
  const [movies, setMovies] = useState<any[]>(academyWinners);
  const [loading, setLoading] = useState(false);
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

    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    if (q) {
      // executeSearch will be called after initial mount
      setTimeout(() => executeSearch(q), 0);
      window.history.replaceState({}, '', '/');
    }

    return () => {
      isMounted = false;
    };
  }, []);



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
    } else if (tab === 'japan-academy') {
      setSectionTitle('歴代日本アカデミー賞 最優秀作品賞');
      setMovies(japanAcademyWinners);
    }
  };

  return (
    <>
      <header className="scrolled">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => handleTabChange('academy')}>
          <Logo />
        </div>
        <HamburgerMenu />
      </header>

      <main>
        <h1 className="sr-only">映画おすすめサイト KOREMIYO - 絶対に外さない映画選びと名作レビュー</h1>
        
        {heroMovie && (
          <section className="hero">
            <div className="hero-content">
              <h2 className="hero-title">{heroMovie.title || heroMovie.original_title}</h2>
              <p>{heroMovie.overview || 'あらすじがありません。'}</p>
              <Link href={`/movie/${heroMovie.id}`} className="primary-btn">詳細を見る</Link>
            </div>
            <div className="hero-backdrop" style={{ backgroundImage: `url('${api.getImageUrl(heroMovie.backdrop_path, 'original')}')` }}></div>
            <div className="hero-overlay"></div>
          </section>
        )}

        <p className="seo-description">
          KOREMIYOは、歴代のアカデミー賞作品賞やゴールデングローブ賞など、絶対に外さないおすすめの名作映画だけを厳選して紹介するサイトです。「今夜観る映画が決められない…」というタイパ重視のあなたへ、最高の1本をご提案します。
        </p>

        <div className="tab-container" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '1rem', marginBottom: '1rem', whiteSpace: 'nowrap' }}>
          {/* <button className={`tab-btn ${activeTab === 'trending' ? 'active' : ''}`} onClick={() => handleTabChange('trending')}>公開中の話題作</button> */}
          <button className={`tab-btn ${activeTab === 'academy' ? 'active' : ''}`} onClick={() => handleTabChange('academy')}>歴代アカデミー賞</button>
          <button className={`tab-btn ${activeTab === 'japan-academy' ? 'active' : ''}`} onClick={() => handleTabChange('japan-academy')}>日本アカデミー賞</button>
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
                <MovieCard key={movie.id || movie.title || idx} movie={movie} idx={idx} />
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
