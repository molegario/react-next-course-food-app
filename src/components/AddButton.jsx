import { useContext } from "react";
import { CartContext } from "../store/cart-context";

const AddButton = ({id}) => {
  const { addToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    addToCart(id);
  };

  return (
    <button className="button" onClick={addToCartHandler}>
      Add to Cart
    </button>
  );
};

export default AddButton;