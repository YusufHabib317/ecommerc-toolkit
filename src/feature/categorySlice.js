import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL_CATEGORY = "https://dummyjson.com/products/categories";
const BASE_URL_OneCATEGORY = "https://dummyjson.com/";

export const fetchCategory = createAsyncThunk("category/fetch", async () => {
  try {
    const res = await axios.get(BASE_URL_CATEGORY);
    return res.data;
  } catch (err) {
    return err.message;
  }
});

export const fetchProductsOfCategory = createAsyncThunk(
  "categories/fetchSingleCategoty",
  async (category) => {
    try {
      const res = await axios.get(
        `${BASE_URL_OneCATEGORY}products/category/${category}`
      );
      return res.data;
    } catch (err) {
      return err.message;
    }
  }
);

const initialState = {
  categories: [],
  categoryProducts: [],
  status: "idel",
  categoryProductsStatus: "idel",
  error: null,
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categories = action.payload;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProductsOfCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsOfCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.categoryProducts = action.payload;
      })
      .addCase(fetchProductsOfCategory.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export const getAllCategories = (state) => state.categories.categories;
export const getStatus = (state) => state.categories.status;
export const getError = (state) => state.categories.error;

export const getAllProductsByCategory = (state) =>
  state.categories.categoryProducts;
export default categorySlice.reducer;
