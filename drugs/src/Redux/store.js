import { configureStore } from "@reduxjs/toolkit";
import productFilters from "./ProductFilters/productfilter";

const store = configureStore({
    reducer: {
        productFilters,
    },
})

export default store;