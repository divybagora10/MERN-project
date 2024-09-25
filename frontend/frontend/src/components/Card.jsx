import React from 'react'

const Card = ({image , price , productName}) => {
  return (
    <div className='bg-yellow-300 rounded p-2 flex flex-col items-center' >
        <div>
            <img src={image} alt=""  />
        </div>

        <div>{productName}</div>
        
        <p className='mt-2'>PRICE : ₹{price}</p>
        
        <div className='flex justify-between w-full mt-2'>
            <button className='border-2 p-2 py-1 border-gray-600 rounded '>Buy now</button>
            <button className='border-2 p-2 py-1 border-gray-600 rounded '> Add to cart</button>
        </div>
    </div>
  )
}

export default Card