'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsOpen(false);
      window.location.href = `/?q=${encodeURIComponent(searchQuery)}`;
      setSearchQuery('');
    }
  };

  return (
    <div style={{ marginLeft: '1rem' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ 
          background: 'none', border: 'none', color: 'var(--text-primary)', 
          fontSize: '1.5rem', cursor: 'pointer', padding: '0.3rem', 
          zIndex: 1100, position: 'relative', display: 'flex', alignItems: 'center' 
        }}
        aria-label="Menu"
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      {isOpen && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            background: 'rgba(15, 17, 21, 0.98)', backdropFilter: 'blur(10px)',
            zIndex: 1000, display: 'flex', flexDirection: 'column', 
            justifyContent: 'center', alignItems: 'center', gap: '2rem',
            animation: 'fadeIn 0.3s forwards'
          }}
        >
          <div style={{ position: 'absolute', top: '1.5rem', left: '4rem', fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>
            KOREMIYO
          </div>

          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '30px', padding: '0.5rem 1rem', width: '80%', maxWidth: '300px', marginBottom: '1rem' }}>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="映画タイトルで検索..."
              style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '1rem' }}
            />
            <button type="submit" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <i className="fa-solid fa-search"></i>
            </button>
          </form>

          <Link 
            href="/quickpick" 
            onClick={() => setIsOpen(false)} 
            style={{ 
              fontSize: '1.8rem', color: '#fff', textDecoration: 'none', fontWeight: 'bold',
              display: 'flex', alignItems: 'center', gap: '1rem', transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
            onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
          >
            <i className="fa-solid fa-film" style={{ color: 'var(--accent-color)' }}></i> 今日の映画を探す
          </Link>
          
          <Link 
            href="/articles" 
            onClick={() => setIsOpen(false)} 
            style={{ 
              fontSize: '1.8rem', color: '#fff', textDecoration: 'none', fontWeight: 'bold',
              display: 'flex', alignItems: 'center', gap: '1rem', transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
            onMouseOut={(e) => e.currentTarget.style.color = '#fff'}
          >
            <i className="fa-solid fa-book-open" style={{ color: 'var(--accent-color)' }}></i> まとめ記事一覧
          </Link>
        </div>
      )}
    </div>
  );
}
