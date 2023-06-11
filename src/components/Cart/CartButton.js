import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import { cartActions } from '../../ReducerStore';

const CartButton = (props) => {
  const dispatch=useDispatch()
  const cartOpenHandler=()=>{
    dispatch(cartActions .openCart())
    
  }
  return (
    <button className={classes.button} onClick={cartOpenHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
