import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import CartItem from "./CartItem";

const VerifyCartPanel = () => {

  const { cart, getMenuItemById, getTotalCartPrice } =
    useContext(CartContext);

  const cartItems = cart.map((item) => {
    const menuItem = getMenuItemById(item.id);
    return {
      ...item,
      name: menuItem.name,
      price: menuItem.price,
    };
  });

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
