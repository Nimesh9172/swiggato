import { useContext } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {

  const cartCtx = useContext(CartContext)

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`

  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount:1})
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItems = (
    <ul>
      {cartCtx.items.map((item) => (
        <CartItem key={item.id} price={item.price} amount={item.amount} name={item.name} onRemove={cartItemRemoveHandler.bind(this,item.id)} onAdd={cartItemAddHandler.bind(this,item)}/>
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
          {hasItems && <button className={classes.button}>Order</button>}
        </div>
      </div>
    </Modal>
  );
};

export default Cart