import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSignin } from '../redux/slices/authSlice';
import Card from './Card';
import image1 from "../assets/download.jpeg"
import { useSelector } from 'react-redux';
import { getAllProduct } from '../redux/slices/productSlice';

const Home = () => {
  const dispatch = useDispatch();
  const {products} = useSelector((state)=>state.product);
  const {cartItem} = useSelector((state)=> state.cart);
  console.log("cart items" , cartItem);
  
   console.log(products);
  //  console.log(first)

  useEffect(()=>{
    dispatch(setSignin());
    dispatch(getAllProduct())
  },[dispatch])
  return (
    <div className='grid grid-cols-4 gap-4 mt-4'>
    {products.map((item) =>{
      return (
        <Card product ={item}/>
      )
    })}
      
      {/* <Card image = {image1} price = "400" />
      <Card image = {image1} price = "400"/>
      <Card image = {image1} price = "400"/>
      <Card image = {image1} price = "400"/>
      <Card image = {image1} price = "400"/>
      <Card image = {image1} price = "400"/> */}
    </div>
  )
}

export default Home