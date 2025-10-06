import { useState } from "react";
import { searchMovies } from "./features/api.js";
import MoviePoster from "./components/MoviePoster.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    const list = await searchMovies(query);
    setMovies(list);
  }

  return (
    <div style={{ padding: 16 }}>
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movie…"
        />
        <button type="submit" disabled={!query.trim()}>
          Search
        </button>
      </form>
      <ul
        style={{
          marginTop: 12,
          display: "grid",
          gap: 10,
          listStyle: "none",
          padding: 0,
        }}
      >
        {movies.map((movie) => (
          <li
            key={movie.id}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <MoviePoster path={movie.poster_path} width={60} height={90} />
            <span>{movie.original_title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
