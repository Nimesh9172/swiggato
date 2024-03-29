import { Fragment, useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          price={item.price}
          amount={item.amount}
          name={item.name}
          onRemove={cartItemRemoveHandler.bind(this, item.id)}
          onAdd={cartItemAddHandler.bind(this, item)}
        />
      ))}
    </ul>
  );

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-http-925d0-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);

    setIsSubmitting(false);
    setDidSubmit(true);
  };

  const actionButtons = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const closeOnOrderPlacedHandler = () => {
    props.onClose()
    cartCtx.clearItem()
  } 

  let modalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!isCheckout && actionButtons}
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
    </Fragment>
  );

  if (isSubmitting) {
    modalContent = <p>Placing the Order...</p>;
  }

  if (didSubmit) {
    modalContent = (
      <Fragment>
        <p>Order Placed successfully</p>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={closeOnOrderPlacedHandler}>
            Close
          </button>
        </div>
      </Fragment>
    );
  }

  return <Modal onClose={props.onClose}>{modalContent}</Modal>;
};

export default Cart;
