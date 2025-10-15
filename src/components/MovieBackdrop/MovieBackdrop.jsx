import { backdropUrl } from "../../features/api";

export default function MovieBackdrop({
  path,
  alt = "",
  fit = "cover",
  position = "50% 20%",
  ratio = "21 / 9",
}) {
  if (!path?.trim()) return <div className="hero__placeholder" />;

  const src = backdropUrl(path, "w1280");

  return (
    <img
      className="hero__img"
      src={src}
      alt={alt}
      style={{
        width: "100%",
        aspectRatio: ratio,
        objectFit: fit,
        objectPosition: position,
      }}
    />
  );
}
