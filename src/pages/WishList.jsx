import { Link } from "react-router-dom";
import "./wishList.css";

function WishList() {
  return (
    <>
      <section className="wishlist">
        <h1>Wish List</h1>
      </section>
      <Link to="/">Home</Link>
    </>
  );
}
export default WishList;
