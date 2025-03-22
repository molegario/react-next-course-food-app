import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import Input from "./UI/Input";
import { priceFormatter } from "../utils/formatter";

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
        Total Amount: <span>{priceFormatter(totalCartPrice)}</span>
      </p>
      <Input
        id="name"
        type="text"
        name="name"
        labelText="Full Name"
        defaultValue={enteredValues?.name}
      />
      <Input
        id="email"
        type="email"
        name="email"
        labelText="Email Address"
        defaultValue={enteredValues?.email}
      />
      <Input
        id="street"
        type="text"
        name="street"
        labelText="Street"
        defaultValue={enteredValues?.street}
      />
      <div className="control-row">
        <Input
          id="postal-code"
          type="text"
          name="postal-code"
          labelText="Postal Code"
          defaultValue={enteredValues?.["postal-code"]}
        />
        <Input
          id="city"
          type="text"
          name="city"
          labelText="City"
          defaultValue={enteredValues?.city}
        />
      </div>
      <ul>
        {errors &&
          errors.length > 0 &&
          errors.map((error, index) => <li key={`error-${index}`}>{error}</li>)}
      </ul>
    </>
  );
};

export default CheckoutPanel;
