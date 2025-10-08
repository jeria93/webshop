import { Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Hem</h1>
      <p>
        Gå till <Link to="/search">Sök</Link> för att hitta filmer.
      </p>
    </div>
  );
}
