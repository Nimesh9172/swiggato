import classes from "./Cart.module.css";

import Modal from "../UI/Modal";

const Cart = () => {
  const cartItems = (
    <ul>
      {[
        {
          id: "c1",
          name: "Sushi",
          amount: 2,
          price: 12.99,
        },
      ].map((item) => (
        <li key={item.id} className={classes["cart-items"]}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal>
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>35.62</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]}>Close</button>
          <button className={classes.button}>Order</button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart