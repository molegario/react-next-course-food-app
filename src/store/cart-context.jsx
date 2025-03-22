import { createContext, useReducer, useRef } from "react";
import Modal from "../components/UI/Modal";
import Cart from "../components/Cart";

export const CartContext = createContext({
  cart: [],
  stage: "",
  showCartModal: false,
  addItemToCart: (item) => {},
  removeFromCart: (id) => {},
  clearCart: () => {},
  showCart: () => {},
  hideCart: () => {},
  getTotalCartPrice: () => {},
  setStageToVerified: () => {},
  setStageToSucceeded: () => {},
  getCartTotalItems: () => {},
});

const cartReducer = (state, action) => {
  if (action?.type === "OPEN_CART_MODAL") {
    return {
      ...state,
      showCart: true,
    };
  }

  if (action?.type === "CLOSE_CART_MODAL") {
    return {
      ...state,
      showCart: false,
      stage: "",
    };
  }

  if (action?.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action?.type === "ADD_ITEM_TO_CART") {
    const existingItemIndex = state.cart?.findIndex(
      (item) => item.id === action.payload.item.id
    );
    if (existingItemIndex !== -1) {
      const updatedCart = state.cart.map((item, index) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            amount: item.amount + 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cart: updatedCart,
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, { ...action.payload.item, amount: 1 }],
      };
    }
  }

  if (action?.type === "REMOVE_ITEM_BY_ID") {
    const existingItemIndex = state.cart?.findIndex(
      (item) => item.id === action.payload.id
    );
    if (existingItemIndex !== -1) {
      if (state.cart[existingItemIndex].amount === 1) {
        const updatedCart = state.cart.toSpliced(existingItemIndex, 1);
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        const updatedCart = state.cart.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              amount: item.amount - 1,
            };
          }
          return item;
        });
        return {
          ...state,
          cart: updatedCart,
        };
      }
    }
  }

  if (action?.type === "SET_STAGE_TO_VERIFIED") {
    return {
      ...state,
      stage: "VERIFIED",
    };
  }

  if (action?.type === "SET_STAGE_TO_SUCCEEDED") {
    return {
      ...state,
      stage: "SUCCEEDED",
    };
  }

  return {
    ...state,
  };
};

const CartProvider = ({ children }) => {
  const cartModalRef = useRef();

  const [cartState, cartDispatch] = useReducer(cartReducer, {
    cart: [],
    stage: "",
    showCart: false,
  });

  const cartClickHandler = () => {
    cartModalRef.current.open();
    cartDispatch({ type: "OPEN_CART_MODAL" });
  };

  const closeCartHandler = () => {
    if (cartState.showCart) {
      cartModalRef.current.close();
      cartDispatch({ type: "CLOSE_CART_MODAL" });
    }
  };

  const addItemToCart = (item) => {
    cartDispatch({ type: "ADD_ITEM_TO_CART", payload: { item } });
  };

  const removeFromCartHandler = (id) => {
    cartDispatch({ type: "REMOVE_ITEM_BY_ID", payload: { id } });
  };

  const getTotalCartPrice = () => {
    return cartState.cart.reduce((acc, item) => {
      if (item) {
        return acc + parseFloat(item.price) * item.amount;
      } else {
        return acc;
      }
    }, 0);
  };

  const setStageToVerified = () => {
    cartDispatch({ type: "SET_STAGE_TO_VERIFIED" });
  };

  const setStageToSucceeded = () => {
    cartDispatch({ type: "SET_STAGE_TO_SUCCEEDED" });
  };

  const clearCartHandler = () => {
    cartDispatch({ type: "CLEAR_CART" });
  };

  const getCartTotalItems = () => {
    return cartState.cart.reduce((acc, item) => {
      if (item) {
        return acc + item.amount;
      } else {
        return acc;
      }
    }, 0);
  };

  const cartCtx = {
    cart: cartState.cart,
    stage: cartState.stage,
    showCartModal: cartState.showCart,
    showCart: cartClickHandler,
    hideCart: closeCartHandler,
    addItemToCart,
    removeFromCart: removeFromCartHandler,
    getTotalCartPrice,
    setStageToVerified,
    setStageToSucceeded,
    clearCart: clearCartHandler,
    getCartTotalItems,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      <Modal onClose={closeCartHandler} ref={cartModalRef}>
        {cartState.showCart && <Cart />}
      </Modal>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
