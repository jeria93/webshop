import testImg from '../../assets/batman.jpg';
import '../ShoppingCart/shoppingCart.css'
import { FaCheck } from "react-icons/fa";
import CartItem from './CartItem';



const sampleData = [
  {
    title: "Batman nr23",
    quantity: 1,
    poster_logo: testImg,
    type: "POSTER",
    price: 150,
    id: 1
  },
  {
    title: "Superman nr5",
    quantity: 2,
    poster_logo: testImg,
    type: "MOVIE",
    price: 120,
    id: 2
  },
  {
    title: "Spider-Man nr12",
    quantity: 1,
    poster_logo: testImg,
    type: "RENTAL",
    price: 20,
    id: 3
  },
  {
    title: "Wonder Woman nr7",
    quantity: 3,
    poster_logo: testImg,
    type: "POSTER",
    price: 18,
    id: 4
  },
  {
    title: "Iron Man nr10",
    quantity: 2,
    poster_logo: testImg,
    type: "MOVIE",
    price: 16,
    id: 5
  },
  {
    title: "Thor nr8",
    quantity: 1,
    poster_logo: testImg,
    type: "RENTAL",
    price: 14,
    id: 6
  },
  {
    title: "Hulk nr15",
    quantity: 2,
    poster_logo: testImg,
    type: "POSTER",
    price: 17,
    id: 7

  },
  {
    title: "Black Widow nr3",
    quantity: 1,
    poster_logo: testImg,
    type: "MOVIE",
    price: 13,
    id: 8

  }
];




//Läsa in produkterna via Redux
export default function ShoppingCart({visibility, onClose}){

//över 500 kronor och fri frakt
const isFreeShiping = () => {
  let totalPrice = 500;  //ändras till 0 
  
  sampleData.map((item) => {
      totalPrice = totalPrice + item.price;
      console.log("total: "+ totalPrice + " item: " + item.price);
  });
      if (totalPrice > 500) {
    return (
      <p style={{ color: "green",  gap: "8px" }}>
        <FaCheck color="green" />
        Fraktfria alternativ finns
      </p>
    );
  }

  return ( <p> {500 - totalPrice} Kvar till fri frakt (handla för mer än 500 kr) </p>)  ;

 }


return(
 <div className='modal' style={{display: visibility? "block": "none"}}>
        <div className='cart'>
  <div className="parent">
  <div className="div-header">Varukorg </div>
  <div className="div-shipping-cost"> 
             
              {isFreeShiping()}
  </div>
  
  <div className="div-display-area"> 

        {/* LOGIK för att visa en vara*/}
        <CartItem items={sampleData}></CartItem>

  </div>
  <div className="payment"> Betalning</div>
</div>
</div>
</div>



      
);


}

