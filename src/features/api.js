const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

export const posterUrl   = (path, size = "w342")  => path ? `${IMG_BASE}/${size}${path}` : "";
export const backdropUrl = (path, size = "w1280") => path ? `${IMG_BASE}/${size}${path}` : "";


/**
 * Search movies by text using TMDb Search endpoint.
 * API: GET /search/movie
 * @see https://developer.themoviedb.org/reference/search-movie
 */
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
// function to get new Recently released and popular movies to put in Homepage
// and to get movies genre to Category
export async function getRecentlyReleasedMovies({
  daysBack = 60,
  page = 1,
  region = "SE",
  language = "sv-SE",
  releaseTypes = "2|3|4",
  minVotes = 10,
} = {},
extraParams = {}
) {
  const today = new Date();
  const from = new Date(today);
  from.setDate(from.getDate() - daysBack);

  const toStr = today.toISOString().slice(0, 10); // "YYYY-MM-DD"
  const fromStr = from.toISOString().slice(0, 10); // "YYYY-MM-DD"

   const base = {
    api_key: API_KEY,
    language,
    region,
    sort_by: "popularity.desc",
    include_adult: false,
    include_video: false,
    "vote_count.gte": minVotes,
    page,
  };
      const recentFilters = extraParams.with_genres
    ? {}
    : {
        "release_date.gte": fromStr,
        "release_date.lte": toStr,
        with_release_type: releaseTypes,
      };
        const url = `${BASE}/discover/movie?` + queryString({
    ...base,
    ...recentFilters,
    ...extraParams,
  });


  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`TMDb ${response.status}`);
    const json = await response.json();

    const results = Array.isArray(json.results) ? json.results : [];
    return results.map((m) => ({
      id: m.id,
      title: m.title || "(saknar titel)",
      release_date: m.release_date || "",
      poster_path: m.poster_path || null,
      vote_average: typeof m.vote_average === "number" ? m.vote_average : 0,
      overview: m.overview || "",
    }));
  } catch (err) {
    console.error("getRecentlyReleasedMovies failed:", err);
    return [];
  }
}

/**
 * Fetch TMDB Movie Details for a given ID
 * API: GET /movie/{movie_id}
 * @see https://developer.themoviedb.org/reference/movie-details
 */
export async function getMovieById(id, { language = "sv-SE" } = {}) {
  const movieId = Number(id);
  if (!Number.isFinite(movieId)) return null;

  const url =
    `${BASE}/movie/${movieId}?` + queryString({ api_key: API_KEY, language });
  console.log("getMovieById ->", url);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`TMDb ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("getMovieById failed:", error);
    return null;
  }
}


export const GENRE_IDS = {
   Komedi: 35,
   Skräck: 27,
   Action: 28,
   Drama: 18,
   Romantik: 10749,
};

