import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "./Layout.css";

export default function Layout() {

const [showShoppingCart, SetShowShoppingCart] = useState(false);

  return (
    <div className="layout-container">
      <nav className="navbar"> 
        <Link to="/">Hem</Link>
        <Link to="/wishList">Önskelista</Link>
        <Link to="/movieDetails">Kundvagn</Link>
        <Link to="/movieDetails">Sök</Link>
        <Link to="/movieDetails">Konto</Link>
      </nav>

      {/* Margin för content under navbar */}
      <div className="content-wrapper">
        <Outlet />
      </div>
      
    </div>
  );
}