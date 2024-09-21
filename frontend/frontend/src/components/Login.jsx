import React, { useRef , useEffect} from 'react'
import myImage from "../assets/295128.png"
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from "zod"
import { useForm } from 'react-hook-form';
import { login } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
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

  const passRef = useRef();

  const {register , handleSubmit ,formState : {errors}} = useForm({
    resolver : zodResolver(validationSchema)
  });
  console.log(errors)
  // console.log(errors.message)
 

  const dispatch = useDispatch();
  const {user , error, isLoading} = useSelector((state) => state.auth);
 
  const onSubmit = (data)=>{
    console.log(data)
    dispatch(login(data));
  }

  useEffect(()=>{
    if (error){
        alert(error.message || "unknown error");
    }
},[error])
  return (
  
      <div className='bg-blue-200 w-[60%] flex flex-col justify-center items-center p-3 rounded shadow-xl'>
          <div>
              <img src={myImage} alt=""  className='h-[100px]'/>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>

         
          <div className='my-3 '>
              <p className='text-lg font-medium'>Email</p>
              <input type="text" placeholder='Email' className='rounded p-2 py-1 
              mt-[5px]' {...register("email")}/>
              {errors.email && (
                <p className='text-black'>{errors.email.message}</p>
              )}
          </div>
          <div >
              <p className='text-lg font-medium'>password</p>
              <input ref={passRef} type="text" placeholder='password' className='rounded p-2 py-1 mt-[5px]' {...register("password")} />
              {errors.password && (
                <p className='text-black text-sm text-wrap'>{errors.password.message}</p>
              )}
              {/* <button onClick={() => {
                if (passRef.current.type === "text"){
                  passRef.current.type = "password";
                  console.log(passRef.current.type)
                }

                else if ( passRef.current.type === "password"){
                    passRef.current.type = "text";
                    console.log(passRef.current.type)
                }
              
              }}>click</button> */}
          </div>

          <div className='w-full flex items-center justify-center mt-10'>
            <button className=' border-2 p-2 py-1  w-[100%] bg-blue-900 text-white
            active:bg-blue-300'  >{isLoading ? "Loading.." : "Login"}</button>
          </div>
          <div>
            <p className='text-center font-medium'>{user}</p>
          </div>
          </form>
      </div>
    
  )
}

export default Login