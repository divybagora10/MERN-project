import React from 'react'
import { useSelector } from 'react-redux'
import TemporaryDrawer from './TemporaryDrawer';

const Profile = () => {
  const {userDetails} = useSelector((state)=>state.auth);
  
  return (
    <div>
      <p>Your username is  : {userDetails.username}</p>
      <p>Your id is  : {userDetails.user_id}</p>
    </div>
  )
}

export default Profile