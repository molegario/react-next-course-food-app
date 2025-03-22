import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import Button from "./UI/Button";

const AddButton = ({item}) => {
  const { addItemToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addItemToCart(item);
  };

  return (
    <Button onClick={addToCartHandler}>
      Add to Cart
    </Button>
  );
};

export default AddButton;