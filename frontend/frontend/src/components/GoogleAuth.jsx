import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../redux/slices/authSlice';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token){
            localStorage.setItem("token",token);

            const decodedToken = jwtDecode(token);

            const user = {
                token ,
                user : decodedToken,
                role : decodedToken.role
            }
            dispatch(loginWithGoogle(user))
            
            navigate("/")
        }
    },[]);

    // useEffect(()=>{
       
    // },[]);
  return (
    <div>GoogleAuth</div>
  )
}

export default GoogleAuth