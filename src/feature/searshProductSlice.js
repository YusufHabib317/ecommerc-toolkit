// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "https://dummyjson.com";

// const initialState = {
//   searchProduct: [],
//   searchProductStatus: "idel",
// };

// export const fetchSearch = createAsyncThunk(
//   "search/fetch",
//   async (searchTerm) => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/products/search?q=${searchTerm}`
//       );
//       return res.data;
//     } catch (err) {
//       return err.message;
//     }
//   }
// );

// const searchProductSlice = createSlice({
//   name: "search",
//   initialState,
//   reducers: {
//     clearSearch: (state) => {
//       state.searchProduct = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSearch.pending, (state) => {
//         state.searchProductStatus = "loading";
//       })
//       .addCase(fetchSearch.fulfilled, (state, action) => {
//         state.searchProductStatus = "success";
//         state.searchProduct = action.payload;
//       })
//       .addCase(fetchSearch.rejected, (state) => {
//         state.searchProductStatus = "failed";
//       });
//   },
// });
// // export const searchProducts = (state) => state.search.searchProduct;
// export const getSearchProducts = (state) => state.search.searchProduct;
// export const searchProductStatus = (state) => state.search.searchProductStatus;
// export const { clearSearch } = searchProductSlice.actions;
// export default searchProductSlice.reducer;

const initialState = {
  searchProducts: [],
  searchProductsStatus: "idel",
};
export const fetchSearch = createAsyncThunk(
  "product-search/fetch",
  async (searchTerm) => {
    const response = await fetch(`${BASE_URL}/products/search?q=${searchTerm}`);
    const data = await response.json();
    return data.products;
  }
);
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state, action) => {
        state.searchProductsStatus = "loading";
      })

      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.searchProducts = action.payload;
        state.searchProductsStatus = "success";
      })

      .addCase(fetchSearch.rejected, (state, action) => {
        state.searchProductsStatus = "failed";
      });
  },
});

export const { setSearchTerm, clearSearch } = searchSlice.actions;
export const getSearchProducts = (state) => state.search.searchProducts;
export const getSearchProductsStatus = (state) =>
  state.search.searchProductsStatus;
export default searchSlice.reducer;
