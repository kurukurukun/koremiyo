import { articles } from '@/lib/data/articles';
import Link from 'next/link';
import MovieCard from '@/components/MovieCard';
import Logo from '@/components/Logo';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const article = articles.find(a => a.id === params.id);
  if (!article) return { title: '記事が見つかりません' };
  
  return {
    title: `${article.title} | KOREMIYO`,
    description: article.description,
  };
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = articles.find(a => a.id === params.id);
  
  if (!article) {
    notFound();
  }

  return (
    <>
      <header className="scrolled">
        <div className="logo" style={{ cursor: 'pointer' }}>
          <Logo />
        </div>
      </header>
      
      <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '100px' }}>
        <article>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              <i className="fa-regular fa-calendar"></i> {article.date}
            </div>
            <h1 style={{ fontSize: '2rem', color: 'var(--primary-color)', lineHeight: 1.4 }}>{article.title}</h1>
          </div>
          
          <div 
            style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem', color: 'var(--text-primary)' }}
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>紹介されている映画</h2>
          <div className="movies-grid">
            {article.movieQueries.map((mq, idx) => (
              <MovieCard key={idx} movie={mq} idx={idx} />
            ))}
          </div>
        </article>

        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <Link href="/articles" style={{ display: 'inline-block', padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '30px', textDecoration: 'none', color: 'var(--text-primary)', transition: 'background 0.2s' }}>
            <i className="fa-solid fa-arrow-left"></i> 記事一覧に戻る
          </Link>
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
