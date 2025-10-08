import "./EmptyState.css";

export default function EmptyState({ title = "Nothing to show yet" }) {
  return (
    <div className="empty">
      <p className="empty__title">{title}</p>
    </div>
  );
}
