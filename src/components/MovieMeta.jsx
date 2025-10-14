import {
  formatRuntimeOrDash,
  formatGenres,
  getTopCastNames,
  getDirectorNames,
  formatYearOrDash,
  formatVoteAverageOrDash,
} from "../utils/movieMeta";

export default function MovieMeta({ movie, castCount = 3 }) {
  if (!movie) return null;

  const crew = movie.credits?.crew ?? [];
  const cast = movie.credits?.cast ?? [];

  const year = formatYearOrDash(movie.release_date);
  const rating = formatVoteAverageOrDash(movie.vote_average);
  const runtime = formatRuntimeOrDash(movie.runtime);
  const genresText = formatGenres(movie.genres, 3);
  const director = getDirectorNames(crew);
  const topCast = getTopCastNames(cast, castCount);

  return (
    <>
      <div className="details__meta">
        <span className="details__meta-item">År: {year}</span>
        <span className="details__meta-item">Betyg: {rating}</span>
        {runtime !== "—" && (
          <span className="details__meta-item">Längd: {runtime}</span>
        )}
        {genresText !== "—" && (
          <span className="details__meta-item">Genre: {genresText}</span>
        )}
        {director && (
          <span className="details__meta-item">Regi: {director}</span>
        )}
        {topCast !== "—" && (
          <span className="details__meta-item">Medverkande: {topCast}</span>
        )}
      </div>
    </>
  );
}
