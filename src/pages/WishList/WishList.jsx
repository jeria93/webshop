import { Link } from "react-router-dom";
import s from "./wishList.module.css";
import { Heart, Trash2, ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { priceFromId } from "../../utils/format.js";

function WishList({ defaultLiked = false, onChange, onDelete }) {
  const [liked, setLiked] = useState(defaultLiked);

  const toggle = () => {
    const next = !liked;
    setLiked(next);
    onChange?.(next);
  };

  return (
    <>
      <section className={s.wishlist}>
        <h1 className={s.rubrik}>Favoriter</h1>
        <section className={s.wishCard}>
          <div className={s.movieImg}>
            <p>"Bild på film"</p>
          </div>
          <div className={s.moviePrice}>
            {/* <p>Hyra: 79kr logik{priceFromId}</p>
            <p>Köpa: 169kr logik{priceFromId}</p> */}
          </div>

          <section className={s.buttons}>
            <button
              type="button"
              onClick={toggle}
              aria-pressed={liked}
              aria-label={liked ? "tabort gilla" : "gilla"}
              className={`${s["iconBtn"]} ${s["iconBtnHeart"]}`}
            >
              <Heart className={s.heartBtn} aria-hidden="true" />
            </button>
            <button type="button" className={s.iconBtn} onClick={onDelete}>
              {" "}
              <Trash2 className={s.trashBtn} />{" "}
            </button>
          </section>
        </section>
        <Link className={s.linkBtn} to="/">
          <ArrowLeftIcon /> Tillbaka
        </Link>
      </section>
    </>
  );
}
export default WishList;
