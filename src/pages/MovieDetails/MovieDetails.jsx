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
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice.js";
import HeartButton from "../../components/HeartButton.jsx";
import {
  selectIsFavorite,
  toggleFavorite,
} from "../../features/favoritesSlice.js";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isFavorite = useSelector((state) => selectIsFavorite(state, id));

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
  const handleToggleFavorite = () => {
    if (movie) {
      dispatch(toggleFavorite(movie));
    }
  };

  return (
    <div className="details">
      <section className="details__hero">
        <div className="details__container">
          <div className="hero__image-container">
            <MovieBackdrop path={bannerImagePath} alt={title} />
            <TrailerButton
              movieTitle={title}
              videoResults={movie.videos?.results}
            />
          </div>
        </div>
      </section>

      <section className="details__main">
        <div className="details__container">
          <div className="details__info">
            <div
              className="details__title-row"
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <h1 className="details__title" style={{ marginBottom: 0 }}>
                {title}
              </h1>
              <HeartButton
                liked={isFavorite}
                onToggle={handleToggleFavorite}
                size={28}
              />
            </div>
            <MovieMeta movie={movie} castCount={3} />

            <p className="details__overview">
              {movie.overview || "Ingen beskrivning tillgänglig"}
            </p>

            {/* <TrailerButton movieTitle={title} videoResult={movie.videos?.results} /> */}

            {/** Hyr knapp */}
            <div className="details__price-actions">
              <button
                className="details__button details__button--rent"
                onClick={() => {
                  dispatch(addToCart(movie, "RENTAL"));
                }}
              >
                <span className="details__button-type">Hyr</span>
                <span className="details__button-price">{formatSEK(rent)}</span>
              </button>
              {/** Köp knapp */}
              <button
                className="details__button details__button--buy"
                onClick={() => {
                  dispatch(addToCart(movie, "PURCHASED"));
                }}
              >
                <span className="details__button-type">Köp</span>
                <span className="details__button-price">{formatSEK(buy)}</span>
              </button>

              <button
                className="details__button details__button--poster"
                onClick={() => {
                  dispatch(addToCart(movie, "POSTER"));
                }}
              >
                <span className="details__button-type">Poster</span>
                <span className="details__button-price">
                  {formatSEK(poster)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
