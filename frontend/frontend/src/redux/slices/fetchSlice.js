import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { all } from "axios";
import { jwtDecode } from "jwt-decode";

export const getAllUsers = createAsyncThunk(
    'auth/users',
   async (_ ,{rejectWithValue})=> {
            try {   
                const response = await axios.get("http://127.0.0.1:3000/auth/users");
                // console.log(response);
                // const allData = await response.json();
                const data = response.data.data
                // console.log(allData);
                // console.log(allData);
                // console.log(typeof allData.data)
                const updatedData = data.map((item,i)=>{
                    return {...item , id : i+1 , status : (item.status).toString()};
                })
                return updatedData;
                // return allData;
            } catch (error) {
                return rejectWithValue(error.response.data); 
            }
   }
   
)  

const getRole = ()=>{
    const token = localStorage.getItem("token");
    if (token){
        const decodedToken = jwtDecode(token);
        return decodedToken.role; 
    }
    return null;
}

const initialState = {
    isLoading : false,
    error : null,
    user :[],
    isAuth : localStorage.getItem("token") ? true : false ,
    role : getRole(),
    isSign : false

}

const fetchSlice = createSlice({
   name : "fetchData",
    initialState,

    reducers : {

    },

    extraReducers : (builder)=>{
        builder
        .addCase(getAllUsers.pending, (state,action)=>{
            state.isLoading = true;  
        })
        .addCase(getAllUsers.fulfilled , (state,action)=>{
            state.isLoading = false;
            state.user = action.payload;
            // console.log(state.user)
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


export default fetchSlice.reducer;