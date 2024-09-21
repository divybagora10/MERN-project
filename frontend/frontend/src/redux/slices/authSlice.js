import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";

export const signup = createAsyncThunk(
    'auth/signup',
    async(data , {rejectWithValue}) => {
        try {
            const response = await axios.post("http://127.0.0.1:3000/auth/signup" , data);
            return response;
        } catch (error) {   
            return rejectWithValue(error.response.data);
        }
       
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data, {rejectWithValue}) => {
        console.log(data)
        try {
            const response = await axios.post("http://localhost:3000/auth/login",data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }

)

const initialState = {
    isLoading : false,
    error : null,
    user : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setLoading : (state)=>{
            state.isLoading = true;
        },

        setSuccess : (state,action)=>{
            state.isLoading = true,
            state.user = action.payload,
            state.error = null
        },
        setError : (state,action) => {
            state.isLoading  =false,
            state.error = action.payload
        }

    },

    // this is used to handle async operations
    extraReducers : (builder)=>{
        // builder catches the promise sended by signup thunk function
        builder
        .addCase(signup.pending , (state) =>{
            state.isLoading = true;
        })
        .addCase(signup.fulfilled , (state,action) => {
            state.isLoading = false;
            console.log(action.payload)
            state.user = action.payload?.data.message;
            state.error = null;
        })
        .addCase (signup.rejected, (state,action)=>{
            state.isLoading  = false;
            state.error = action.payload;
        })
        .addCase(login.pending , (state)=>{
            state.isLoading = true;
        })
        .addCase(login.fulfilled , (state,action)=>{
            state.isLoading = false;
            console.log(action.payload);
            state.user = action.payload.data.message;
            state.error = null;
        })
        .addCase (login.rejected , (state,error)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

// export const {setLoading , setSuccess , setError} = authSlice.actions;


// thunk function 
// this is custom thunk
// for any async task we use thunk function
// export const signUpUser = (data) =>{
//     return async(dispatch) => {
//         dispatch(setLoading());
//         try {
//             const response = await axios.post("http://127.0.0.1:3000/auth/signup" , data);
//             dispatch(setSuccess(response.data));

//         } catch (error) {
//            dispatch(setError (error));
//         }
//     }
// }



export default authSlice.reducer;