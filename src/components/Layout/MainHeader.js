import { useDispatch } from "react-redux";
import { cartActions } from "../../ReducerStore";
import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";
// import useDispatch from "@reduxjs/toolkit"


const MainHeader = (props) => {
 
  
  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton ></CartButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
