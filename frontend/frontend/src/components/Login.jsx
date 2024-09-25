import React, { useRef , useEffect, useState} from 'react'
import myImage from "../assets/295128.png"
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from "zod"
import { useForm } from 'react-hook-form';
import { login } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

// import CircularProgress from '@mui/material/Progress';
const Login = () => {

  const validationSchema = z.object({
    email : z.string().email("invalid email"),
    password : z.string().min(8,"Minimum 8 letter password is required")
    .regex(/[A-Z]/ , "password must contain 1 capital letter")
    .regex(/[a-z]/ , "password must contain 1lower case letter")
    .regex(/[0-9]/ , "password must contain one  numeric value")
    .regex(/[\w]/ , "password must contain atleast 1 special charater"),
  })

 

  const {register , handleSubmit ,formState : {errors}} = useForm({
    resolver : zodResolver(validationSchema)
  });
  console.log(errors)
  // console.log(errors.message)
 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user , error, isLoading , isAuth} = useSelector((state) => state.auth);

  let myError = null;
  if (error){
     myError = "error :" + error;
  }
  const passRef = useRef(null);
  const [inputType , setInputType] = useState(true);
 
  const onSubmit = (data)=>{
    console.log(data)
    dispatch(login(data));
  }

  const handleGoogleLogin = ()=>{
    window.location.href  = "http://localhost:3000/api/auth/google"
  }

  useEffect(()=>{
      if (isAuth){
        navigate('/profile');
      }
  },[isAuth]);
//   useEffect(()=>{
//     if (error){
//         alert(error || "unknown error");
//     }
// },[error])


  return (
  
      <div className='bg-blue-200 w-[60%] flex flex-col justify-center items-center p-3 rounded shadow-xl'>
          <div>
              <img src={myImage} alt=""  className='h-[100px]'/>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='w-full h-full flex justify-center'>

          <div className='flex flex-col justify-center items-center w-[50%]'>
            <div className=' w-full h-full  flex flex-col '>
                <p className='text-lg font-medium'>Email</p>
                <input type="text" placeholder='Email' className='rounded p-2 py-1 
                mt-[5px]' {...register("email")}/>
                <p className="text-red-500 text-sm mt-1 min-h-[16px]">
                  {errors.email ? errors.email.message : ""}
                </p>
            </div>
          <div className=' w-full h-full mt-2 ' >
              <p className='text-lg font-medium'>password</p>
              <input ref={passRef} type ={inputType ? "password" : "text"} placeholder='password' className='rounded p-2 py-1 mt-[5px] w-full mb-1' {...register("password")} />
              
              <button type='button' onClick={() =>{
                    setInputType(!inputType);
                }
              }> {inputType ? <FaEyeSlash className='absolute bottom-60 left-[62.5%] ' /> : <FaEye className='absolute bottom-60 left-[62.5%] ' />}</button>

             
                    {/* Password Error with fixed height */}
                    <p className="text-red-500 text-xs min-h-[16px]">
                      {errors.password ? errors.password.message : ""}
                    </p>
                 
              {/* {errors.password && (
                <p className='text-black text-xs  '>{errors.password.message}</p>
              )} */}
              
          </div>

          <div className='w-full flex items-center justify-center mt-8'>
            <button type='submit' className=' border-2 p-2 py-1  w-[100%] bg-blue-900 text-white
            active:bg-blue-300'  >{isLoading ? "Loading.." : "Login"}</button>
          </div>
          <div>
            <p className={`text-center font-medium ${user && 'text-zinc-200' || myError && 'text-red-600'} *:
            `}>{user || myError}</p>
            
          </div>
          </div>
          </form>
          <div className='w-full flex items-center justify-center mt-8'>
            <button type='submit' className=' border-2 p-2 py-1  w-[50%] bg-red-700 text-white
            active:bg-blue-300'  onClick={handleGoogleLogin}>Login with Google</button>
          </div>

      </div>
    
  )
}

export default Login