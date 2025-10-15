import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "../../features/api";
import {
  formatSEK,
  rentPriceFromId,
  buyPriceFromId,
  posterPriceFromId,
} from "../../utils/format";
import "./movieDetails.css";
import MovieBackdrop from "../../components/MovieBackdrop/MovieBackdrop";
import MovieMeta from "../../components/MovieMeta/MovieMeta";
import TrailerButton from "../../components/TrailerButton/TrailerButton";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice.js";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
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
  const rent = rentPriceFromId(movie.id);
  const buy = buyPriceFromId(movie.id);
  const poster = posterPriceFromId(movie.id);

  return (
    <div className="details">
      <section className="details__hero">
        <div className="details__container">
          <MovieBackdrop path={bannerImagePath} alt={title} />
        </div>
      </section>

      <section className="details__main">
        <div className="details__container">
          <div className="details__info">
            <h1 className="details__title">{title}</h1>
            <MovieMeta movie={movie} castCount={3} />

            <p className="details__overview">
              {movie.overview || "Ingen beskrivning tillgänglig"}
            </p>

            <TrailerButton movieTitle={title} videoResult={movie.videos?.results} />

            <div className="details__price-actions">
              <button
                className="details__button details__button--rent"
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: movie.id,
                      title: movie.title,
                      quantity: 1,
                      type: "RENTAL",
                      price: formatSEK(rent),
                      poster_path: movie.poster_path,
                    })
                  );
                }}
              >
                <span className="details__button-type">Hyr</span>
                <span className="details__button-price">{formatSEK(rent)}</span>
              </button>

              <button
                className="details__button details__button--buy"
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: movie.id,
                      title: movie.title,
                      quantity: 1,
                      type: "BUY",
                      price: formatSEK(buy),
                      poster_path: movie.poster_path,
                    })
                  );
                }}
              >
                <span className="details__button-type">Köp</span>
                <span className="details__button-price">{formatSEK(buy)}</span>
              </button>

              <button
                className="details__button details__button--poster"
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: movie.id,
                      title: movie.title,
                      quantity: 1,
                      type: "POSTER",
                      price: formatSEK(poster),
                      poster_path: movie.poster_path,
                    })
                  );
                }}
              >
                <span className="details__button-type">Poster</span>
                <span className="details__button-price">{formatSEK(poster)}</span>
              </button>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// priser för köpa, hyra och affisch
// extrahera kod till egna komponentner?
// lägga till css för MovieMeta.jsx
// navigera genom search till details
