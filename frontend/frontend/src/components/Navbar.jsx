import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { setLogout } from '../redux/slices/authSlice';


const Navbar = () => {
    const {isAuth , role} = useSelector((state)=>state.auth);
    // console.log(role)
    // console.log(isAuth)
    const  dispatch = useDispatch();

    const handleLogOut = ()=>{
        localStorage.removeItem("token");
        dispatch(setLogout());
    }

  return (
    <div className='flex justify-between items-center bg-gray-100 p-4 w-full'>
        <div className='text-3xl font-semibold'>
            LOGO
        </div>

        <div>
            <input type="text" placeholder='Search...' className='p-2 border border-gray-700 outline-none'  />
        </div>

        <div>

            {
                isAuth ? (
                    role === "User" ? 
                    <div className='flex gap-5 font-medium'>
                        <Link to= "/cart">Cart</Link>
                        <Link to= "/profile">Profile</Link>
                        <Link to= "/myOrder">Myorders</Link>
                    </div>
                    :
                    <div className='flex gap-5 font-medium'>
                        <Link to = "/dashboard">Dashboard</Link>
                        <Link to="/adminUser">Users</Link>
                        <Link to="/adminProduct">Products</Link>
                        <Link to="/adminOrder">Orders</Link>
                        <Link to= "/profile">Profile</Link>

                       <button onClick={handleLogOut}> <IoIosLogOut size={25} /></button>
                    </div>
                ) : (
                    <div className='flex gap-5 font-medium'>
                        <Link to= "/login">Login</Link>
                        <Link to ="/signup">SignUp</Link>
                        <Link to ="/cart">Cart</Link>
                    </div>
                )
            }
            {/* {
                isAuth ? (
                    role === "User" ? 
                    <div className='flex gap-5 font-medium'>
                        <Link to ="/cart">Cart</Link>
                        <Link to ="/cart">Profile</Link>
                        <Link to ="/cart">Myorders</Link>
                    </div>
                    :
                    <div className='flex gap-5 font-medium'>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/adminUser">Users</Link>
                        <Link to="/adminProduct">Products</Link>
                        <Link to="/adminOrder">Orders</Link>
                    </div>
                ) :
                (
                    <div className='flex gap-5 font-medium'>
                    <Link to="/cart">Cart</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                )
            } */}
        </div>
    </div>
  )
}

export default Navbar