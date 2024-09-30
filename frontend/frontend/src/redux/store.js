import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import fetchSlice from "./slices/fetchSlice";
import productSlice from "./slices/productSlice";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
    reducer : {
        auth : authSlice,
        fetch : fetchSlice,
        product : productSlice,
        cart : cartSlice
    }
});

export default store;