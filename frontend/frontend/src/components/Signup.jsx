import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'

const Signup = () => {

    const { register , handleSubmit} = useForm();
    console.log(register)

    const onSubmit = (data)=>{
        console.log(data);
    }

  return (
    <div className='flex w-4/5 h-4/5 justify-between items-center bg-white rounded shadow-2xl'>
        <div className='w-1/2'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX9A5dXy1TroyyQPqIauBbN03gwOgXLjFNSjE-sKs8AyAWjmtnaWGI2L4SdcHdYbG1C20&usqp=CAU" alt="" className='w-full' />
        </div>

        <div className='w-1/2'>
            <h1 className='text-2xl'>Welcome!</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-2 '>

                <div >
                    <label htmlFor="" className='font-medium'>Name</label>
                    <input type="text"  className='block outline-none border border-gray-700 w-4/5 my-2 rounded p-1' {...register("name")}/>
                </div>
                <div>
                    <label htmlFor="" className='font-medium'>Email</label>
                    <input type="email" className='block outline-none border border-gray-700 w-4/5 my-2 rounded p-1' {...register("email")} />
                </div>
                <div>
                    <label htmlFor="" className='font-medium'>Password</label>
                    <input type="password" className='block outline-none border border-gray-700 w-4/5 my-2 px-1 rounded p-1'  {...register("password")}/>
                </div>
                <div>
                    <label htmlFor="" className='font-medium'>Contact Number</label>
                    <input type="number" className='block outline-none border border-gray-700 w-4/5 my-2 rounded p-1'  {...register("number")}  />
                </div>
                </div>
                <button className='bg-blue-300 w-[90%] p-2 py-1 rounded my-4 active:bg-blue-800 active:text-white'>Signup</button>
            </form>
        </div>
    </div>
  )
}

export default Signup