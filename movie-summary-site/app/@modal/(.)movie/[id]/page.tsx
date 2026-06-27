import { fetchTMDBServer } from '@/lib/tmdb-server';
import Modal from '@/components/Modal';
import MovieDetails from '@/components/MovieDetails';

export default async function MovieModalPage({ params }: { params: { id: string } }) {
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
    return (
      <Modal>
        <div style={{ padding: '4rem', textAlign: 'center' }}>映画情報の取得に失敗しました。</div>
      </Modal>
    );
  }

  return (
    <Modal>
      <MovieDetails movie={movie} jpProviders={jpProviders} isModal={true} isAmazonAvailable={isAmazonAvailable} />
    </Modal>
  );
}
