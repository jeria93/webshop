import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "./layout.css";
import ShoppingCart from "./ShoppingCart/ShoppingCart";
import {UserRound, Search, ShoppingBasket, Star, House} from "lucide-react";
import logo from "../assets/MovieCart.png"

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
        <img className="logoImg" src={logo} alt="MovieCart"></img>
        
        <div className="navCenter">
        <Link className="linkIcon" to="/"><House/>Hem</Link>
        <Link className="linkIcon" to="/wishList"><Star/>Favoriter</Link>
        
        {/*Logik för varukorgen */}
        <Link  className="linkIcon" onClick={() => {
          SetShowShoppingCart(true);
        }} ><ShoppingBasket/>Varukorg</Link>


        <Link className="linkIcon" to="/account"><UserRound/>Konto</Link>
        <Link className="linkIcon" to="/search"><Search/>Sök</Link>
        </div>
      </nav>

      {/* Margin för content under navbar */}
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  );
}
