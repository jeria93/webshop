import { posterUrl } from "../../features/api";

export default function MoviePoster({
  path,
  alt = "",
  width = 60,
  height = 90,
}) {
  if (path) {
    return (
      <img
        src={posterUrl(path)}
        alt={alt}
        width={width}
        height={height}
        style={{ objectFit: "cover", borderRadius: 4 }}
      />
    );
  }

  return (
    <div
      style={{
        width,
        height,
        background: "gainsboro",
        borderRadius: 4,
      }}
    />
  );
}
