import React from 'react'
import { removeFromCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux'



const CartCard = ({product}) => {

    const dispatch = useDispatch();
    const handleRemoveItem = (removeItem)=>{
        dispatch(removeFromCart(removeItem._id));
    }
    
   return (
    <div className='flex flex-col justify-center items-center  bg-blue-300 p-2 rounded-lg '>
        <div className="w-[70%]">
            <img src={`http://localhost:3000/${product.productURL}`} alt="" />
        </div>
        
        <p className='mt-2'>{product.name}</p>
        <p>${product.price}</p>
        <div className='mt-3 flex justify-between w-full '>
            <button className='border-2 border-gray-600 p-2 py-1 '>Buy Now</button>
            <button className='border-2 border-gray-600 p-2 py-1' 
                 onClick={()=>{
                    handleRemoveItem(product)
                  }}
            >Remove item</button>
        </div>
    </div>
  )
}

export default CartCard