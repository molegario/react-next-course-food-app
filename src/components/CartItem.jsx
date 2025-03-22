import { memo, useContext, useActionState } from "react";
import { CartContext } from "../store/cart-context";
import { priceFormatter } from "../utils/formatter";

const CartItem = memo(({item}) => {
  const { addItemToCart, removeFromCart } = useContext(CartContext);

  const increaseAmountAction = () => {
    addItemToCart(item);
  };

  const decreaseAmountAction = () => {
    removeFromCart(item.id);
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
          <span>{item.name}</span>
          <span>
            {item.amount} x {priceFormatter(item.price)}
          </span>
        </p>
      </div>
      <form className="cart-item-actions">
        <button formAction={decrAmountAction}>-</button>
        <span>{item.amount}</span>
        <button formAction={incrAmountAction}>+</button>
      </form>
    </li>
  );
});

export default CartItem;