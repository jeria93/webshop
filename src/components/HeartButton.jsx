import "./HeartButton.css";

export default function HeartButton({ liked = false, onToggle }) {
  return (
    <button
      type="button"
      className={`heart-btn ${liked ? "is-liked" : ""}`}
      onClick={onToggle}
    >
      <span className="heart-icon" />
    </button>
  );
}
