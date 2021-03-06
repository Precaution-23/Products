import { createSlice } from "@reduxjs/toolkit";

import * as product from "./index";

const productFilters = createSlice({
  name: "ProductFilterSlice",
  initialState: {
    data: [],
    loaded: false,
    status: null,
    message: null,
    error: null,
    request: {
      status: null,
    },
  },
  reducers: {},

  extraReducers: {
    // TOOLKIT FOR FETCHING INITIAL PRODUCTS
    [product.getInitialProductList.pending]: (state) => {
      state.loaded = false;
      state.status = "Loading";
    },
    [product.getInitialProductList.fulfilled]: (state, action) => {
      state.data = action.payload.data;
      state.loaded = true;
      state.status = "Loaded successfully";
    },
    [product.getInitialProductList.rejected]: (state, action) => {
      state.data = [];
      state.loaded = false;
      state.status = "Failed";
      state.error = action;
    },

    // TOOLKIT TO GET PRODUCTS AFTER MORE PRODUCTS HAS BEEN ADDED
    [product.getProducts.pending]: (state) => {
      state.loaded = false;
      state.status = "Loading";
    },
    [product.getProducts.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loaded = true;
      state.status = "Loaded successfully";
    },
    [product.getProducts.rejected]: (state, action) => {
      state.data = [];
      state.loaded = false;
      state.status = "Failed";
      state.error = action;
    },

    // TOOLKIT TO GET PRODUCTS AFTER MORE PRODUCTS HAS BEEN ADDED
    [product.getDeletedProducts.pending]: (state) => {
      state.loaded = false;
      state.status = "Loading";
    },
    [product.getDeletedProducts.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loaded = true;
      state.status = "Loaded successfully";
    },
    [product.getDeletedProducts.rejected]: (state, action) => {
      state.data = [];
      state.loaded = false;
      state.status = "Failed";
      state.error = action;
    },
  },
});

export const productFiltersRuducer = ({ productFilters }) => productFilters;
export default productFilters.reducer;
