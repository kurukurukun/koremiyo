import Link from 'next/link';
import { articles } from '@/lib/data/articles';

export const metadata = {
  title: '映画特集・まとめ記事 | KOREMIYO',
  description: 'KOREMIYOが独自の視点で厳選した映画特集やおすすめまとめ記事の一覧です。',
};

export default function ArticlesPage() {
  return (
    <>
      <header className="scrolled">
        <div className="logo" style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', textDecoration: 'none' }}>
            <span className="fa-stack" style={{ fontSize: '0.65em', marginRight: '-0.1rem', transform: 'translateY(-2px)' }}>
              <i className="fa-solid fa-ticket fa-stack-2x" style={{ color: 'var(--primary-color)', transform: 'rotate(-15deg)' }}></i>
              <i className="fa-solid fa-check fa-stack-1x" style={{ color: 'var(--bg-color)', transform: 'rotate(-15deg) scale(1.3)', fontWeight: 900 }}></i>
            </span>
            <span style={{ color: 'var(--text-primary)' }}>KOREMIYO</span>
            <small style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>コレミヨ</small>
          </Link>
        </div>
      </header>
      
      <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '100px' }}>
        <h1 style={{ marginBottom: '2rem', borderBottom: '2px solid var(--primary-color)', paddingBottom: '0.5rem', display: 'inline-block' }}>特集・まとめ記事</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {articles.map((article) => (
            <Link key={article.id} href={`/articles/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article className="article-card">
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <i className="fa-regular fa-calendar"></i> {article.date}
                </div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>{article.title}</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{article.description}</p>
              </article>
            </Link>
          ))}
        </div>
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
