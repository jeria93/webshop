import { Link } from "react-router-dom";
import "./wishList.css";
import { Heart, Trash2} from "lucide-react";
import { useState } from "react";

function WishList({defaultLiked = false, onChange, onDelete}) {
  const [liked, setLiked] = useState(defaultLiked);

  const toggle = () => {
    const next =!liked;
    setLiked(next);
      onChange?.(next);
  };

  return (
    <>
      <section className="wishlist">

        <h1 className="rubrik">Önksade artiklar</h1>
        <section className="card">
          <section className="buttons">
          <button onClick={toggle}
           aria-pressed={liked} 
          aria-label={liked? "tabort gilla" : "gilla"}
          className="icon-btn icon-btn--heart">
            <Heart className="heart-btn" aria-hidden="true"/>
          </button>
          <button className="icon-btn"onClick={onDelete}> <Trash2 className="trash-btn"/> </button>
          </section>

        </section>

      </section>
      <Link to="/">Home</Link>
    </>
  );
}
export default WishList;
