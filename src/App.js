import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";


function App() {
  
  const open = useSelector ((state) => state.isOpen);
console.log(open)
  return (
    <Layout>
      {open ? <Cart /> : ""}
      <Products />
    </Layout>
  );
}

export default App;
