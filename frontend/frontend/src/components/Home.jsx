import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSignin } from '../redux/slices/authSlice';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSignin())
  },[dispatch])
  return (
    <div>Home</div>
  )
}

export default Home