import { useContext } from "react";
import { CartContext } from "../store/cart-context";

const CheckoutPanel = ({
  checkoutState,
}) => {
  const { getTotalCartPrice } = useContext(CartContext);
  const totalCartPrice = getTotalCartPrice();

  return (
    <>
      <h2>Checkout</h2>
      <p>
        Total Amount: <span>${totalCartPrice.toFixed(2)}</span>
      </p>
      <p className="control">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="fullname" name="fullname" required />
      </p>
      <p className="control">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p className="control">
        <label htmlFor="address">Street</label>
        <input type="text" id="address" name="address" required />
      </p>
      <div className="control-row">
        <p className="control">
          <label htmlFor="postalcode">Postal Code</label>
          <input type="text" id="postalcode" name="postalcode" required />
        </p>
        <p className="control">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" required />
        </p>
      </div>
    </>
  );
};

export default CheckoutPanel;
