import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItem = useSelector((state) => state.cartItem.itemArray);
  const newArray = cartItem.map((item) => {
    let total = item.quantity * item.price;
    return (
      <CartItem
        key={item.id}
        item={{
          id:item.id,
          title: item.title,
          quantity: item.quantity,
          total: total,
          price: item.price,
          token:item.token
        }}
      />
    );
  });
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {/* <CartItem
          item={{ title: 'Test Item', quantity: 3, total: 18, price: 6 }}
        /> */}
        {newArray}
      </ul>
    </Card>
  );
};

export default Cart;
