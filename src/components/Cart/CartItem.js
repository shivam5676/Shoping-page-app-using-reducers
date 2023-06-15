import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions, cartItemActions } from "../../ReducerStore";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price, id, token } = props.item;
  const addItemHandler = () => {
    const obj = {
      id: id,
      token: token,
    };
    fetch(
      `https://the-shopping-page-default-rtdb.firebaseio.com/cart/${token}.json`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("network connection is poor......unable to save it");
        }
      })
      .then((res) => {
        // console.log({...res})
        const obj = { ...res, quantity: res.quantity + 1 };
        fetch(
          `https://the-shopping-page-default-rtdb.firebaseio.com/cart/${token}.json`,
          {
            method: "PUT",
            body: JSON.stringify(obj),
          }
        );

        console.log(dispatch(cartItemActions.addItemToCart(obj)));
      })
      .catch((err) => {
        console.log(err);
      });
    // dispatch(cartItemActions.addItemToCart(obj));
  };

  const removeItemHandler = () => {
    const obj = {
      id: id,
      token: token,
    };
    fetch(
      `https://the-shopping-page-default-rtdb.firebaseio.com/cart/${token}.json`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("network connection is poor......unable to save it");
        }
      })
      .then((res) => {
         console.log({...res})
        if (res.quantity > 1) {
          const obj = { ...res, quantity: res.quantity - 1 };
          fetch(
            `https://the-shopping-page-default-rtdb.firebaseio.com/cart/${token}.json`,
            {
              method: "PUT",
              body: JSON.stringify(obj),
            }
          );
          dispatch(cartItemActions.removeItemFromCart(obj));
        }
        else{
          const obj = { ...res, quantity: res.quantity - 1 };
          fetch(
            `https://the-shopping-page-default-rtdb.firebaseio.com/cart.json`,
            {
              method: "DELETE",
              
            }
          ).then(()=>{
            dispatch(cartItemActions.removeItemFromCart(obj))
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
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
