// Intl formatter for Swedish Krona (SEK), e.g. 79 -> "79,00 kr".
const SEKFormatter = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
});

// Formats a value as SEK, returns "-" for invalid input
export function formatSEK(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  return SEKFormatter.format(n);
}

// Rental price from movie id: 79 + (id % 20)
export function rentPriceFromId(id) {
  const n = Number(id);
  return 79 + (n % 20);
}

// Purchase price = rental price + 90
export function buyPriceFromId(id) {
  return priceFromId(id) + 90;
}

// Poster price from movie id: 49 + (id % 30)
export function posterPriceFromId(id) {
  return 49 + (Number(id) % 30);
}

// Backwards compatible alias for rentPriceFromId
export const priceFromId = rentPriceFromId;
