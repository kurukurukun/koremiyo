import Link from 'next/link';
import { getArticles } from '@/lib/data/articles';
import Logo from '@/components/Logo';

export const metadata = {
  title: '映画特集・まとめ記事 | KOREMIYO',
  description: 'KOREMIYOが独自の視点で厳選した映画特集やおすすめまとめ記事の一覧です。',
};

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <>
      <header className="scrolled">
        <div className="logo" style={{ cursor: 'pointer' }}>
          <Logo />
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
