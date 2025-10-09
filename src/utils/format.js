const SEKFormatter = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
});

export function formatSEK(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  return SEKFormatter.format(n);
}

export function priceFromId(id) {
  const n = Number(id);
  return 79 + (n % 20);
}
