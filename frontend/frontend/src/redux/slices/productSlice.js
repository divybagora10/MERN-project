// import { create } from "@mui/material/styles/createTransitions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (data , {rejectWithValue}) =>{
        console.log("API called")
        console.log(data);
        try {
            const response = await axios.post("http://localhost:3000/api/product",data);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async(data,{rejectWithValue})=>{
        console.log("api called of update")
        // console.log(data._id);
        
        const id = data.get("_id");
        console.log(id);
        try {
            const response = await axios.put(`http://localhost:3000/api/product/${id}` , data)
            // console.log(response);
        //    console.log(data); 
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const updateProductWithImage = createAsyncThunk(
    'product/updatedProductWithImage',
    async(data,{rejectWithValue})=>{
        const id = data.get("_id");
        try {
            const response = await axios.put(`http://localhost:3000/api/productWithImage/${id}` , data)
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async(data,{rejectWithValue}) => {
        try {
            console.log("In delete API")
            const response = await axios.delete(`http://localhost:3000/api/productdelete/${data._id}`);

            return response.data.message;
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
        setIsProductAdded : (state)=>{
            state.isProductAdded=false;
        }
    },
    extraReducers :(builder) => {
        builder
        .addCase(addProduct.pending ,(state)=>{
            state.isLoading = true;
            state.isProductAdded = false
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
        .addCase(updateProduct.pending , (state,action)=>{
            state.isLoading = true,
            state.isProductAdded = false
        })
        .addCase(updateProduct.fulfilled , (state,action)=>{
            state.isProductAdded = true,
            state.isLoading = false,
            state.error= null
        })
        .addCase(updateProduct.rejected , (state,action)=>{
            state.isLoading = false,
            state.error = action.payload?.response?.data
        })
        .addCase(updateProductWithImage.pending , (state,action)=>{
            state.isLoading = true,
            state.isProductAdded = false
        })
        .addCase(updateProductWithImage.fulfilled , (state,action)=>{
            state.isProductAdded = true,
            state.isLoading = false,
            state.error= null
        })
        .addCase(updateProductWithImage.rejected , (state,action)=>{
            state.isLoading = false,
            state.error = action.payload?.response?.data
        })
        .addCase(deleteProduct.pending , (state) =>{
            state.isLoading = true
        })
        .addCase(deleteProduct.fulfilled , (state,action) =>{
            state.isLoading = false,
            state.error =null
        })
        .addCase(deleteProduct.rejected , (state,action) =>{
            state.isLoading = false,
            state.error = action.payload?.response?.data
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

export const { setIsProductAdded } = productSlice.actions;
export default productSlice.reducer;