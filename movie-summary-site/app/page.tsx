'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { academyWinners } from '@/lib/data/academy';
import { goldenGlobeWinners } from '@/lib/data/golden_globe';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'trending' | 'academy' | 'goldenglobe'>('trending');
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroMovie, setHeroMovie] = useState<any>(null);
  const [sectionTitle, setSectionTitle] = useState('公開中の話題作');

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    setLoading(true);
    try {
      const data = await api.getTrendingMovies();
      if (data && data.results) {
        setMovies(data.results);
        if (!heroMovie) {
          const randomHero = data.results[Math.floor(Math.random() * Math.min(10, data.results.length))];
          setHeroMovie(randomHero);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const data = await api.searchMovies(searchQuery);
      setMovies(data.results || []);
      setSectionTitle(`「${searchQuery}」の検索結果`);
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
    }
  };

  return (
    <>
      <header className="scrolled">
        <div className="logo" style={{ cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }} onClick={() => handleTabChange('trending')}>
          <span className="fa-stack" style={{ fontSize: '0.65em', marginRight: '-0.1rem', transform: 'translateY(-2px)' }}>
            <i className="fa-solid fa-ticket fa-stack-2x" style={{ color: 'var(--primary-color)', transform: 'rotate(-15deg)' }}></i>
            <i className="fa-solid fa-check fa-stack-1x" style={{ color: 'var(--bg-color)', transform: 'rotate(-15deg) scale(1.3)', fontWeight: 900 }}></i>
          </span>
          <span style={{ color: 'var(--text-primary)' }}>KOREMIYO</span>
          <small style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>コレミヨ</small>
        </div>
        <form className="search-container" onSubmit={handleSearch}>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="映画タイトルで検索..." />
          <button type="submit"><i className="fa-solid fa-search"></i></button>
        </form>
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

        <div className="tabs-container">
          <button className={`tab-btn ${activeTab === 'trending' ? 'active' : ''}`} onClick={() => handleTabChange('trending')}>公開中の話題作</button>
          <button className={`tab-btn ${activeTab === 'academy' ? 'active' : ''}`} onClick={() => handleTabChange('academy')}>歴代アカデミー賞</button>
          <button className={`tab-btn ${activeTab === 'goldenglobe' ? 'active' : ''}`} onClick={() => handleTabChange('goldenglobe')}>ゴールデングローブ賞（ドラマ）</button>
        </div>

        <section className="movies-section">
          <h2 className="section-title">{sectionTitle}</h2>
          
          {loading ? (
            <div className="loader"><div className="spinner"></div></div>
          ) : (
            <div className="movies-grid">
              {movies.map((movie, idx) => {
                const posterUrl = movie.poster_path ? api.getImageUrl(movie.poster_path, 'w500') : 'https://via.placeholder.com/500x750/1a1d24/e50914?text=' + encodeURIComponent(movie.title);
                const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '-';
                // For static lists, we use the title to search. Next.js approach: we pass title in URL if no ID.
                const href = movie.id ? `/movie/${movie.id}` : `/search?q=${encodeURIComponent(movie.title)}`;

                return (
                  <Link href={href} key={movie.id || idx} style={{ textDecoration: 'none' }}>
                    <div className="movie-card">
                      <Image src={posterUrl} alt={movie.title} width={250} height={375} className="movie-poster" unoptimized />
                      <div className="movie-info">
                        <h3 className="movie-title">{movie.year ? `${movie.year}年受賞: ` : ''}{movie.title}</h3>
                        {movie.year ? (
                          <div className="movie-rating academy-scores">
                            <div>映画.com: <span className="eiga"><i className="fa-solid fa-star"></i> {movie.eigaScore}</span></div>
                            <div>Filmarks: <span className="filmarks"><i className="fa-solid fa-star"></i> {movie.filmarksScore}</span></div>
                          </div>
                        ) : (
                          <div className="movie-rating">
                            <i className="fa-solid fa-star"></i> {rating}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
