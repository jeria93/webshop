import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "../features/api";
import { formatSEK, priceFromId } from "../utils/format";
import "./movieDetails.css";
import MovieBackdrop from "../components/MovieBackdrop";
import MovieMeta from "../components/MovieMeta";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getMovieById(id)
      .then(setMovie)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
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
  const bannerImagePath = movie.backdrop_path || movie.poster_path;
  const displayPrice = formatSEK(priceFromId(Number(movie.id)));

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
            <MovieMeta movie={movie} castCount={3} />

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
// extrahera kod till egna komponentner?
// lägga till css för MovieMeta.jsx
// navigera genom search till details
