import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Home from '../components/Home'
import Profile from '../components/Profile'
import Cart from '../components/Cart'
import Unprotected from '../components/Unprotected'
import AdminProduct from '../components/AdminProduct'
import Dashboard from '../components/Dashboard'
import OpenRoute from '../components/OpenRoute'
import Private from '../components/Private'
import AdminOrder from '../components/AdminOrder'
import AdminUser from '../components/AdminUser'
import MyOrder from '../components/MyOrder'
import Order from '../components/Order'

const Router = createBrowserRouter([
   {
        element : <OpenRoute/>,
        children :[
            {
                path : "/",
                element : <Home/>
            },
            {
                path : "/cart",
                element : <Cart/>
            },
        ]
   },


    {
        element : <Unprotected/>,
        children : [
            {
                path : "/login",
                element : <Login/>
            },
            {
                path : "/signup",
                element : <Signup/>
            },
        ]
    },

    {
        element : <Private allowedRole={["Admin"]}/>,
        children :[
            {
                path : "/dashboard",
                element : <Dashboard/>

            },
            {
                path : "/adminOrder",
                element : <AdminOrder/>
            },
            {
                path : "/adminProduct",
                element : <AdminProduct/>
            },
            {
                path : "/adminUser",
                element : <AdminUser/>
            }
        ]
    },

    {
        element : <Private allowedRole={["User"]}/>,
        children : [
            {
                path : "/myOrder",
                element : <MyOrder/>
            },
            {
                path : "order",
                element : <Order/>
            }
        ]
    },

    {
        element : <Private allowedRole={["User","Admin"]}/>,

        children :[
            {
                path : "/profile",
                element : <Profile/>
            }
        ]
    },

    // {
    //     element : <AdminProduct allowedRole = {["Admin"]}/>,
    //     children : [
    //         {
    //             path  : "/dashboard",
    //             element : <Dashboard/>
    //         },
    //         {

    //         },
    //     ]
    // },
    {
        path :  "*",
        element : <Navigate to="/signup" />
    },
])


// /login , /signup ---- can access without login , but if logged in then not accessible

// /profile  -- can accessible user and admin

// /dashboard , /adminproduct, /adminuser, /adminOrder ---admin
// /myorder , /order  --- user
// / , /cart --- anyone

export default Router