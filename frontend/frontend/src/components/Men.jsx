import Card from './Card';
import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSignin } from '../redux/slices/authSlice';
import { getAllProduct } from '../redux/slices/productSlice';

const Men = () => {

    const {products} = useSelector((state)=> state.product);

    const dispatch = useDispatch();
    console.log(products)
    useEffect(()=>{
        dispatch(getAllProduct())
      },[dispatch])
  return (
    <div  >
    <div className='grid grid-cols-4 gap-4'>

        {products.map((item) =>{
       return ( item.name === 'shirt'? 
        <Card product = {item}/>
       : null)
      })}
    </div> 
    </div>
  )
}

export default Men