import { useContext } from "react";
import { CartContext } from "../store/cart-context";

const CheckoutPanel = ({
  checkoutState,
}) => {
  const { getTotalCartPrice } = useContext(CartContext);
  const totalCartPrice = getTotalCartPrice();

  const {
    errors,
    enteredValues,
  } = checkoutState;

  return (
    <>
      <h2>Checkout</h2>
      <p>
        Total Amount: <span>${totalCartPrice.toFixed(2)}</span>
      </p>
      <p className="control">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={enteredValues?.name}
        />
      </p>
      <p className="control">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={enteredValues?.email}
        />
      </p>
      <p className="control">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          name="street"
          defaultValue={enteredValues?.street}
        />
      </p>
      <div className="control-row">
        <p className="control">
          <label htmlFor="postalcode">Postal Code</label>
          <input
            type="text"
            id="postal-code"
            name="postal-code"
            defaultValue={enteredValues?.["postal-code"]}
          />
        </p>
        <p className="control">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            defaultValue={enteredValues?.city}
          />
        </p>
      </div>
      <ul>
        {errors &&
          errors.length > 0 &&
          errors.map((error, index) => <li key={index}>{error}</li>)}
      </ul>
    </>
  );
};

export default CheckoutPanel;
