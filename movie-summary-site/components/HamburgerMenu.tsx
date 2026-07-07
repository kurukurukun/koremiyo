'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
