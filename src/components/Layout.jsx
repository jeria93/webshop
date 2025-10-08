import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "./layout.css";
import ShoppingCart from "./ShoppingCart/ShoppingCart";

export default function Layout() {
  const [showShoppingCart, SetShowShoppingCart] = useState(false);

  return (
    <div className="layout-container">
      <ShoppingCart
        visibility={showShoppingCart}
        onClose={() => {
          SetShowShoppingCart(false);
        }}
      />

      <nav className="navbar">
        <Link to="/">Hem</Link>
        <Link to="/wishList">Önskelista</Link>

        {/*Logik för varukorgen */}
        <Link
          onClick={() => {
            SetShowShoppingCart(true);
          }}
        >
          Kundvagn
        </Link>

        <Link to="/account">Konto</Link>
        <Link to="/search">Sök</Link>
      </nav>

      {/* Margin för content under navbar */}
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
}
