import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getAllUsers } from '../redux/slices/authSlice';
import { MdEdit } from "react-icons/md";
import { getAllUsers } from '../redux/slices/fetchSlice';
import DataTable from './DataTable';


const AdminUser = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.fetch);
  console.log("user" , user)

  // console.log(data)
  // console.log(typeof user);

  const columns = [
    {field : "googleId" ,headerName : "Google Id" , width : 130},
    {field : "name" , headerName : "Name" , width : 120},
    {field : "role" ,headerName : "Role " , width : 130},
    {field : "email" , headerName : "email"  ,width : 200},
    {field : "status" , headerName : "status"  ,width : 130},
  ]

  useEffect(()=>{
    dispatch(getAllUsers());
  },[]) 

  // useEffect(async()=>{
  //     const response = await fetch("http://127.0.0.1:3000/auth/users");
  //     console.log(response);
  //     const allData = await response.json();
  //     console.log(allData)
  //     // return allData;
  
  // // catch(error){
  // //     return rejectWithValue(error.response.data);
  
  // },[])
  return (
    <div >

      <DataTable columns = {columns} rows = {user} />
        {/* <div className='h-screen w-screen flex flex-col '>

          <div className='flex justify-center'>
            <h1 className='text-3xl'>Users</h1>
          </div>

          <div >

          <table className=' font-medium border-separate border-spacing-y-4 border-separate-x-1 border w-[100%]'>
            <thead>
                <tr>
                  <th>
                    Status
                  </th>

                  <th>
                    email
                  </th>

                  <th>
                    name
                  </th>

                  <th>
                    Role
                  </th>
                </tr>
            </thead>


            <tbody>
               {user?.map((item,i) =>{
                return (
                  

                  <tr className='text-center'>
                    <td>
                      {JSON.stringify(item.status)}
                    </td>
                    <td>
                     {item.name}
                    </td>

                    <td>
                      {item.email}
                    </td>

                    <td>
                      {item.role}
                    </td>

                
                    <div>
                    <button>
                    <MdEdit />

                    </button>
                    </div>
                  </tr>
                 

                )
               })}
            </tbody>
          </table>
          </div>
        </div> */}
    </div>
  )
}

export default AdminUser