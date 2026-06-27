import { Metadata } from 'next';
import { api } from '@/lib/api';
import { fetchTMDBServer } from '@/lib/tmdb-server';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const movie = await fetchTMDBServer(`movie/${params.id}`, { append_to_response: 'credits,videos' });
    const posterUrl = api.getImageUrl(movie.poster_path, 'w500');
    
    return {
      title: `${movie.title} - コレミヨ(KOREMIYO) | おすすめ名作映画`,
      description: movie.overview || 'コレミヨがおすすめする名作映画です。',
      openGraph: {
        title: `${movie.title} - コレミヨ(KOREMIYO)`,
        description: movie.overview || 'コレミヨがおすすめする名作映画です。',
        images: [
          {
            url: posterUrl,
          }
        ]
      }
    };
  } catch (e) {
    return {
      title: '映画詳細 - コレミヨ'
    };
  }
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  let movie;
  let providersHtml = null;
  try {
    movie = await fetchTMDBServer(`movie/${params.id}`, { append_to_response: 'credits,videos' });
    const providersData = await fetchTMDBServer(`movie/${params.id}/watch/providers`);
    const jpProviders = providersData.results?.JP?.flatrate;
    
    if (jpProviders && jpProviders.length > 0) {
      providersHtml = jpProviders.map((p: any) => ({
        name: p.provider_name,
        logo: api.getImageUrl(p.logo_path, 'original')
      }));
    }
  } catch (e) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>映画情報の取得に失敗しました。</div>;
  }

  const posterUrl = api.getImageUrl(movie.poster_path, 'w500');
  const backdropUrl = movie.backdrop_path ? api.getImageUrl(movie.backdrop_path, 'original') : '';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '-';
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '不明';

  // JSON-LD
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title,
    "image": posterUrl,
    "dateCreated": movie.release_date || "",
    "description": movie.overview || 'コレミヨがおすすめする名作映画です。',
    ...(movie.vote_average ? {
      aggregateRating: {
        "@type": "AggregateRating",
        "ratingValue": movie.vote_average.toFixed(1),
        "bestRating": "10",
        "ratingCount": movie.vote_count || 1
      }
    } : {})
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <header className="scrolled">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-primary)' }}>KOREMIYO</span>
          </div>
        </Link>
      </header>
      
      <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
        {backdropUrl && (
          <div className="modal-hero" style={{ height: '400px' }}>
            <div className="modal-hero-overlay"></div>
            <img src={backdropUrl} alt="backdrop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
        
        <div className="modal-details" style={{ maxWidth: '1000px', margin: backdropUrl ? '-150px auto 0' : '2rem auto', background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          <img src={posterUrl} alt="poster" className="modal-poster" />
          <div className="modal-info">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{movie.title}</h2>
            <div className="modal-meta" style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <span>{releaseYear}</span>
              <span>{movie.runtime ? movie.runtime + '分' : '-'}</span>
            </div>
            
            <p className="modal-overview" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>{movie.overview || 'あらすじがありません。'}</p>
            
            {providersHtml && (
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                <h3><i className="fa-solid fa-play"></i> 現在配信中のサービス</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                  {providersHtml.map((p: any) => (
                    <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                      <img src={p.logo} alt={p.name} style={{ width: '30px', height: '30px', borderRadius: '4px' }} />
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="rating-blocks" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
                <div className="rating-block tmdb" style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                    <span className="brand" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>TMDB</span>
                    <div className="score" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}><i className="fa-solid fa-star" style={{ color: 'var(--tmdb-color)'}}></i> {rating}</div>
                </div>
            </div>
            
            <div style={{ marginTop: '2rem' }}>
              <Link href="/" className="primary-btn">一覧に戻る</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
