# React Movie Demo - quick guide

A tiny React app that searches movies on **TMDB** and shows a detail page with price-like info and a **YouTube trailer** button.

## Quick start (copy/paste)

```bash
# first: install all dependencies
npm install

# then: run
npm run dev

```

## You’ll need

- A TMDB **v3 API key**

## Setup (1 minute)

```bash
npm install
echo "VITE_TMDB_API_KEY=YOUR_TMDB_KEY" > .env
```

## What to try

1. Search a movie.
2. Open a result -> details show **year, rating, runtime, genres, director, cast**.
3. Click **YouTube** button -> opens official trailer if available, else a search.

## Notes

- API calls: `/search/movie`, `/discover/movie`, `/movie/{id}?append_to_response=credits,videos`.
- Defaults: language `sv-SE`, region `SE` (see `src/features/api.js`).

## Attribution

Uses the **TMDB API**, not endorsed by TMDB. Trailers open on YouTube.
