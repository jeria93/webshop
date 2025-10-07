import testImg from '../../assets/batman.jpg';
import '../ShoppingCart/shoppingCart.css'
import { AiFillCloseCircle } from 'react-icons/ai';
import { RiDeleteBin6Fill } from 'react-icons/ri';

// Test objekt innan redux biten är klar
// type, tänker mig poster, film, rental mm

const POSTER = "POSTER";

const item = {
    title: "Batman nr23",
    quantity: 1,
    poster_logo: testImg,
    type: POSTER
}

//Läsa in produkterna via Redux
export default function ShoppingCart({visibility, onClose}){

return (
    <div className='modal' style={{display: visibility? "block": "none"}}>
        <div className='cart'>
            <div className='header'>
                <h2>Kundvagn</h2>
                <button className='btn btn-close'> onClick={onClose}</button>
                <AiFillCloseCircle  size={34}/>

            </div>
        </div>
    </div>

);


}


// <FaRegTrashCan />  <IoMdAddCircleOutline /> <GrSubtractCircle />


