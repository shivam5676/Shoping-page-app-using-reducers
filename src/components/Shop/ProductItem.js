import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartItemActions } from "../../ReducerStore";

const ProductItem = (props) => {
  const { title, price, description } = props;
  const dispatch = useDispatch();
  const cartArray=useSelector(state=>state.cartItem.itemArray)
  console.log(cartArray)
  const addToCartHandler = () => {
    const myObj = {
      id:1,
      title: title,
      price: price,
      quantity: +1,
    };
    dispatch(cartItemActions.addItemToCart(myObj))
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
