import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import Button from "./UI/Button";

const CartButton = () => {
  const { cart, showCart } = useContext(CartContext);

  return (
    <Button onClick={showCart} textOnly>
      Cart ({cart?.length ?? 0})
    </Button>
  );
};

export default CartButton;