import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { cartItemActions, cartActions, uiActions } from "./ReducerStore"
import { Fragment } from "react";
import Notification from "./components/UI/Notification";

function App() {
  const open = useSelector((state) => state.cartOpen.isOpen);
  const dispatch = useDispatch();
const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
   
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    fetch(`https://the-shopping-page-default-rtdb.firebaseio.com/cart.json`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network connection is poor... Unable to fetch data.");
        }
      })
      .then((res) => {
        console.log(res);
        Object.values(res).map((item) => {
          dispatch(cartItemActions.addItemToCart(item));
        });
        // dispatch(uiActions.showNotification({ title: "Success", message: "Data fetched successfully.", status: "success" }));
        dispatch(
          uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Sent cart data successfully!',
          })
        );
      })
      .catch((err) => {
        console.log(err);
        // dispatch(uiActions.showNotification({ title: "Error", message: err.message, status: "error" }));
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending cart data failed!',
          })
        );
      });
  }, [dispatch]);

  
  // console.log(notification.ui)
  // console.log(notification)
  // console.log(notification.status==="success")
// 


  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {open ? <Cart /> : ""}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
