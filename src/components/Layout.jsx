import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "./layout.css";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import {UserRound, Search, ShoppingBasket, Star, House, Menu, X, Clapperboard, TvMinimalPlay} from "lucide-react";
import logo from "../assets/MovieCart5.png"

export default function Layout() {
  const [showShoppingCart, SetShowShoppingCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="layout-container">
      <ShoppingCart
        visibility={showShoppingCart}
        onClose={() => {
          SetShowShoppingCart(false);
        }}
      />

      <nav className="navbar"> 
        <img className="logoImg" src={logo} alt="MovieCart"></img>

        {/* Mobilanpassad knapp för att få upp menyn/ förvinner om skärmen är större */}
        <button className="menuButton" aria-expanded={menuOpen} aria-controls="navCenter"
        onClick={() => setMenuOpen((v) => !v)}>
          {menuOpen ? <X aria-hidden /> : <Menu aria-hidden/>}
        </button>

        <div id="navCenter" className={`navCenter ${menuOpen ? "is-open" : ""}`}>
        <Link className="linkIcon" to="/" onClick={closeMenu}><House/>Hem</Link>
        <Link className="linkIcon" to="/category" onClick={closeMenu}><Clapperboard/>Kategorier</Link>
        
        {/*Logik för varukorgen*/}
        <button className="linkIcon as-link" onClick={() => {
           SetShowShoppingCart(true);
           closeMenu();

        }}><ShoppingBasket/>Varukorg</button>


        <Link className="linkIcon" to="/account" onClick={closeMenu}><UserRound/>Konto</Link>
        <Link className="linkIcon" to="/search" onClick={closeMenu}><Search/>Sök</Link>
        <Link className="linkIcon" to="/rental" onClick={closeMenu}><TvMinimalPlay/> hyrfilmer</Link>
        </div>
      </nav>

      {/* Margin för content under navbar */}
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
}
