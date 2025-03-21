import { createContext, useCallback, useReducer, useRef } from "react";
import Modal from "../components/Modal";
import Cart from "../components/Cart";

export const CartContext = createContext({
  cart: [],
  menu: [],
  showCartModal: false,
  addToCart: (id) => {},
  removeFromCart: (id) => {},
  clearCart: () => {},
  showCart: () => {},
  hideCart: () => {},
  postOrder: () => {},
  setMenuPrices: (menu) => {},
  getMenuItemById: (id) => {},
  getTotalCartPrice: () => {},
});

const cartReducer = (state, action) => {

  if(action?.type==="OPEN_CART_MODAL") {
    return {
      ...state,
      showCart: true,
    };
  }

  if (action?.type === "CLOSE_CART_MODAL") {
    return {
      ...state,
      showCart: false,
    };
  }

  if (action?.type === "ADD_ITEM_BY_ID") {
    const existingItemIndex = state.cart?.findIndex(
      (item) => item.id === action.payload.id
    );
    if(existingItemIndex !== -1) {
      const updatedCart = [...state.cart].map((item, index) => {
        if(index === existingItemIndex) {
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
        cart: [...state.cart, { id: action.payload.id, amount: 1 }],
      };
    }
  }

  if (action?.type === "REMOVE_ITEM_BY_ID") {
    const existingItemIndex = state.cart?.findIndex(
      (item) => item.id === action.payload.id
    );
    if (existingItemIndex !== -1) {
      if (state.cart[existingItemIndex].amount === 1) {
        const updatedCart = [...state.cart].filter((item, index) => index !== existingItemIndex);
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        const updatedCart = [...state.cart].map((item, index) => {
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

  if (action?.type === "SET_MENU_PRICES") {
    return {
      ...state,
      menuPrices: action.payload.menu,
    };
  }

  return {
    ...state,
  };
};

const CartProvider = ({
  children
}) => {

  const cartModalRef = useRef();

  const [cartState, cartDispatch] = useReducer(cartReducer, {
    menuPrices: [],
    cart: [],
    showCart: false,
  });

  const cartClickHandler = () => {
    cartModalRef.current.open();
    cartDispatch({ type: "OPEN_CART_MODAL" });
  };

  const closeCartHandler = () => {
    if(cartState.showCart) {
      cartModalRef.current.close();
      cartDispatch({ type: "CLOSE_CART_MODAL" });
    }
  };

  const addToCartHandler = (id) => {
    cartDispatch({ type: "ADD_ITEM_BY_ID", payload: { id } });
  };

  const removeFromCartHandler = (id) => {
    cartDispatch({ type: "REMOVE_ITEM_BY_ID", payload: { id } });
  };

  const postOrderHandler = () => {
    console.log("Order posted");
    closeCartHandler();
  };

  const setMenuPricesHandler = (menu) => {
    cartDispatch({ type: "SET_MENU_PRICES", payload: { menu } });
  };

  const getMenuItemById = (id) => {
    return cartState.menuPrices.find((item) => item.id === id);
  };

  const getTotalCartPrice = () => {
      return cartState.cart.reduce(
        (acc, item) => {
          const menuItem = getMenuItemById(item.id);
          if (menuItem) {
            return acc + parseFloat(menuItem.price) * item.amount;
          } else {
            return acc;
          }
        },
        0
      )
    };

  const cartCtx = {
    cart: cartState.cart,
    menu: cartState.menuPrices,
    showCartModal: cartState.showCart,
    showCart: cartClickHandler,
    hideCart: closeCartHandler,
    postOrder: postOrderHandler,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    setMenuPrices: setMenuPricesHandler,
    getMenuItemById,
    getTotalCartPrice,
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