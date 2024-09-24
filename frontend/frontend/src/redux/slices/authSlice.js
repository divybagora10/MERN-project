import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
import { act } from "react";
import {jwtDecode} from "jwt-decode";

export const signup = createAsyncThunk(
    'auth/signup', // 'auth/signup/pending' || 'auth/signup/fulfilled' || 'auth/signup/rejected'
    async(data , {rejectWithValue}) => {
        try {
            const response = await axios.post("http://127.0.0.1:3000/auth/signup" , data);
            localStorage.setItem("user",JSON.stringify(response.data.data));
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
            // localStorage.setItem("user",JSON.stringify(response.data.data));
            localStorage.setItem("token",response.data.token);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }

)

export const getAllUsers= createAsyncThunk (
    'auth/users',
    async (_,{rejectWithValue}) => {
        console.log("api called")
        try {
            const response = await fetch("http://127.0.0.1:3000/auth/users");
            // console.log(response);
            const allData = await response.json();
            console.log(allData);
            console.log(typeof allData.data)
            return allData;
        }
        catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)


const getRole = () => {
    const token = localStorage.getItem("token");
    if (token){
       const decodedToken =  jwtDecode(token);
        return decodedToken.role;
    }
    return null;
}
const initialState = {
    isLoading : false,
    error : null,
    user : null,
    // isAuth : false,
    // isAuth : localStorage.getItem("user") ? true : false, // we can stay login by saving data in localStorage

    // role : JSON.parse(localStorage.getItem("user"))?.role || null,

    isAuth : localStorage.getItem("token") ? true : false ,
    role : getRole(),
    // role : null,
    isSign : false
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setLoading : (state)=>{
            state.isLoading = true;
        },
        // this methods of normal reducers will be used when API call is not from redux 
        setSuccess : (state,action)=>{
            state.isLoading = true,
            state.user = action.payload,
            state.error = null
        },
        setError : (state,action) => {
            state.isLoading  =false,
            state.error = action.payload
        },
        setSignin : (state)=>{
            state.isSign = false;
        },
        setLogout : (state)=>{
            state.isAuth = false,
            state.role = null,
            state.user= null
        }

    },

    // this is used to handle async operations
    extraReducers : (builder)=>{
        // builder catches the promise sended by signup thunk function
        builder
        .addCase(signup.pending , (state) =>{
            state.isSign = false
            state.isLoading = true;
        })
        .addCase(signup.fulfilled , (state,action) => {
            state.isLoading = false;
            // console.log(action.payload)
            state.isSign = true;
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
            // console.log(action.payload);
            state.user = action.payload.data.message
            state.role = action.payload.data.data.role;
            state.isAuth = true;
            state.error = null;
        })
        .addCase (login.rejected , (state,action)=>{
           console.log(action.payload)
            state.user = null;
            state.isLoading = false;
            state.error = action.payload.message;
        })
        .addCase(getAllUsers.pending, (state,action)=>{
            state.isLoading = true;  
        })
        .addCase(getAllUsers.fulfilled , (state,action)=>{
            state.isLoading = false;
            state.user = action.payload.data;
            console.log(state.user)
            // console.log(typeof state.user)
            // console.log("user" ,state.user)
            state.error = null;
        })
        .addCase (getAllUsers.rejected , (state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

// export const {setLoading , setSuccess , setError} = authSlice.actions;


// thunk function 
// this is custom thunk
// for any async task we use thunk function
export const signUpUser = (data) =>{
    return async(dispatch) => {
        dispatch(setLoading());
        try {
            const response = await axios.post("http://127.0.0.1:3000/auth/signup" , data);
            dispatch(setSuccess(response.data));

        } catch (error) {
           dispatch(setError (error));
        }
    }
}

export   const {setSignin , setLogout} = authSlice.actions;

export default authSlice.reducer;