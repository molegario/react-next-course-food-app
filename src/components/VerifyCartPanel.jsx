import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import CartItem from "./CartItem";

const VerifyCartPanel = () => {

  const { getDetailedCartItems, getTotalCartPrice } =
    useContext(CartContext);

  const cartItems = getDetailedCartItems();
  const totalCartPrice = getTotalCartPrice();

  return (
    <>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </ul>
      <div className="cart-total">
        <span>${totalCartPrice.toFixed(2)}</span>
      </div>
    </>
  );
};

export default VerifyCartPanel;
