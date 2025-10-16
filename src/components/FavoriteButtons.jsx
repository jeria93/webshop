export function ClearFavoritesButton({ disabled, onClear }) {
  return (
    <button
      type="button"
      className="clear-favorites-btn"
      onClick={onClear}
      disabled={disabled}
    >
      Ta bort alla
    </button>
  );
}

export function RemoveFavoriteButton({ onRemove }) {
  return (
    <button type="button" className="remove-favorite-btn" onClick={onRemove}>
      Ta bort
    </button>
  );
}
