import React from 'react';
import '../ShoppingCart/shoppingCart.css'
import { FaCheck } from "react-icons/fa";
import CartItem from './CartItem';
import { IoCloseCircle } from "react-icons/io5";
import { selectCartItems, selectCartCount , selectCartTotal} from '../../features/cartSlice';
import { useSelector } from 'react-redux';





export default function ShoppingCart({visibility, onClose}){

  const cartItems = useSelector(selectCartItems) //varukorgen
  const cartTotal = useSelector(selectCartTotal) //total priset i varukorgen 

  function handlePaymentBtn(){
    //spara ev hyrfimler lokalt
    const rentals = cartItems.filter((item) => item.type === "RENTAL");
    localStorage.setItem('rentals', JSON.stringify(rentals));

    //Spara köpta posters lokalt
    const posters = cartItems.filter((item) => item.type === "POSTER");
    localStorage.setItem('posters', JSON.stringify(posters));

    //Spara köpta filmer lokalt
    const purchased = cartItems.filter((item) => item.type === "PURCHASED");
    localStorage.setItem('purchased', JSON.stringify(purchased));

    console.log(cartItems)
  
  }


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
  <p><button className='btn-payment' onClick={() => {handlePaymentBtn()}}>Betalning</button></p>
  </div>
</div>
</div>
</div>
    
);

}






