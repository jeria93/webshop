import { useState } from 'react';
import testImg from '../../assets/batman.jpg';
import '../ShoppingCart/shoppingCart.css'
import { IoCloseCircleOutline } from "react-icons/io5";


// Test objekt innan redux biten är klar
// type, tänker mig poster, film, rental mm


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
    price: 200,
    id: 3
  },
  {
    title: "Wonder Woman nr7",
    quantity: 3,
    poster_logo: testImg,
    type: "POSTER",
    price: 180,
    id: 4
  },
  {
    title: "Iron Man nr10",
    quantity: 2,
    poster_logo: testImg,
    type: "MOVIE",
    price: 160,
    id: 5
  },
  {
    title: "Thor nr8",
    quantity: 1,
    poster_logo: testImg,
    type: "RENTAL",
    price: 140,
    id: 6
  },
  {
    title: "Hulk nr15",
    quantity: 2,
    poster_logo: testImg,
    type: "POSTER",
    price: 170,
    id: 7

  },
  {
    title: "Black Widow nr3",
    quantity: 1,
    poster_logo: testImg,
    type: "MOVIE",
    price: 130,
    id: 8

  }
];


// slumpa lite leverans alternativ
function getDeliveryDays(){
  const shipingDays = ["Skickas i dag", "Skickas inom 2-5 vardagar", "Invänta besked om leverans"]
  return shipingDays[Math.floor(Math.random() * 3)];
}

//Läsa in produkterna via Redux
export default function ShoppingCart({visibility, onClose}){

  


return(
  <div className='modal' style={{display: visibility? "block": "none"}}>
   <div className='cart'>

    <div className='div-header product-header'>Varukorg</div>
    <div className='div6'> fri frakt?</div>
   
     <div className='parent'>
    {sampleData.map((item) => (
 
  
   <div>
  <div className='div-img'> <img src={item.poster_logo} alt="" /></div>
  <div className='div-content'> content </div>
  <div className='div-quantity'> quantity</div>
  

</div>


   )) }
</div>
<div className='div-sum-payment'> betalning</div>


        </div>   
    </div>
);


}


// <FaRegTrashCan />  <IoMdAddCircleOutline /> <GrSubtractCircle />

/*
return (
    <div className='modal' style={{display: visibility? "block": "none"}}>
        <div className='cart'>
            <div className='header'>
                <h2>Kundvagn</h2>
                <button className='btn btn-close' onClick={onClose}>
                <AiFillCloseCircle  size={34}/>
                </button>
                {sampleData.map((item) => (
                    <div key={item.id}>
                        <div className="cart-product">
                            <img src={item.poster_logo} alt={item.title} className='cart-img'/> <RiDeleteBin6Fill size={34} />
                            <div className="product-info">
                                <div className="product-title">{item.title}</div>
                                <div className="product-details">
                                  {getDeliveryDays()}
                                  <p style={ getDeliveryDays === "Skickas i dag" ? { color: "green" } : { color: "black" } }>
                                 
                                    </p>
                                    <p>Antal: {item.quantity}</p>
                                    <p>Pris: {item.price} kronor</p>
                                    <p>Total: {item.price * item.quantity}kronor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    </div>
</div>
                
      */