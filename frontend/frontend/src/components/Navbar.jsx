import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link ,NavLink} from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { setLogout } from '../redux/slices/authSlice';
import { IoMdLogIn } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import TemporaryDrawer from './TemporaryDrawer';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));




const Navbar = () => {
    const {isAuth , role} = useSelector((state)=>state.auth);
    // console.log(role)
    // console.log(isAuth)
    const  dispatch = useDispatch();
    const {cartItem} = useSelector((state)=> state.cart)

    const handleLogOut = ()=>{
        localStorage.removeItem("token");
        dispatch(setLogout());
    }

    const [open , setOpen] = useState(false);
  return (
    <div className='flex justify-between items-center bg-white p-4 w-full sticky top-0 z-50 '>
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
                    <div className='flex items-center justify-center gap-5 font-medium text-lg'>
                        <Link to="/" >Home</Link>
                        
                        <Link to= "/profile">Profile</Link>
                        <Link to= "/myOrder">Myorders</Link>

                        <Link to ="/cart" >
                            <div className='flex gap-1'>
                            <IconButton aria-label="cart">
                            <StyledBadge badgeContent={cartItem.length} color="secondary">
                                <ShoppingCartIcon style={{ width: '30px', height: '30px' }} />
                            </StyledBadge>
                            </IconButton>
                                {/* <FaShoppingCart size={25} /> */}
                                {/* <p>Cart</p> */}
                            </div>
                        </Link>
                       < button onClick={handleLogOut}> <IoIosLogOut size={25} /></button>
                    </div>
                    :
                    <div className='flex gap-5 font-medium text-lg  '>
                       <div className='hover:bg-gray-300  hover:rounded p-1'>
                            <Link to="/" className='hover:bg-gray-300  hover:rounded '>Home</Link>
                       </div>
                       <div className='hover:bg-gray-300  hover:rounded p-1'>

                        <Link to = "/dashboard">Dashboard</Link>
                       </div>
                       {/* <div className='hover:bg-gray-300  hover:rounded p-1'>
                        <Link to="/adminUser">Users</Link>

                       </div > */}
                        <NavLink
                            to="/adminUser"
                                className={({ isActive }) =>
                            isActive ? 'bg-gray-300 rounded p-1' : 'hover:bg-gray-300 hover:rounded p-1'
                            }
                            >
                            Users
                        </NavLink>
                       <div className='hover:bg-gray-300  hover:rounded p-1 '>
                        <Link to="/adminProduct">Products</Link>

                       </div>
                       <div className='hover:bg-gray-300  hover:rounded p-1'>

                        <Link to="/adminOrder">Orders</Link>
                       </div>
                       <div className='hover:bg-gray-300  hover:rounded p-1'>
                            <button onClick={()=> setOpen(true)}>Profile</button>
                        {/* <Link to= "/profile">Profile</Link> */}
                       </div>

                       <button onClick={handleLogOut}> <IoIosLogOut size={25} /></button>
                       <TemporaryDrawer open={open} setOpen = {setOpen}/>
                    </div>
                ) : (
                    <div className='flex gap-5 items-center font-medium'>
                        <Link to="/" className='hover:bg-gray-300  hover:rounded '>Home</Link>
                        <Link to= "/login" className='border-2 p-2 py-1 rounded border-gray-700 '>Login</Link>
                        <Link to ="/signup" className='border-2 p-2 py-1 rounded border-gray-700'>SignUp</Link>
                        <Link to ="/cart" >
                            <div className='flex gap-1'>
                            <IconButton aria-label="cart">
                            <StyledBadge badgeContent={cartItem.length} color="secondary">
                                <ShoppingCartIcon style={{ width: '30px', height: '30px' }} />
                            </StyledBadge>
                            </IconButton>
                                {/* <FaShoppingCart size={25} /> */}
                                {/* <p>Cart</p> */}
                            </div>
                        </Link>

                       
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