import classes from "./MealItemForm.module.css";

import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {

const amountInputRef =   useRef();

const [amountIsValid,setAmountIsValid] = useState(false)

  const submitHandler = event => {
    event.preventDefault()

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmount > 5 ){
      setAmountIsValid(false);
      return
    }

    // console.log(enteredAmountNumber)
    props.onAddtoCart(enteredAmountNumber)

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref = {amountInputRef}
        input={{
          id: 'amount_' + props.id, // this changed!
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
