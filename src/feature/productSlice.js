import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://dummyjson.com";
const initialState = {
  products: [],
  status: "idel",
  error: null,
  productSingle: [],
  productSingleStatus: "idel",
};
export const fetchProduct = createAsyncThunk(
  "products/fetchProducts",
  async (_, asyncThunk) => {
    const { rejectWithValue } = asyncThunk;
    try {
      const res = await axios.get(`${BASE_URL}/products/?limit=10`);
      return res?.data;
    } catch (err) {
      return rejectWithValue("an error occured");
    }
  }
);

export const fetchProductSingle = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/products/${id}`);
      return res.data;
    } catch (err) {
      return err.message;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchProductSingle.pending, (state) => {
        state.productSingleStatus = "loading";
      })
      .addCase(fetchProductSingle.fulfilled, (state, action) => {
        state.productSingleStatus = "success";
        state.productSingle = action.payload;
      });
  },
});
export const getAllProducts = (state) => state.products.products;
export const productStatus = (state) => state.products.status;
export const productError = (state) => state.products.error;

export const getProductSingle = (state) => state.products.productSingle;
export const getProductSingleStatus = (state) =>
  state.products.productSingleStatus;

export default productSlice.reducer;
