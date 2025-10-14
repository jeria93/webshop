import './cartItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addQuantity,subQuantity } from '../../features/cartSlice';
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import MoviePoster from '../MoviePoster';

// slumpa lite leverans alternativ
function getDeliveryDays() {
  const shipingDays = [
    "Skickas i dag",
    "Skickas inom 2-5 vardagar",
    "Invänta besked om leverans"
  ];
  const day = shipingDays[Math.floor(Math.random() * 3)];

  switch (day) {
    case "Skickas i dag":
      return <span style={{ color: 'green' }}>Skickas i dag</span>;
    case "Skickas inom 2-5 vardagar":
      return <span style={{ color: 'orange' }}>Skickas inom 2-5 vardagar</span>;
    case "Invänta besked om leverans":
      return <span style={{ color: 'red' }}>Invänta besked om leverans</span>;
    default:
      return <span>Information om leveranstid saknas</span>;
  }
}

export default function CartItem({ items }) {
 
  const dispatch = useDispatch();

  

  return (
    <div className='parent'>
      {items.map((item) => (
        <div className='product-item' key={item.id}>
          <div className='div-img'>
            {/*<img src={item.poster_logo} alt="bild" /> */}
            <MoviePoster path={item.poster_path} />
            {console.log(item.id)}
          </div>

          <div className='div-description'>
            <h4 className='text-heading'>{item.title}</h4>
                
                   {/* <span>pris: {item.price} SEK </span> */}
                    <span>Totalt: {item.quantity * item.price} SEK</span>
                    { /*getDeliveryDays() */ }
               
          </div>

          <div className='div-quantity'>
            <span onClick={() => dispatch(addQuantity(item.id))}>
              <IoMdAddCircleOutline size={32} />
            </span>
            <p className='p-quantity'>{item.quantity}</p>
            <span onClick={() => dispatch(subQuantity(item.id))}>
              <MdOutlineRemoveCircleOutline size={32} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}