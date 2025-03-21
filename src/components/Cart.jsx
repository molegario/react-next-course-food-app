const Cart = ({
  onPostOrder
}) => {

  const postOrderHandler = () => {
    console.log("Order posted");
    onPostOrder();
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        <li className="cart-item">
          <div>
            <p>
              <span>Curry Rice</span>
              <span>1 x $12.99</span>
            </p>
          </div>
          <div className="cart-item-actions">
            <button>-</button>
            <span>3</span>
            <button>+</button>
          </div>
        </li>
        <li className="cart-item">
          <div>
            <p>
              <span>Curry Rice</span>
              <span>1 x $12.99</span>
            </p>
          </div>
          <div className="cart-item-actions">
            <button>-</button>
            <span>3</span>
            <button>+</button>
          </div>
        </li>
        <li className="cart-item">
          <div>
            <p>
              <span>Curry Rice</span>
              <span>1 x $12.99</span>
            </p>
          </div>
          <div className="cart-item-actions">
            <button>-</button>
            <span>3</span>
            <button>+</button>
          </div>
        </li>
        <li className="cart-item">
          <div>
            <p>
              <span>Curry Rice</span>
              <span>1 x $12.99</span>
            </p>
          </div>
          <div className="cart-item-actions">
            <button>-</button>
            <span>3</span>
            <button>+</button>
          </div>
        </li>
      </ul>
      <div className="cart-total">
        <span>$35.97</span>
      </div>
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