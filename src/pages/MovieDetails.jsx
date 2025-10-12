import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "../features/api";
import { formatSEK, priceFromId } from "../utils/format";
import "./movieDetails.css";
import MovieBackdrop from "../components/MovieBackdrop";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    getMovieById(id)
      .then((m) => {
        if (!cancelled) setMovie(m);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="details">
        <header className="details__header">
          <div className="details__container">
            <h1 className="details__title">Laddar...</h1>
          </div>
        </header>
        <footer className="details__footer">
          <Link className="details__back" to="/">
            Tillbaka
          </Link>
        </footer>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="details">
        <header className="details__header">
          <div className="details__container">
            <h1 className="details__title">Ingen filminformation</h1>
          </div>
        </header>
        <div className="details__container">
          <p className="details__empty">Prova att gå dit via sökningen igen</p>
        </div>
        <footer className="details__footer">
          <Link className="details__back" to="/">
            Tillbaka
          </Link>
        </footer>
      </div>
    );
  }

  const title = movie.title ?? movie.original_title ?? "Ingen titel funnen";
  const year = movie.release_date?.slice(0, 4) ?? "—";
  const displayPrice = formatSEK(priceFromId(Number(movie.id)));
  const rating = Number.isFinite(movie?.vote_average) ? movie.vote_average.toFixed(1): "—";
  const bannerImagePath = movie.backdrop_path || movie.poster_path;

  return (
    <div className="details">
      <header className="details__header">
        <div className="details__container">
          <h1 className="details__title">{title}</h1>
        </div>
      </header>

      <section className="details__hero">
        <div className="details__container">
          <MovieBackdrop path={bannerImagePath} alt={title} />
        </div>
      </section>

      <section className="details__main">
        <div className="details__container">
          <div className="details__info">
            <div className="details__meta">
              <span className="details__meta-item">År: {year}</span>
              <span className="details__meta-item">Betyg: {rating}</span>
            </div>

            <p className="details__overview">
              {movie.overview || "Ingen beskrivning tillgänglig"}
            </p>

            <div className="details__price">
              <span>Pris</span>
              <strong>{displayPrice}</strong>
            </div>
          </div>
        </div>
      </section>

      <footer className="details__footer">
        <Link className="details__back" to="/">
          Tillbaka
        </Link>
      </footer>
    </div>
  );
}

// priser för köpa, hyra och affisch
// mera meta data
// extrahera kod till egna komponentner?
