import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const updateInfo = createAsyncThunk(
    'auth/update',
    async (data , {rejectWithValue}) => {
        try {
            console.log("in update thunk")
            const response = await axios.put("http://localhost:3000/auth/update",data);
            return response;
            
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    isUpdate : false,
    error : null
}

const updateDetails = createSlice({
    name : 'update',
    initialState,

    reducers :{ 
        toggleIsUpdate : (state,action)=>{
            state.isUpdate = false
        }
    },

    extraReducers  : (builder)=>{
        builder
        .addCase(updateInfo.pending , (state)=>{
            state.isUpdate = false
        })
        .addCase (updateInfo.fulfilled , (state)=>{
            state.isUpdate = true
        })
        .addCase(updateInfo.rejected , (state,action)=>{
            state.isUpdate = false,
            state.error = action.payload
        })
    }

})

export const {toggleIsUpdate} = updateDetails.actions;

export default updateDetails.reducer;