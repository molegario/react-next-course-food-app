import { useRef, useState } from "react";
import AppLogo from "../assets/logo.jpg";
import Modal from "./Modal";
import Cart from "./Cart";

const Header = () => {
  const [showCart, setShowCart] = useState(false);
  const cartModalRef = useRef();

  const cartClickHandler = () => {
    console.log("Cart clicked");
    cartModalRef.current.open();
    setShowCart(true);
  }

  const closeCartHandler = () => {
    console.log("Close cart");
    cartModalRef.current.close();
    setShowCart(false);
  }

  const postOrderHandler = () => {
    console.log("Order posted");
    closeCartHandler();
  }

  return (
    <>
      <Modal onClose={closeCartHandler} ref={cartModalRef}>
        {
          showCart && (
            <Cart onPostOrder={postOrderHandler} />
          )
        }
      </Modal>
      <div id="main-header">
        <div id="title">
          <img src={AppLogo} alt="App Logo" />
          <h1>reactphood</h1>
        </div>
        <button className="text-button" onClick={cartClickHandler}>Cart (3)</button>
      </div>
    </>
  );
};

export default Header;
