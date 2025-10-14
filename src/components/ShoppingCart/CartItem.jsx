import './cartItem.css';
// import img from "../../assets/batman.jpg";
import { useState } from 'react';
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

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
  const [quantity, setQuantity] = useState(items.map(item => item.quantity));

  function handleIncClick(index) {
    setQuantity(prev =>
      prev.map((q, i) => (i === index ? q + 1 : q))
    );
  }

  function handleDecClick(index) {
    setQuantity(prev =>
      prev.map((q, i) => (i === index ? q - 1 : q))
    );
  }

  return (
    <div className='parent'>
      {items.map((item, index) => (
        <div className='product-item' key={item.id}>
          <div className='div-img'>
            <img src={item.poster_logo} alt="bild" />
          </div>

          <div className='div-description'>
            <h4 className='text-heading'>{item.title}</h4>
                
                   {/* <span>pris: {item.price} SEK </span> */}
                    <span>Totalt: {item.price * quantity[index]} SEK</span>
                    {/* getDeliveryDays() */}
               
          </div>

          <div className='div-quantity'>
            <span onClick={() => handleIncClick(index)}>
              <IoMdAddCircleOutline size={32} />
            </span>
            <p className='p-quantity'>{quantity[index]}</p>
            <span onClick={() => handleDecClick(index)}>
              <MdOutlineRemoveCircleOutline size={32} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}