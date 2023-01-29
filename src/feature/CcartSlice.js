import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  carts: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  totalQuantity: 0,
  totaAmount: 0,
};

const CCartSlice = createSlice({
  name: "ccart",
  initialState,
  reducers: {
    addToCcart: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.carts[itemIndex].cartQuantity += 1;
        toast.info(`Inceased ${state.carts[itemIndex].title} Quantity`, {
          position: "bottom-left",
        });
      } else {
        const tempCart = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.carts.push(tempCart);
        toast.success(`${action.payload.title} Added To Cart `, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.carts));
    },
  },
});
export const { addToCcart } = CCartSlice.actions;
export const getCcart = (state) => state.ccart.carts;
export default CCartSlice.reducer;
