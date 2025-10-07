import { FaRegTrashCan, IoMdAddCircleOutline,GrSubtractCircle    } from "react-icons/fa6";
import 'ShopingCart.cs'

// Test objekt innan redux biten är klar
// type, tänker mig poster, film, rental mm

const POTER = "POSTER"

const item = {
    title: "Batman nr23",
    quantity: 1,
    poster_logo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsv.wikipedia.org%2Fwiki%2FBatman&psig=AOvVaw1jakJ3SGqzNLWMmuGYwhS6&ust=1759922410514000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKi0kIX8kZADFQAAAAAdAAAAABAE",
    price: 123,
    type: POSTER
}


function ShopingCart(){

return (

<>
    <div className=".cart_container">
    <h1>kundvagn</h1>
    </div>
</>

);


}



// <FaRegTrashCan />  <IoMdAddCircleOutline /> <GrSubtractCircle />


