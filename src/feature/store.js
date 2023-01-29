import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import categoriesReducer from "./categorySlice";
import cartReducer from "./cartSlice";
import searchReducer from "./searshProductSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    search: searchReducer,
  },
});
