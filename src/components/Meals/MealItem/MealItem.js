import { useContext } from 'react';

import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {

  const cartCtx = useContext(CartContext)

  const price = `₹${props.price.toFixed(2)}`

  const addToCartHandler = amount => {
    console.log(amount)
    cartCtx.addItem({
      id:props.id,
      name:props.name,
      amount:amount,
      price:props.price
    })
    // console.log(10 + + "5")
    console.log(cartCtx)
  }

  return (
    <li className={classes.meal}>
      <div>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
      </div>
      <div>
        <MealItemForm onAddtoCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem