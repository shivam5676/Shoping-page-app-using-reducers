import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartItemActions } from "../../ReducerStore";
import { useEffect } from "react";

const ProductItem = (props) => {
  // const dispatch=useDispatch()

  const { title, price, description } = props;
  const dispatch = useDispatch();
  const cartArray = useSelector((state) => state.cartItem.itemArray);
  // console.log(cartArray)
  const addToCartHandler = () => {
    const myObj = {
      id: 1,
      title: title,
      price: price,
      quantity: +1,
    };
    fetch("https://the-shopping-page-default-rtdb.firebaseio.com/cart.json", {
      method: "POST",
      body: JSON.stringify(myObj),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("network connection is poor......unable to save it");
        }
      })
      .then((res) => {
        const obj = { ...myObj, token: res.name };
        fetch(
          `https://the-shopping-page-default-rtdb.firebaseio.com/cart/${res.name}.json`,
          {
            method: "PUT",
            body: JSON.stringify(obj),
          }
        ).then(() => {
          console.log(dispatch(cartItemActions.addItemToCart(obj)));
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
