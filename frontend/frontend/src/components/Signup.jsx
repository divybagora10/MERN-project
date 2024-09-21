import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from "zod"
import { useDispatch, useSelector } from 'react-redux'
import {  signup } from '../redux/slices/authSlice'
import axios from 'axios'

const Signup = () => {
        const validationSchema = z.object({
            name : z.string().min(1,"name is required").max(30,"name cannot exceed more than 30 words"),
            email : z.string().email("Invalid Email"),
            password : z.string().min(8 , "passwrod must be of 8 characters")
            .regex(/[a-z]/ , "password must contain atleast one lower case")
            .regex(/[A-Z]/ , "password must contain atleast one Upper case letter")
            .regex(/[0-9]/ , "password must contain one  numeric value")
            .regex(/[\w]/ , "password must contain atleast 1 special charater"),

            phoneNumber : z.string().min(1 , "phone number is required")

        });

        const dispatch = useDispatch();

        const {isLoading , error} = useSelector((state)=> state.auth)

        const { register , handleSubmit , formState : {errors} } = useForm({
            resolver : zodResolver(validationSchema)
        });
  
    
        const onSubmit = async (data)=>{

            dispatch(signup(data));
            // console.log(data)
            // dispatch(setLoading());
            // try {
            //     const response = await axios.post("http://127.0.0.1:3000/auth/signup" , data);
            //     console.log(response)
            //     dispatch(setSuccess(response.data));
            // } catch (error) {
            //     console.log(error)
            //     dispatch(setError(error?.response?.data || "Internal server errror"));
            // }
        }

        useEffect(()=>{
            if (error){
                alert(error.message || "");
            }
        },[error])
    
        


    // formState is provided by useForm
    // formState have property of error so we destructure errors in formstate

    // const { register , handleSubmit , formState : {errors} } = useForm({
    //     resolver : zodResolver(validationSchema)
    // });
    // console.log(register)

    // const onSubmit = (data)=>{
    //     console.log(data);
    // }

  return (
    <div className='flex w-4/5 h-4/5 justify-between items-center bg-white rounded shadow-2xl'>
        <div className='w-1/2'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX9A5dXy1TroyyQPqIauBbN03gwOgXLjFNSjE-sKs8AyAWjmtnaWGI2L4SdcHdYbG1C20&usqp=CAU" alt="" className='w-full' />
        </div>

        <div className='w-1/2'>
            <h1 className='text-2xl text-center mb-10 font-medium'>Welcome!</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-2 '>

                <div >
                    <label htmlFor="" className='font-medium'>Name</label>
                    <input type="text"  className='block outline-none border border-gray-700 w-4/5 my-2 rounded p-1' {...register("name")}/>
                    {errors.name && (
                        <p className='text-sm text-red-500 '>{errors.name.message}</p>
                    )}

                </div>
                <div>
                    <label htmlFor="" className='font-medium'>Email</label>
                    <input type="email" className='block outline-none border border-gray-700 w-4/5 my-2 rounded p-1' {...register("email")} />
                    {errors.email && (
                        <p className='text-sm text-red-500'>{errors.email.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="" className='font-medium'>Password</label>
                    <input type="password" className={`block outline-none border  w-4/5 my-2 px-1 rounded p-1 ${errors.password ? 'border-red-500' : 'border-gray-700'} `}  {...register("password")} />

                    {errors.password && (
                        <p className='text-sm text-red-500'>{errors.password.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="" className='font-medium'>Contact Number</label>
                    <input type="number" className='block outline-none border border-gray-700 w-4/5 my-2 rounded p-1'  {...register("phoneNumber")}  />

                    {errors.phoneNumber && (
                        <p className='text-sm text-red-500'>{errors.phoneNumber.message}</p>
                    )}
                </div>
                </div>
                <button className='bg-blue-300 w-[90%] p-2 py-1 rounded my-4 active:bg-blue-800 active:text-white'>{isLoading ? "Loading " : "Signup"}</button>
            </form>
        </div>
    </div>
  )
}

export default Signup