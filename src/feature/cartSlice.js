import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  // cartItems: localStorage.getItem("cartItems")
  //   ? JSON.parse(localStorage.getItem("cartItems"))
  //   : [],
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`Inceased ${state.cartItems[itemIndex].title} Quantity`, {
          position: "bottom-left",
        });
      } else {
        const tempCart = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.cartItems.push(tempCart);
        toast.success(`${action.payload.title} Added To Cart `, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    //------------------------------------------------------------------------------------
    removeFromCart: (state, action) => {
      const tempCart = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = tempCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.title} Remove From Cart `, {
        position: "bottom-left",
      });
    },
    //------------------------------------------------------------------------------------

    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${action.payload.title} Cart Quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItem = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItem;
        toast.error(`${action.payload.title} Remove From Cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    //------------------------------------------------------------------------------------
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity, discountPercentage } = cartItem;
          const discountedPrice = Math.floor(
            price - (price * discountPercentage) / 100
          );
          const itemTotal = discountedPrice * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    //------------------------------------------------------------------------------------

    clearCart: (state) => {
      state.cartItems = [];
      toast.error(`Cart Cleared`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.carts));
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;

export const getAllCarts = (state) => state.cart.cartItems;
export const getCartItemsTotalQuantities = (state) =>
  state.cart.cartTotalQuantity;
export const getCartItemsTotal = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;
