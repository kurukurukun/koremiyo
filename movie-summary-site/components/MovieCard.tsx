'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default function MovieCard({ movie, idx }: { movie: any, idx: number }) {
  const [posterUrl, setPosterUrl] = useState(movie.poster_path ? api.getImageUrl(movie.poster_path, 'w500') : '');
  const [movieData, setMovieData] = useState(movie);

  useEffect(() => {
    let isMounted = true;

    const fetchExtraRatings = async (titleToScrape: string) => {
      try {
        const res = await fetch(`/api/scrape-ratings?title=${encodeURIComponent(titleToScrape)}`);
        if (res.ok) {
          const ratingData = await res.json();
          if (isMounted) {
            setMovieData((prev: any) => ({
              ...prev,
              eigaScore: ratingData.eigaScore || prev.eigaScore,
              filmarksScore: ratingData.filmarksScore || prev.filmarksScore
            }));
          }
        }
      } catch (e) {
        // Ignore error
      }
    };

    const query = movie.searchQuery || movie.title;
    const searchYear = movie.releaseYear || movie.year;

    if (!movie.poster_path && movie.title) {
      api.searchMovies(query, 1, searchYear).then(data => {
        if (isMounted && data && data.results && data.results.length > 0) {
          const fetchedMovie = data.results[0];
          if (fetchedMovie.poster_path) {
            setPosterUrl(api.getImageUrl(fetchedMovie.poster_path, 'w500'));
          }
          setMovieData({ ...movie, id: fetchedMovie.id, vote_average: fetchedMovie.vote_average });
          fetchExtraRatings(query);
        } else if (isMounted) {
          // Fallback: search without year if year match fails
          api.searchMovies(query).then(fallbackData => {
            if (isMounted && fallbackData && fallbackData.results && fallbackData.results.length > 0) {
              const fetchedMovie = fallbackData.results[0];
              if (fetchedMovie.poster_path) {
                setPosterUrl(api.getImageUrl(fetchedMovie.poster_path, 'w500'));
              }
              setMovieData({ ...movie, id: fetchedMovie.id, vote_average: fetchedMovie.vote_average });
              fetchExtraRatings(query);
            }
          });
        }
      });
    } else if (movie.id) {
      if (!movie.eigaScore || !movie.filmarksScore) {
        fetchExtraRatings(query);
      }
    }
    return () => { isMounted = false; };
  }, [movie]);

  const rating = movieData.vote_average ? movieData.vote_average.toFixed(1) : '-';
  const href = movieData.id ? `/movie/${movieData.id}` : '#';

  return (
    <Link href={href} style={{ textDecoration: 'none' }} prefetch={true}>
      <div className="movie-card">
        <Image src={posterUrl || 'https://via.placeholder.com/250x375?text=No+Image'} alt={movieData.title} width={250} height={375} className="movie-poster" unoptimized />
        <div className="movie-info">
          <h3 className="movie-title">{movieData.year ? `${movieData.year}年: ` : ''}{movieData.title}</h3>
          {(movieData.eigaScore && movieData.filmarksScore) ? (
            <div className="movie-rating academy-scores">
              <div>映画.com: <span className="eiga"><i className="fa-solid fa-star"></i> {movieData.eigaScore}</span></div>
              <div>Filmarks: <span className="filmarks"><i className="fa-solid fa-star"></i> {movieData.filmarksScore}</span></div>
            </div>
          ) : (
            <div className="movie-rating">
              <i className="fa-solid fa-star"></i> {rating}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
