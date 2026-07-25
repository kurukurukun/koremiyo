import { Metadata } from 'next';
import { fetchTMDBServer } from '@/lib/tmdb-server';
import { api } from '@/lib/api';
import Link from 'next/link';
import MovieDetails from '@/components/MovieDetails';
import Modal from '@/components/Modal';
import Breadcrumb from '@/components/Breadcrumb';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koremiyo.com';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const movie = await fetchTMDBServer(`movie/${params.id}`, { append_to_response: 'credits,videos' });
    const posterUrl = api.getImageUrl(movie.poster_path, 'w500');
    const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '';
    const genres = movie.genres ? movie.genres.map((g: any) => g.name).join('・') : '';
    
    const title = `${movie.title}${releaseYear ? ` (${releaseYear})` : ''} - 映画評価・あらすじ・配信情報 | コレミヨ(KOREMIYO)`;
    const description = `映画『${movie.title}』${releaseYear ? `(${releaseYear}年)` : ''}のあらすじ、評価スコア、キャスト、Amazonプライム・ビデオやU-NEXTなどVOD動画配信サービスでの最新配信状況まとめ。${movie.overview ? movie.overview.slice(0, 80) + '...' : ''}`;
    
    return {
      title,
      description,
      keywords: [movie.title, `${movie.title} 評価`, `${movie.title} あらすじ`, `${movie.title} 配信`, `${movie.title} アマプラ`, `${movie.title} 映画`, genres],
      alternates: {
        canonical: `${baseUrl}/movie/${params.id}`,
      },
      openGraph: {
        title: `${movie.title} | コレミヨ(KOREMIYO) 名作映画ガイド`,
        description,
        url: `${baseUrl}/movie/${params.id}`,
        images: [
          {
            url: posterUrl,
            width: 500,
            height: 750,
            alt: `${movie.title} ポスター`,
          }
        ]
      },
      twitter: {
        card: "summary_large_image",
        title: `${movie.title} - コレミヨ(KOREMIYO)`,
        description,
        images: [posterUrl],
      }
    };
  } catch (e) {
    return {
      title: '映画詳細 - コレミヨ(KOREMIYO)'
    };
  }
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  let movie;
  let jpProviders = null;
  let isAmazonAvailable = false;
  
  try {
    movie = await fetchTMDBServer(`movie/${params.id}`, { append_to_response: 'credits,videos' });
    const providersData = await fetchTMDBServer(`movie/${params.id}/watch/providers`);
    const jpData = providersData.results?.JP || {};
    jpProviders = jpData.flatrate || null;
    
    const allProviders = [
      ...(jpData.flatrate || []),
      ...(jpData.rent || []),
      ...(jpData.buy || [])
    ];
    isAmazonAvailable = allProviders.some((p: any) => p.provider_name.includes('Amazon'));
  } catch (e) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>映画情報の取得に失敗しました。</div>;
  }

  const posterUrl = api.getImageUrl(movie.poster_path, 'w500');

  // Extract Director & Top Actors for rich snippet JSON-LD
  const directors = movie.credits?.crew?.filter((c: any) => c.job === 'Director').map((d: any) => ({
    "@type": "Person",
    "name": d.name
  })) || [];
  
  const actors = movie.credits?.cast?.slice(0, 5).map((a: any) => ({
    "@type": "Person",
    "name": a.name
  })) || [];

  const genres = movie.genres ? movie.genres.map((g: any) => g.name) : [];
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title,
    "alternateName": movie.original_title,
    "image": posterUrl,
    "dateCreated": movie.release_date || "",
    "description": movie.overview || 'コレミヨがおすすめする名作映画です。',
    "genre": genres,
    ...(directors.length > 0 ? { "director": directors } : {}),
    ...(actors.length > 0 ? { "actor": actors } : {}),
    ...(movie.vote_average ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": movie.vote_average.toFixed(1),
        "bestRating": "10",
        "ratingCount": movie.vote_count || 1
      }
    } : {}),
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "JPY",
      "category": "Subscription / Rental",
      "seller": {
        "@type": "Organization",
        "name": "KOREMIYO"
      }
    }
  };

  const breadcrumbItems = [
    { name: 'ホーム', url: '/' },
    { name: '映画作品一覧', url: '/' },
    { name: movie.title, url: `/movie/${params.id}` }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem 1rem 0 1rem' }}>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <Modal isFallback={true}>
        <MovieDetails movie={movie} jpProviders={jpProviders} isModal={true} isAmazonAvailable={isAmazonAvailable} />
      </Modal>
      
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
