import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {

  const cartCtx = useContext(CartContext)

  const [btnHighlighter,setBtnHighlighter] = useState(false)

  const {items} = cartCtx

  useEffect(()=>{
    setBtnHighlighter(true)
    const highlighterTimer = setTimeout(()=>{
      setBtnHighlighter(false)
    },300)

    return () => {
      clearTimeout(highlighterTimer)
    }

    
  },[items]) 

  const numberOfCartItems = items.reduce((curNumber,item)=>{
    // console.log(numberOfCartItems)
    return curNumber + item.amount
  },0)

  const btnClasses = `${classes.button} ${ btnHighlighter ? classes.bump : ''}`

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
