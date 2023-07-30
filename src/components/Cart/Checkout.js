import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim().length !== 0;
const zipcodeValid = (value) => /^\d+$/.test(value) && value.length === 6;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    city: true,
    zipcode: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const zipcodeRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredZipcode = zipcodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameIsValid = isNotEmpty(enteredName);
    const enteredStreetIsValid = isNotEmpty(enteredStreet);
    const enteredZipcodeIsValid = zipcodeValid(enteredZipcode);
    const enteredCityIsValid = isNotEmpty(enteredCity);

    setFormValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredStreetIsValid,
      zipcode: enteredZipcodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredZipcodeIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredZipcode;

    console.log(
      enteredNameIsValid,
      enteredZipcodeIsValid,
      enteredCityIsValid,
      enteredStreetIsValid
    );
    if (!formIsValid) {
      console.log("invalid form");
      return
    }

    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      zipcode:enteredZipcode,
      city:enteredCity
    })
  };

  const nameControlClasses = `${classes.control} ${!formValidity.name ? classes.invalid : '' }`
  const streetControlClasses = `${classes.control} ${!formValidity.street ? classes.invalid : '' }`
  const zipcodeControlClasses = `${classes.control} ${!formValidity.zipcode ? classes.invalid : '' }`
  const cityControlClasses = `${classes.control} ${!formValidity.city ? classes.invalid : '' }`


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes["input-wrapper"]}>
        <div className={nameControlClasses}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameRef} />
          {!formValidity.name && <p>Enter a Valid Name</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetRef} />
          {!formValidity.street && <p>Enter a Valid Street</p>}
        </div>
        <div className={zipcodeControlClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={zipcodeRef} />
          {!formValidity.zipcode && <p>Enter a Valid Postal Code</p>}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityRef} />
          {!formValidity.city && <p>Enter a valid City Name</p>}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
