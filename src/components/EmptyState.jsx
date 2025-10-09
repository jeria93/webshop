import "./EmptyState.css";

export default function EmptyState({ title = "Inget att visa än" }) {
  return (
    <div className="empty">
      <p className="empty__title">{title}</p>
    </div>
  );
}
