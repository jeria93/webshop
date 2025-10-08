const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";

export function posterUrl(path) {
  return path ? IMG + path : "";
}

export function queryString(params) {
  return new URLSearchParams(params).toString();
}

export async function searchMovies(queryInput) {
  const trimmedQuery = (queryInput ?? "").trim();
  if (!trimmedQuery) {
    console.log("searchMovies: empty query");
    return [];
  }

  const url =
    `${BASE}/search/movie?` +
    queryString({
      api_key: API_KEY,
      query: trimmedQuery,
      include_adult: false,
      page: 1,
    });

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`TMDb ${response.status}`);

    const json = await response.json();

    const movies = Array.isArray(json.results) ? json.results : [];

    return movies;
  } catch (error) {
    console.error("searchMovies failed:", error);

    return [];
  }
}
