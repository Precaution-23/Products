import * as actions from "./actions"
import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios"

// ENDOINT FOR FETCHING OF INITIAL PRODUCT LIST
export const getInitialProductList = createAsyncThunk(actions.GET_PRODUCTS, async() => {
    return axios.get('http://www.mocky.io/v2/5c3e15e63500006e003e9795')
} )