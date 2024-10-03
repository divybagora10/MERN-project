import React from 'react'
import CartCard from './CartCard'
import { useSelector } from 'react-redux'


const Cart = () => {
  const {cartItem} = useSelector((state)=>state.cart)

  return (
    <div className='grid grid-cols-4 gap-6  '>
        {cartItem.map((item)=>{
          return <CartCard product = {item}/>
        })}
    </div>
  )
}

export default Cart