import * as actions from "./actions"
import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios"

// ENDPOINT FOR FETCHING OF INITIAL PRODUCT LIST
export const getInitialProductList = createAsyncThunk(actions.GET_PRODUCTS, async() => {
    return axios.get('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
})


// FUNCTION TO ADD PRODUCTS TO THE DATABASE(LOCAL STORAGE)
export const addProduct = createAsyncThunk(actions.ADD_PRODUCT, (data) => {
    return localStorage.setItem('productList', JSON.stringify(data))
})


// FUNCTION TO GET PRODUCTS TO THE DATABASE(LOCAL STORAGE)
export const getProducts = createAsyncThunk(actions.GET_PRODUCTS, () => {
    return JSON.parse(localStorage.getItem("productList"))
})

// FUNCTION TO GET PRODUCTS TO THE DATABASE(LOCAL STORAGE)
export const getDeletedProducts = createAsyncThunk(actions.GET_DELETED_PRODUCT, () => {
    return JSON.parse(localStorage.getItem("deletedProducts"))
})
