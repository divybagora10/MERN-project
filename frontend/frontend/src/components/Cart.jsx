import React, { useEffect, useState } from 'react'
import CartCard from './CartCard'
import { useSelector } from 'react-redux'
import { set } from 'react-hook-form'


const Cart = () => {
  const {cartItem} = useSelector((state)=>state.cart)
  const [totalSum , setTotalsum] = useState(0);
  

  useEffect (()=>{
    const  sum = cartItem.reduce((acc,item)=> acc + item.price , 0);
    setTotalsum(sum);
  },[])

  return (

    
    <div className='w-[98%]  flex flex-col items-end justify-end gap-2'>
      <div className='font-medium text-xl mr-[5%]'><p>Your cart items</p></div>
      <div className='w-[30%] flex flex-col gap-3 justify-end items-end '>
          {cartItem.map((item)=>{
            // setTotalsum((prev)=> prev + item.price);
            // console.log(sum)
            return <CartCard product = {item}/>
          })}
      </div>
      <div>
        {/* {setTotalsum(sum)}; */}
        <p>Total : {totalSum} </p>
      </div>
    </div>
  )
}

export default Cart