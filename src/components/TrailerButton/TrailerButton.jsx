/**
 * Open a YouTube trailer for a movie, fallback to a YouTube search.
 * Expects TMDB `videos.results` (from append_to_response=videos).
 * Priority: official YouTube Trailer > any YouTube Trailer > any YouTube video, else search "<title> trailer".
 * @param {string} movieTitle    Title used for fallback search.
 * @param {Array}  videoResults  TMDB videos.results array.
 */
import "./TrailerButton.css";
export default function TrailerButton({ movieTitle, videoResults }) {
  const videoList = Array.isArray(videoResults) ? videoResults : [];

  const bestYouTubeVideo =
    videoList.find((video) => video.site === "YouTube" && video.type === "Trailer" && video.official) ??
    videoList.find((video) => video.site === "YouTube" && video.type === "Trailer") ??
    videoList.find((video) => video.site === "YouTube") ?? null;

  const hasExactYouTubeTrailer = Boolean(bestYouTubeVideo?.key);

  const trailerUrl = hasExactYouTubeTrailer ? `https://www.youtube.com/watch?v=${bestYouTubeVideo.key}` : `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movieTitle} trailer`)}`;

  return (
    <a className="yt-play" href={trailerUrl} target="_blank" rel="noopener noreferrer">
      <span className="yt-play__triangle" />

    </a>
  );
}