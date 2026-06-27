import { fetchTMDBServer } from '@/lib/tmdb-server';
import Modal from '@/components/Modal';
import MovieDetails from '@/components/MovieDetails';

export default async function MovieModalPage({ params }: { params: { id: string } }) {
  let movie;
  let jpProviders = null;
  
  try {
    movie = await fetchTMDBServer(`movie/${params.id}`, { append_to_response: 'credits,videos' });
    const providersData = await fetchTMDBServer(`movie/${params.id}/watch/providers`);
    jpProviders = providersData.results?.JP?.flatrate || null;
  } catch (e) {
    return (
      <Modal>
        <div style={{ padding: '4rem', textAlign: 'center' }}>映画情報の取得に失敗しました。</div>
      </Modal>
    );
  }

  return (
    <Modal>
      <MovieDetails movie={movie} jpProviders={jpProviders} isModal={true} />
    </Modal>
  );
}
