'use client';

import { api } from '@/lib/api';
import { academyWinners } from '@/lib/data/academy';
import { goldenGlobeWinners } from '@/lib/data/golden_globe';
import { trendingMovies } from '@/lib/data/trending';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function MovieDetails({ movie, jpProviders, isModal = false, isAmazonAvailable = false }: { movie: any, jpProviders: any, isModal?: boolean, isAmazonAvailable?: boolean }) {
  const posterUrl = api.getImageUrl(movie.poster_path, 'w500');
  const backdropUrl = movie.backdrop_path ? api.getImageUrl(movie.backdrop_path, 'original') : '';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '-';
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '不明';

  let nonAmazonProviders = null;
  let amazonLogoUrl = null;
  
  if (jpProviders) {
    const amazonProv = jpProviders.find((p: any) => p.provider_name.includes('Amazon'));
    if (amazonProv) {
      amazonLogoUrl = api.getImageUrl(amazonProv.logo_path, 'original');
    }
    nonAmazonProviders = jpProviders
      .filter((p: any) => !p.provider_name.includes('Amazon'))
      .map((p: any) => ({
        name: p.provider_name,
        logo: api.getImageUrl(p.logo_path, 'original')
      }));
  }

  const [eigaScore, setEigaScore] = useState<string>('?.?');
  const [filmarksScore, setFilmarksScore] = useState<string>('?.?');
  const [loadingRatings, setLoadingRatings] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  let trailerKey = null;
  if (movie.videos && movie.videos.results && movie.videos.results.length > 0) {
    const videos = movie.videos.results.filter((v: any) => v.site === 'YouTube');
    const jaTrailer = videos.find((v: any) => v.iso_639_1 === 'ja' && v.type === 'Trailer');
    const officialTrailer = videos.find((v: any) => v.type === 'Trailer');
    const anyVideo = videos[0];
    const bestVideo = jaTrailer || officialTrailer || anyVideo;
    if (bestVideo) {
      trailerKey = bestVideo.key;
    }
  }

  useEffect(() => {
    // 1. 静的データ（賞やキャッシュされた話題作）から検索
    let matched = academyWinners.find(m => m.title === movie.title || m.title === movie.original_title);
    if (!matched) {
      matched = goldenGlobeWinners.find(m => m.title === movie.title || m.title === movie.original_title);
    }
    if (!matched) {
      matched = trendingMovies.find(m => m.title === movie.title || m.title === movie.original_title);
    }
    
    if (matched && matched.eigaScore && matched.filmarksScore) {
      setEigaScore(matched.eigaScore);
      setFilmarksScore(matched.filmarksScore);
      setLoadingRatings(false);
    } else {
      // 2. 見つからなければオンデマンドでAPI叩いてスクレイピング
      setLoadingRatings(true);
      fetch(`/api/scrape-ratings?title=${encodeURIComponent(movie.title)}`)
        .then(res => res.json())
        .then(data => {
          setEigaScore(data.eigaScore || '-.-');
          setFilmarksScore(data.filmarksScore || '-.-');
        })
        .catch(err => {
          console.error(err);
          setEigaScore('-.-');
          setFilmarksScore('-.-');
        })
        .finally(() => {
          setLoadingRatings(false);
        });
    }
  }, [movie.title, movie.original_title]);

  const encodedTitle = encodeURIComponent(movie.title);
  const eigaSearchUrl = `https://eiga.com/search/${encodedTitle}/`;
  const filmarksSearchUrl = `https://filmarks.com/search/movies?q=${encodedTitle}`;

  const containerStyle = isModal 
    ? { background: 'var(--bg-secondary)', padding: '0', borderRadius: '16px', overflow: 'hidden' }
    : { maxWidth: '1000px', margin: backdropUrl ? '-150px auto 0' : '2rem auto', background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' };

  return (
    <div style={containerStyle}>
      {backdropUrl && (
        <div className="modal-hero" style={isModal ? { height: '300px' } : { height: '400px' }}>
          <div className="modal-hero-overlay"></div>
          <img src={backdropUrl} alt="backdrop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      
      <div className="modal-details" style={isModal ? { marginTop: backdropUrl ? '-100px' : '0', padding: '2rem' } : {}}>
        <img src={posterUrl} alt="poster" className="modal-poster" style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }} />
        <div className="modal-info">
          <h2 style={{ fontSize: isModal ? '2rem' : '2.5rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>{movie.title}</h2>
          <div className="modal-meta" style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            <span>{releaseYear}</span>
            <span>{movie.runtime ? movie.runtime + '分' : '-'}</span>
          </div>
          
          <p className="modal-overview" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{movie.overview || 'あらすじがありません。'}</p>
          

          
          {(nonAmazonProviders?.length > 0 || isAmazonAvailable) && (
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <h3><i className="fa-solid fa-play"></i> 現在配信中のサービス</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                
                {nonAmazonProviders?.map((p: any) => (
                  <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                    <img src={p.logo} alt={p.name} style={{ width: '30px', height: '30px', borderRadius: '4px' }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{p.name}</span>
                  </div>
                ))}

                {isAmazonAvailable && (
                  <a 
                    href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(movie.title + ' 映画')}&i=instant-video&tag=${process.env.NEXT_PUBLIC_AMAZON_TAG || 'koremiyo-22'}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="provider-affiliate-link"
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.5rem', 
                      background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', 
                      borderRadius: '8px', textDecoration: 'none', color: 'inherit',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  >
                    {amazonLogoUrl ? (
                      <img src={amazonLogoUrl} alt="Amazon Prime Video" style={{ width: '30px', height: '30px', borderRadius: '4px' }} />
                    ) : (
                      <div style={{ width: '30px', height: '30px', background: '#00A8E1', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="fa-brands fa-amazon" style={{ color: 'white', fontSize: '18px' }}></i>
                      </div>
                    )}
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Amazon Prime Video <i className="fa-solid fa-external-link-alt" style={{ fontSize: '0.7rem', opacity: 0.5, marginLeft: '2px' }}></i></span>
                  </a>
                )}

              </div>
            </div>
          )}
          
          <div className="rating-blocks" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
              <div className="rating-block tmdb" style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  <span className="brand" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>TMDB</span>
                  <div className="score" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}><i className="fa-solid fa-star" style={{ color: 'var(--tmdb-color)'}}></i> {rating}</div>
              </div>
              <div className="rating-block eiga" style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  <span className="brand" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>映画.com</span>
                  <div className="score" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <i className="fa-solid fa-star" style={{ color: 'var(--eiga-color)'}}></i> 
                    {loadingRatings ? <span style={{ fontSize: '1rem', opacity: 0.5 }}>取得中...</span> : eigaScore}
                  </div>
                  <a href={eigaSearchUrl} target="_blank" className="rating-btn" style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '20px', textDecoration: 'none' }}>レビューを検索</a>
              </div>
              <div className="rating-block filmarks" style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                  <span className="brand" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Filmarks</span>
                  <div className="score" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <i className="fa-solid fa-star" style={{ color: 'var(--filmarks-color)'}}></i> 
                    {loadingRatings ? <span style={{ fontSize: '1rem', opacity: 0.5 }}>取得中...</span> : filmarksScore}
                  </div>
                  <a href={filmarksSearchUrl} target="_blank" className="rating-btn" style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '20px', textDecoration: 'none' }}>レビューを検索</a>
              </div>
          </div>

          {trailerKey && (
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <h3><i className="fa-brands fa-youtube" style={{ color: '#e52d27' }}></i> 予告編</h3>
              <div style={{ marginTop: '1rem' }}>
                {!showTrailer ? (
                  <button 
                    onClick={() => setShowTrailer(true)}
                    style={{
                      background: '#e52d27', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', 
                      borderRadius: '30px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s ease',
                      boxShadow: '0 4px 14px rgba(229, 45, 39, 0.4)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#c3221e'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#e52d27'}
                  >
                    <i className="fa-solid fa-play" style={{ fontSize: '1.2rem' }}></i> 予告動画を再生する
                  </button>
                ) : (
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                    <iframe 
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
