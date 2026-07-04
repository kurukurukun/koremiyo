'use client';

import { useState } from 'react';
import { quickPicks, TimeCategory, MoodCategory } from '@/lib/data/quickpicks';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function QuickPick() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [time, setTime] = useState<TimeCategory | null>(null);
  const [mood, setMood] = useState<MoodCategory | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const handleTimeSelect = (t: TimeCategory) => {
    setTime(t);
    setStep(2);
  };

  const handleMoodSelect = async (m: MoodCategory) => {
    setMood(m);
    setStep(3);
    setLoading(true);

    const matches = quickPicks.filter(q => q.timeCategory === time && q.mood === m);
    // Shuffle and pick top 3
    const selected = matches.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Fetch TMDB data for these to get posters and IDs
    const enriched = await Promise.all(selected.map(async (movie) => {
      const query = movie.searchQuery || movie.title;
      try {
        let data = await api.searchMovies(query, 1, movie.year);
        if (!data.results || data.results.length === 0) {
          data = await api.searchMovies(query, 1);
        }
        if (data.results && data.results.length > 0) {
          return { ...movie, ...data.results[0] };
        }
      } catch (e) {}
      return movie;
    }));
    
    setResults(enriched);
    setCurrentIndex(0);
    setLoading(false);
  };

  const handleNext = (dir: 'left' | 'right') => {
    setDirection(dir);
    setTimeout(() => {
      if (currentIndex < results.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0); // loop
      }
      setDirection(null);
    }, 300); // Wait for animation
  };

  const reset = () => {
    setStep(0);
    setTime(null);
    setMood(null);
    setResults([]);
  };

  return (
    <div className="quick-pick-container" style={{
      background: 'linear-gradient(145deg, #1a1a24 0%, #101018 100%)',
      borderRadius: '24px',
      padding: '1.5rem 1rem',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      textAlign: 'center',
      border: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '450px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }}>
      
      {step === 0 && (
        <div className="fade-in">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍿</div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', background: 'linear-gradient(90deg, #00E5FF, #007BFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            今夜の1本を10秒で決める
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
            気分と時間を選ぶだけ。<br/>絶対に外さない名作を3本だけ提案します。
          </p>
          <button 
            onClick={() => setStep(1)}
            style={{
              background: 'linear-gradient(135deg, #00E5FF 0%, #007BFF 100%)',
              color: '#fff', border: 'none', padding: '1rem 2.5rem', 
              borderRadius: '30px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(0, 123, 255, 0.3)',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            さっそく探す <i className="fa-solid fa-arrow-right" style={{ marginLeft: '0.5rem' }}></i>
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="fade-in" style={{ width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>今、使える時間は？</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
            {[
              { id: '90', label: '90分以内（サクッと）', icon: 'fa-bolt' },
              { id: '120', label: '120分前後（標準的）', icon: 'fa-clock' },
              { id: '150', label: '150分以上（どっぷり）', icon: 'fa-mug-hot' }
            ].map(opt => (
              <button 
                key={opt.id}
                onClick={() => handleTimeSelect(opt.id as TimeCategory)}
                style={{
                  background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', 
                  padding: '1.2rem', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <i className={`fa-solid ${opt.icon}`} style={{ color: '#00E5FF' }}></i> {opt.label}
              </button>
            ))}
          </div>
          <button onClick={reset} style={{ marginTop: '2rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline' }}>キャンセル</button>
        </div>
      )}

      {step === 2 && (
        <div className="fade-in" style={{ width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>今の脳の疲労度は？</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
            {[
              { id: 'exciting', label: 'パキッとしたい（刺激）', icon: 'fa-fire' },
              { id: 'emotional', label: '感情を揺さぶられたい（涙）', icon: 'fa-droplet' },
              { id: 'relaxing', label: '何も考えたくない（笑）', icon: 'fa-couch' }
            ].map(opt => (
              <button 
                key={opt.id}
                onClick={() => handleMoodSelect(opt.id as MoodCategory)}
                style={{
                  background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', 
                  padding: '1.2rem', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <i className={`fa-solid ${opt.icon}`} style={{ color: '#00E5FF' }}></i> {opt.label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} style={{ marginTop: '2rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline' }}>戻る</button>
        </div>
      )}

      {step === 3 && (
        <div className="fade-in" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {loading ? (
            <div className="loader"><div className="spinner"></div><p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>最適な映画を探しています...</p></div>
          ) : results.length > 0 ? (
            <div style={{ width: '100%', maxWidth: '320px', position: 'relative' }}>
              <div 
                style={{ 
                  background: 'var(--bg-color)', borderRadius: '20px', overflow: 'hidden', 
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                  transform: direction === 'left' ? 'translateX(-100%) rotate(-10deg)' : direction === 'right' ? 'translateX(100%) rotate(10deg)' : 'translateX(0) rotate(0)',
                  opacity: direction ? 0 : 1,
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                {results[currentIndex].poster_path ? (
                  <img src={api.getImageUrl(results[currentIndex].poster_path, 'w500')} alt={results[currentIndex].title} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '320px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Image</div>
                )}
                <div style={{ padding: '1.5rem', textAlign: 'left' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{results[currentIndex].title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', height: '3em', overflow: 'hidden' }}>{results[currentIndex].description}</p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', gap: '1rem' }}>
                <button 
                  onClick={() => handleNext('left')}
                  style={{
                    flex: 1, background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', 
                    padding: '1rem', borderRadius: '50px', fontSize: '1.2rem', cursor: 'pointer',
                    transition: 'all 0.2s ease', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  <i className="fa-solid fa-xmark"></i> 違うかも
                </button>
                <Link 
                  href={`/movie/${results[currentIndex].id || ''}`}
                  style={{
                    flex: 1, background: 'linear-gradient(135deg, #ff0055 0%, #ff0099 100%)', color: '#fff', border: 'none', 
                    padding: '1rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer',
                    textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                    boxShadow: '0 10px 20px rgba(255, 0, 85, 0.3)', transition: 'transform 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <i className="fa-solid fa-heart"></i> これにする！
                </Link>
              </div>
              
              <button onClick={reset} style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}>最初からやり直す</button>
            </div>
          ) : (
            <div>
              <p>条件に合う映画が見つかりませんでした。</p>
              <button onClick={reset} style={{ marginTop: '1rem', color: '#00E5FF', background: 'none', border: 'none', cursor: 'pointer' }}>やり直す</button>
            </div>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
