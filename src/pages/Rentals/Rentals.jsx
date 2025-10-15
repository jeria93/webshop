import './rental.css'
import { selectCartItems } from '../../features/cartSlice';



export default function Rentals({}){

    const rentals = localStorage.getItem('rentals')

    return(
        <div className="rental-container">
        <div className='rental-header'> 
            <h1>Hyrfilmer</h1>
            <p>Här visas dina hyrda filmer</p>
            <p>{rentals}</p>
            </div>
        </div>
    );


}