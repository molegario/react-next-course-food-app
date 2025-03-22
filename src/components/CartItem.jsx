import { memo, useContext } from "react";
import { CartContext } from "../store/cart-context";
import { useActionState } from "react";
import { priceFormatter } from "../utils/formatter";

const CartItem = memo(({ id, name, price, amount }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  const increaseAmountAction = () => {
    addToCart(id);
  };

  const decreaseAmountAction = () => {
    removeFromCart(id);
  };

  const [incrAmountState, incrAmountAction] = useActionState(
    increaseAmountAction,
    {}
  );
  const [decrAmountState, decrAmountAction] = useActionState(
    decreaseAmountAction,
    {}
  );

  return (
    <li className="cart-item">
      <div>
        <p>
          <span>{name}</span>
          <span>
            {amount} x {priceFormatter(price)}
          </span>
        </p>
      </div>
      <form className="cart-item-actions">
        <button formAction={decrAmountAction}>-</button>
        <span>{amount}</span>
        <button formAction={incrAmountAction}>+</button>
      </form>
    </li>
  );
});

export default CartItem;