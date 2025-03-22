import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import VerifyCartPanel from "./VerifyCartPanel";
import { useActionState } from "react";
import CheckoutPanel from "./CheckoutPanel";
import validator from "validator";
import SuccessPanel from "./SuccessPanel";
import { postOrder } from "../http";

const Cart = () => {
  const {
    cart,
    stage,
    setStageToVerified,
    setStageToSucceeded,
    clearCart,
  } = useContext(CartContext);

  const ConfirmOrderAction = () => {
    setStageToVerified();
  };

  const PostOrderAction = async (prevFormState, formData) => {
    const enteredValues = {
      name: formData.get("name"),
      email: formData.get("email"),
      street: formData.get("street"),
      "postal-code": formData.get("postal-code"),
      city: formData.get("city"),
    };

    const errors = Object.entries(enteredValues).map(
      ([key, value]) => {
        if (key === "name" && !validator.isLength(value, { min: 3 })) {
          return "Name must be 3 characters or longer.";
        }
        if (key === "email" && !validator.isEmail(value)) {
          return "Email is not valid.";
        }
        if (key === "street" && !validator.isLength(value, { min: 5 })) {
          return "Street must be 5 characters or longer.";
        }
        if (key === "postal-code" && !validator.isPostalCode(value, 'CA')) {
          return "Postal code is not a valid Canadian postal code.";
        }
        if (key === "city" && !validator.isIn(value, ['Montreal', 'Laval'])) {
          return "City must be either Montreal or Laval.";
        }
      }
    ).filter(Boolean);

    if (errors.length === 0) {
      const  order = {
        customer: enteredValues,
        items: cart,
      };

      try {
        const confirmed = await postOrder(order);
        console.log(confirmed);

        if (confirmed === "Order created!") {
          clearCart();
          setStageToSucceeded();
        } else {
          return {
            errors: ["Failed to confirm order. Please try again."],
            enteredValues,
          };
        }
      } catch (error) {
        console.error(error);
        return {
          errors: ["Failed to submit order. Please try again."],
          enteredValues,
        };
      }
    }

    return {
      errors: errors.length > 0 ? errors : null,
      enteredValues,
    };
  };

  const [confirmState, confirmAction] = useActionState(ConfirmOrderAction, {});
  const [checkoutState, checkoutAction, checkoutPending] = useActionState(PostOrderAction, {errors: null});

  return (
    <div className="cart">
      {stage === "" && <VerifyCartPanel />}
      <form method="dialog" noValidate>
        {stage === "VERIFIED" && (
          <CheckoutPanel checkoutState={checkoutState} />
        )}
        {
          stage === "SUCCEEDED" && (
            <SuccessPanel />
          )
        }
        <div className="modal-actions">
          <button className={stage === "SUCCEEDED" ? "button" : "text-button"}>
            Close
          </button>
          {stage !== "SUCCEEDED" && (
            <button
              className="button"
              formAction={stage !== "VERIFIED" ? confirmAction : checkoutAction}
              disabled={checkoutPending || cart.length === 0}
            >
              {stage !== "VERIFIED" ? "Order" : "Submit Order"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Cart;
