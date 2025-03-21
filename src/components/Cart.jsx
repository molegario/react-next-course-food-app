import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import VerifyCartPanel from "./VerifyCartPanel";

const Cart = () => {
  const {
    postOrder,
  } = useContext(CartContext);

  const postOrderHandler = () => {
    postOrder();
  };

  return (
    <div className="cart">
      <VerifyCartPanel />
      <form className="modal-actions" method="dialog">
        <button className="text-button">Close</button>
        <button className="button" type="button" onClick={postOrderHandler}>
          Order
        </button>
      </form>
    </div>
  );
};

export default Cart;
