import { searchMovies } from "../features/api";
import "./search.css";
import MoviePoster from "../components/MoviePoster";
import { useState } from "react";
import EmptyState from "../components/EmptyState";
import {
  formatSEK,
  rentPriceFromId,
  buyPriceFromId,
  posterPriceFromId,
} from "../utils/format.js";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setHasSearched(true);
    setMovies(await searchMovies(query));
  }

  return (
    <div className="search">
      <header className="search__header">
        <h1 className="search__title">Search</h1>
      </header>

      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movie…"
        />
        <button
          className="search__button"
          type="submit"
          disabled={!query.trim()}
        >
          Search
        </button>
      </form>

      {!hasSearched && <EmptyState title="Sök efter filmer" />}

      {hasSearched && movies.length === 0 && (
        <EmptyState title={`Inga resultat för "${query}"`} />
      )}

      {movies.length > 0 && (
        <ul className="search__list">
          {movies.map((movie) => {
            const year = (movie.release_date ?? "").slice(0, 4) || "—";
            const rent = rentPriceFromId(movie.id);
            const buy = buyPriceFromId(movie.id);
            const poster = posterPriceFromId(movie.id);

            return (
              <li key={movie.id} className="search__item">
                <div className="search__poster">
                  <MoviePoster
                    path={movie.poster_path}
                    width={60}
                    height={90}
                  />
                  <div className="search__year">{year}</div>
                </div>

                <div className="search__info">
                  <strong>{movie.title ?? movie.original_title}</strong>
                </div>

                <div className="search__prices">
                  <div>Hyr: {formatSEK(rent)}</div>
                  <div>Köp: {formatSEK(buy)}</div>
                  <div>Affisch: {formatSEK(poster)}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
