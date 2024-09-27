// import { create } from "@mui/material/styles/createTransitions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (data , {rejectWithValue}) =>{
        console.log("API called")
        try {
            const response = await axios.post("http://localhost:3000/api/product",data);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getAllProduct = createAsyncThunk(
    'product/getProduct',
    async (_,{rejectWithValue}) =>{
        console.log("in get data")
        try {
            const response = await axios.get("http://localhost:3000/api/product");
            
            // console.log(response.data.data)
            const data = response.data.data
            const updatedProduct = data.map((item,i) =>{
                return {...item , id : i+1};
            })
            // console.log(updatedProduct)  
            return updatedProduct;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const initialState = {
    isLoading : false,
    error : null,
    products : [],
    isProductAdded : false,
}

const productSlice = createSlice({
    name : "productSlice",
    initialState ,
    reducers : {

    },
    extraReducers :(builder) => {
        builder
        .addCase(addProduct.pending ,(state)=>{
            state.isLoading = true
        })
        .addCase(addProduct.fulfilled , (state,action) =>{
            state.isLoading = false,
            state.isProductAdded = true,
            state.error = null
        })
        .addCase(addProduct.rejected , (state,action)=>{
            state.isLoading= false;
            state.error = action.payload?.response?.data;
        })
        .addCase(getAllProduct.pending , (state)=>{
            state.isLoading = true
        })
        .addCase(getAllProduct.fulfilled , (state,action)=>{
            state.isLoading = false,
            state.products = action.payload,
            state.error = null
        })
        .addCase(getAllProduct.rejected , (state , action)=>{
            state.isLoading = false,
            state.error = action.payload?.response?.data
        })
    }
})

export const {  } = productSlice.actions;
export default productSlice.reducer;