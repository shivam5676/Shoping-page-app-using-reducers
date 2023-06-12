import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';
import { cartActions, cartItemActions } from '../../ReducerStore';

const CartItem = (props) => {
  const dispatch=useDispatch()
  const { title, quantity, total, price ,id} = props.item;
  const addItemHandler=()=>{
    const obj={
      id:id
    }
dispatch(cartItemActions.addItemToCart(obj))
  }
  const removeItemHandler=()=>{
    const obj={
      id:id
    }
dispatch(cartItemActions.removeItemfromCart(obj))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
