import { useContext } from "react";
import { CartContext } from "../store/cart-context";

const CartButton = () => {
  const { cart, showCart } = useContext(CartContext);

  return (
    <button className="text-button" onClick={showCart}>
      Cart ({cart?.length ?? 0})
    </button>
  );
};

export default CartButton;