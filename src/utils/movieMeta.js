/** Formats runtime (minutes) into Swedish text, returns "—" if invalid. */
export function formatRuntimeOrDash(minutes) {
  if (!(minutes > 0)) return "-";
  const wholeHours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return wholeHours
    ? `${wholeHours} timmar ${remainingMinutes} minuter`
    : `${remainingMinutes} minuter`;
}

/**
 * Formats a genre list [{name}] into "Action, Komedi".
 * Limits how many items to show and joins with a separator. Empty -> "-".
 */
export function formatGenres(genreList = [], maxGenres = 3, separator = ", ") {
  const list = Array.isArray(genreList) ? genreList : [];
  const names = list.slice(0, maxGenres).map((genre) => genre?.name);
  return names.length ? names.join(separator) : "—";
}

/**
 * Returns up to `maxToShow` cast member names, joined with `joinWith`.
 * Assumes TMDB cast is usually pre-sorted. Empty -> "—".
 */
export function getTopCastNames(castList = [], maxToShow = 3, joinWith = ", ") {
  const names = (Array.isArray(castList) ? castList : [])
    .slice(0, maxToShow)
    .map((castMember) => castMember?.name);
  return names.length ? names.join(joinWith) : "—";
}

/**
 * Returns all director names (may be multiple) as a comma-separated string.
 * No directors found -> null (so the UI can hide the field).
 */
export function getDirectorNames(crewList = [], joinWith = ", ") {
  const directorNames = (Array.isArray(crewList) ? crewList : [])
    .filter((person) => person?.job === "Director")
    .map((person) => person?.name);
  return directorNames.length ? directorNames.join(joinWith) : null;
}

// Returns "YYYY" from a date string (e.g. "1998-07-15"), otherwise "—".
export function formatYearOrDash(dateString) {
  return dateString.length >= 4 ? dateString.slice(0, 4) : "—";
}

// Formats a TMDB rating to one decimal place, otherwise "—".
export function formatVoteAverageOrDash(voteAverage) {
  const numericValue = Number(voteAverage);
  return Number.isFinite(numericValue) ? numericValue.toFixed(1) : "—";
}
