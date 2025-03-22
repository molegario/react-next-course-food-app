import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import CartItem from "./CartItem";
import { priceFormatter } from "../utils/formatter";

const VerifyCartPanel = () => {
  const { cart, getTotalCartPrice } = useContext(CartContext);

  const totalCartPrice = getTotalCartPrice();

  return (
    <>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="cart-total">
        <span>{priceFormatter(totalCartPrice)}</span>
      </div>
    </>
  );
};

export default VerifyCartPanel;
