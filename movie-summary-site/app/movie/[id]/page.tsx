import { Metadata } from 'next';
import { fetchTMDBServer } from '@/lib/tmdb-server';
import { api } from '@/lib/api';
import Link from 'next/link';
import MovieDetails from '@/components/MovieDetails';
import Modal from '@/components/Modal';

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
      <Modal isFallback={true}>
        <MovieDetails movie={movie} jpProviders={jpProviders} isModal={true} isAmazonAvailable={isAmazonAvailable} />
      </Modal>
    </>
  );
}
