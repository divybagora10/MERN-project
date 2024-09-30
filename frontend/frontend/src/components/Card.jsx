import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice';

const Card = ({product}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  }

  return (
    <div className='bg-blue-200 rounded p-2 flex flex-col items-center' >
        <div className='h-[100%] w-[70%] flex justify-between items-center'>
            <img src={`http://localhost:3000/${product.productURL}`} alt=""  />
        </div>

        <div>{product.name}</div>
        
        <p className='mt-2'>PRICE : ₹{product.price}</p>
        
        <div className='flex justify-between w-full mt-auto mb-2'>
            <button className='border-2 p-2 py-1 border-gray-600 rounded justify-end' >Buy now</button>
            <button className='border-2 p-2 py-1 border-gray-600 rounded ' onClick={() =>{handleAddToCart(product)}}> Add to cart</button>
        </div>
    </div>
  )
}

export default Card