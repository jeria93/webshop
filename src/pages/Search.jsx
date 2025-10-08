import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartCount } from "../features/cartSlice";
import { searchMovies } from "../features/api";
import "./search.css";
import MoviePoster from "../components/MoviePoster";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  async function handleSubmit(e) {
    e.preventDefault();
    setMovies(await searchMovies(query));
  }

  return (
    <div className="search">
      <header className="search__header">
        <h1 className="search__title">Search</h1>
        <strong className="search__cart">Cart: {cartCount}</strong>
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

      <ul className="search__list">
        {movies.map((movie) => (
          <li key={movie.id} className="search__item">
            <MoviePoster path={movie.poster_path} width={60} height={90} />
            <div className="search__info">
              <strong>{movie.title ?? movie.original_title}</strong>
            </div>
            <button
              className="search__addBtn"
              onClick={() => dispatch(addToCart(movie))}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}