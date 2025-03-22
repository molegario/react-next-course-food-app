import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import Button from "./UI/Button";

const AddButton = ({id}) => {
  const { addToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addToCart(id);
  };

  return (
    <Button onClick={addToCartHandler}>
      Add to Cart
    </Button>
  );
};

export default AddButton;