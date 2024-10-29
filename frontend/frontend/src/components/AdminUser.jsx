import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { getAllUsers } from '../redux/slices/authSlice';
import { MdEdit } from "react-icons/md";
import { getAllUsers } from '../redux/slices/fetchSlice';
import DataTable from './DataTable';
import UserFormModel from './UserFormModel';



const AdminUser = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.fetch);
  const {isUpdate} = useSelector((state)=>state.update);
  // console.log("user" , user)
  const [open , setOpen] = useState(false);
  const [row,setRow] = useState ({});

  const handleUpdate = (data)=>{
    setOpen(true);
    // setRow(null);
    setRow(data);
  }
  // console.log(data)
  // console.log(typeof user);

  const columns = [
    {field : "googleId" ,headerName : "Google Id" , width : 130},
    {field : "name" , headerName : "Name" , width : 120},
    {field : "role" ,headerName : "Role " , width : 130},
    {field : "email" , headerName : "email"  ,width : 200},
    {field : "status" , headerName : "status"  ,width : 130},
    {field : "Edit" , headerName : "Edit" , width : 100  ,renderCell : (params) =>{
      return (
        <div className='flex items-center justify-center h-full '>
            <MdEdit size={20} onClick={()=> handleUpdate(params.row)}/>
        </div>
      )
    }},
  ]

  useEffect(()=>{
    dispatch(getAllUsers());
  },[isUpdate]) 

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
      <UserFormModel open = {open} setOpen = {setOpen} row={row} setRow = {setRow}/>
    </div>
  )
}

export default AdminUser