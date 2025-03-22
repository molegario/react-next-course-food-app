import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import Button from "./UI/Button";

const CartButton = () => {
  const { getCartTotalItems, showCart } = useContext(CartContext);

  return (
    <Button onClick={showCart} textOnly>
      Cart ({getCartTotalItems()})
    </Button>
  );
};

export default CartButton;