import React, { useRef } from 'react'
import myImage from "../assets/295128.png"
import { useForm } from 'react-hook-form';

const Login = () => {

  const passRef = useRef();

  const {register , handleSubmit ,formState : {errors}} = useForm();
 
  const onSubmit = (date)=>{
    console.log(date);
  }
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
          </div>
          <div>
              <p className='text-lg font-medium'>password</p>
              <input ref={passRef} type="text" placeholder='password' className='rounded p-2 py-1 mt-[5px]' {...register("password")} />
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
            active:bg-blue-300'  >Login</button>
          </div>
          </form>
      </div>
    
  )
}

export default Login