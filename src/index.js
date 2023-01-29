import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/root/Root";
import Index from "./pages/root/Index";
import ProductSingleElement from "./components/productSingleElement/ProductSingleElement";

import { store } from "./feature/store";
import { Provider } from "react-redux";
import { fetchProduct, fetchProductSingle } from "./feature/productSlice";
import {
  fetchCategory,
  fetchProductsOfCategory,
} from "./feature/categorySlice";
import CartPage from "./pages/cartPage/CartPage";
import ProductOfCategory from "./pages/productOfCategoru/ProductOfCategory";
import SearchProduct from "./pages/searchProduct/SearchProduct";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTotals } from "./feature/cartSlice";

store.dispatch(fetchProduct());
store.dispatch(fetchCategory());
store.dispatch(getTotals());

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Index /> },
      { path: "/products/:id", element: <ProductSingleElement /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/products/category/:category", element: <ProductOfCategory /> },
      { path: "/search/:searchTerm", element: <SearchProduct /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>
);
