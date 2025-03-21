import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import VerifyCartPanel from "./VerifyCartPanel";
import { useActionState } from "react";
import CheckoutPanel from "./CheckoutPanel";

const Cart = () => {
  const {
    stage,
    hideCart,
    setStageToVerified,
  } = useContext(CartContext);

  const ConfirmOrderAction = () => {
    console.log("ORDER CONFIRMED!!");
    setStageToVerified();
  };

  const PostOrderAction = (prevFormState, formData) => {
    console.log("POSTING ORDER!!");
    const enteredValues = {
      name: formData.get("fullname"),
      email: formData.get("email"),
      address: formData.get("address"),
      phone: formData.get("postalcode"),
      city: formData.get("city"),
    };

    const errors = Object.entries(enteredValues).map(
      ([key, value]) => {
        if (key === "fullname" && value.length !== 5) {
          return "Fullname must be 5 characters or longer.";
        }
      }
    ).filter(Boolean);


    hideCart();
  };

  const [confirmState, confirmAction] = useActionState(ConfirmOrderAction, {});
  const [checkoutState, checkoutAction] = useActionState(PostOrderAction, {errors: null});

  return (
    <div className="cart">
      {stage !== "VERIFIED" && <VerifyCartPanel />}
      <form method="dialog" noValidate>
        {stage === "VERIFIED" && <CheckoutPanel checkoutState={checkoutState} />}
        <div className="modal-actions">
          <button className="text-button">Close</button>
          <button
            className="button"
            formAction={stage !== "VERIFIED" ? confirmAction : checkoutAction}
          >
            {stage !== "VERIFIED" ? "Order" : "Submit Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Cart;
