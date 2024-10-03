import React from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  return (
    <div className='flex justify-center items-center gap-10 h-32'>
    <Link to='/men' className='hover:border-b-2 border-gray-700 px-1 cursor-pointer'>Men</Link>
    <Link to='/women' className='hover:border-b-2 border-gray-700 px-1 cursor-pointer'>Women</Link>
    <Link to='/kids' className='hover:border-b-2 border-gray-700 px-1 cursor-pointer'>Kids</Link>
    </div>
  )
}

export default Category