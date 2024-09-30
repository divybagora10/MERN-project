// import { create } from "@mui/material/styles/createTransitions";
import {  createSlice } from "@reduxjs/toolkit";



const initialState = {
    isLoading : false,
    error : null,
    cartItem :JSON.parse(localStorage.getItem("cart"))|| [],
}

const cartSlice = createSlice({
    name : "productSlice",
    initialState ,
    reducers : {
        addToCart : (state , action) =>{
            state.cartItem.push(action.payload);
            localStorage.setItem("cart" , JSON.stringify(state.cartItem))
        }
    },
    
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;