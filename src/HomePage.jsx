import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Hem</h1>
      <p>
        Gå till <Link to="/search">Sök</Link> för att hitta filmer.
      </p>
    </div>
  );
}
