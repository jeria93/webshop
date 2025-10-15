import './cartItem.css';
import { useDispatch} from 'react-redux';
import { removeFromCart, addQuantity,subQuantity } from '../../features/cartSlice';
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import MoviePoster from '../MoviePoster/MoviePoster';


export default function CartItem({ items }) {

 function typeOfMedia(type){
  switch(type){
    case "POSTER":
      return "Poster";
    case "PURCHASED":
      return "Köpfilm";
    case "RENTAL":
      return "Hyrfilm";
    default:
      return "Okända vara";
  }
 } 
 
  const dispatch = useDispatch();
  return (
    <div className='parent'>
      {items.map((item) => (
        <div className='product-item' key={`${item.id}-${item.type}`}>
          <div className='div-img'>
            <MoviePoster path={item.poster_path} />
          </div>

          <div className='div-description'>
            <h4 className='text-heading'>{item.title}</h4>
            <span>{typeOfMedia(item.type)}</span>
                
                  
                    <span>Totalt: {item.quantity * item.price} SEK</span>
                    
               
          </div>
          {/**Endast poster ska ha aplus och minus knapp */}
          { item.type == "POSTER" ? (
          <div className='div-quantity'>
            <span onClick={() => dispatch(addQuantity({id: item.id, type: item.type}))}>
              <IoMdAddCircleOutline size={32} />
            </span>
            <p className='p-quantity'>{item.quantity}</p>
            <span onClick={() => dispatch(subQuantity({id: item.id, type: item.type}))}>
              <MdOutlineRemoveCircleOutline size={32} />
            </span>
          </div>
         ): ( 
          <div>
             <FaRegTrashAlt 
                size={36}
                onClick={() => dispatch(removeFromCart(item.id, item.type))} />
          </div>    
         ) }
        </div>
      ))}
    </div>
  );
}