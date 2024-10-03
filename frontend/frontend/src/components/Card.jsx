import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice';
// import { useSelector } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';

const Card = ({product}) => {
  const dispatch = useDispatch();


  // console.log(cartItem);
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  }

  const handleRemoveItem = (removeItem)=>{
      dispatch(removeFromCart(removeItem._id));
  }

  return (
    <div className='bg-blue-200 rounded p-2 flex flex-col items-center' >
        <div className='h-[100%] w-[70%]'>
            <img src={`http://localhost:3000/${product.productURL}`} alt=""  />
        </div>

        <div>{product.name}</div>
        
        <p className='mt-2'>PRICE : ₹{product.price}</p>
        
        <div className='flex justify-between w-full mt-auto mb-2'>
            <button className='border-2 p-2 py-1 border-gray-600 rounded justify-end' >Buy now</button>
            <button className='border-2 p-2 py-1 border-gray-600 rounded ' onClick={() =>{handleAddToCart(product)}}> Add to cart</button>

            <button className='border-2 p-2 py-1 border-gray-600 rounded' 
            onClick={()=>{
              handleRemoveItem(product)
            }}>Remove Item</button>
        </div>
    </div>
  )
}

export default Card