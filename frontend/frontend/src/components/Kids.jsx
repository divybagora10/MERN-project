import React from 'react'
import Card from './Card';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { setSignin } from '../redux/slices/authSlice';
import { getAllProduct } from '../redux/slices/productSlice';

const Kids = () => {
  const {products} = useSelector((state)=> state.product);

  const dispatch = useDispatch();
  console.log(products)
  useEffect(()=>{
      dispatch(getAllProduct())
    },[dispatch])
  return (
    <div>
      <div className='grid grid-cols-4 gap-4'>

      {products.map((item) =>{
      return ( item.category === 'kids clothing'? 
      <Card product = {item}/>
      : null)
      })}
      </div> 
    </div>
  )
}

export default Kids