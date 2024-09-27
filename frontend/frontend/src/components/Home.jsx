import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSignin } from '../redux/slices/authSlice';
import Card from './Card';
import image1 from "../assets/download.jpeg"

const Home = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSignin())
  },[dispatch])
  return (
    <div className='grid grid-cols-4 gap-4 mt-4'>
      <Card image = {image1} price = "400" />
      <Card image = {image1} price = "400"/>
      <Card image = {image1} price = "400"/>
      <Card image = {image1} price = "400"/>
      <Card image = {image1} price = "400"/>
      <Card image = {image1} price = "400"/>
    </div>
  )
}

export default Home