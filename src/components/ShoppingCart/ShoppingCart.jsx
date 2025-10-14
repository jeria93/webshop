import React from 'react';
import '../ShoppingCart/shoppingCart.css'
import { FaCheck } from "react-icons/fa";
import CartItem from './CartItem';
import { IoCloseCircle } from "react-icons/io5";
import { selectCartItems, selectCartCount , selectCartTotal} from '../../features/cartSlice';
import { useSelector } from 'react-redux';


/*const sampleData = [
  {
    title: "Batman nr23",
    quantity: 1,
    poster_logo: testImg,
    type: "POSTER",
    price: 1,
    id: 1
  },
  {
    title: "Superman nr5",
    quantity: 1,
    poster_logo: testImg,
    type: "MOVIE",
    price: 1,
    id: 2
  },
  {
    title: "Spider-Man nr12",
    quantity: 1,
    poster_logo: testImg,
    type: "RENTAL",
    price: 1,
    id: 3
  },
  {
    title: "Wonder Woman nr7",
    quantity: 1,
    poster_logo: testImg,
    type: "POSTER",
    price: 1,
    id: 4
  },
  {
    title: "Iron Man nr10",
    quantity: 1,
    poster_logo: testImg,
    type: "MOVIE",
    price: 1,
    id: 5
  },
  {
    title: "Thor nr8",
    quantity: 1,
    poster_logo: testImg,
    type: "RENTAL",
    price: 1,
    id: 6
  },
  {
    title: "Hulk nr15",
    quantity: 1,
    poster_logo: testImg,
    type: "POSTER",
    price: 1,
    id: 7

  },
  {
    title: "Black Widow nr3",
    quantity: 1,
    poster_logo: testImg,
    type: "MOVIE",
    price: 490,
    id: 8

  }
];
*/



//Läsa in produkterna via Redux
export default function ShoppingCart({visibility, onClose}){

  const cartItems = useSelector(selectCartItems) //varukorgen
  const cartCount = useSelector(selectCartCount) //totala antalet varor i korgen
  const cartTotal = useSelector(selectCartTotal) //total priset i varukorgen 

  React.useEffect(() => {
    if (visibility) {
      // Förhindrar scroll bakom modal
      document.body.style.overflow = 'hidden';
    } else {
      // Återställer scroll när modal stängs
      document.body.style.overflow = 'unset';
    }
    
    // Säkerställer att scroll återställs
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [visibility]);


//över 500 kronor och fri frakt
const isFreeShiping = () => {
  let totalPrice = cartTotal;  //ändras till 0 
  
  
      if (totalPrice >= 500) {
    return (
      <p style={{ color: "green",  gap: "8px" }}>
        <FaCheck color="green" />
        Fraktfria alternativ finns
      </p>
    );
  }

  return ( <p> {500 - totalPrice} kronor kvar till fri frakt (handla för mer än 500 kr) </p>)  ;

 }


return(
 <div className='modal' style={{display: visibility? "block": "none"}}
        
        onClick={(e) => {
     // Stänger kundkorg om man klickar utanfor
     if (e.target === e.currentTarget) {
       onClose();
     }
   }}
 >
        
        <div  className='cart'
               style={{
    backgroundImage: `url(${''})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
      
      >

  <div className="parent">
  <div className="div-header">
    <h2>Varukorg</h2> 
    <IoCloseCircle className='btn-exit' size={34} style={{color: "red"}} onClick={onClose}/>
  </div>
  <div className="div-shipping-cost"> 
             
              {isFreeShiping()}
  </div>
  
  <div className="div-display-area"> 

        {/* LOGIK för att visa en vara*/}
        <CartItem items={cartItems}></CartItem>

  </div>
 
  <div className="payment"> 
  <h4>Total: {cartTotal} SEK </h4>
  <p><button className='btn-payment'>Betalning</button></p>
  </div>
</div>
</div>
</div>



      
);


}

