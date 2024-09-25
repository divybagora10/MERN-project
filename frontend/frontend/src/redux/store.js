import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import fetchSlice from "./slices/fetchSlice";

const store = configureStore({
    reducer : {
        auth : authSlice,
        fetch : fetchSlice,
    }
});

export default store;