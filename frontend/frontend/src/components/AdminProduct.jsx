import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import DataTable from './DataTable'
import ProductFormModel from './ProductFormModel'
import { MdEdit } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { MdDelete } from "react-icons/md";


import { deleteProduct, getAllProduct } from '../redux/slices/productSlice';
import { get } from 'react-hook-form';


const AdminProduct = () => {
   const [open , setOpen] = useState(false);
   const [isUpdate , setIsUpdate] = useState(false);
   const [rowData , setRowData] = useState ({});
   const [isProductDelete , setProductDelete] = useState(false);

   const dispatch = useDispatch();
   const {products} = useSelector((state)=> state.product);
   console.log("products",products)
 
   React.useEffect (()=>{
     dispatch(getAllProduct());
   },[]);

   const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'productURL', headerName: 'Product Image', width: 230 , renderCell : (params)=>{
      return (
        <div><img src={`http://localhost:3000/${params.row.productURL}`} alt="" className='w-10 rounded-full' /></div>  
      )
    } },
    { field: 'name', headerName: 'product Name', width: 130 },
    { field: 'category', headerName: 'category', width: 130 },
    // fields should have name exact to keys of data
    {
      field: 'description',
      headerName: 'description',
      width: 200,
      // type: 'number',
    },
    {field : 'price', headerName : 'Price'},
    {field : 'action' , headerName : 'edit user' , renderCell : (params)=>{
      return(
        <div className='h-full flex justify-center items-center'> <MdEdit size={25} onClick ={() =>{
          handleUpdateClick(params.row);
        }}/></div>
      )
    }},

    {field: 'delete' , headerName : 'Delete user' , renderCell : (params)=>{
      return (
        <div className='h-full flex justify-center items-center'>
            <MdDelete size={23} onClick={()=>{
              handleDeleteClick(params.row)
            }}/>

        </div>
      )
    }}

  ]

  const handleDeleteClick = (data)=>{
      
  const delProduct = window.confirm("are you sure you want to delete the product")

      if (delProduct){
        setProductDelete(true);
        dispatch(deleteProduct(data));
      
      }
     else {
      console.log("delete operation cancel")
     }

  }

  const handleUpdateClick = (data)=>{
    // console.log("rowdata",data);
    setIsUpdate(true);
    setRowData(data);
    setOpen(true)
  }

  // console.log(rowData);

  const handleAddClick = ()=>{
    setIsUpdate(false);
    setRowData({
      name : "",
      price: "",
      description: "",
      category: "",
    })
    setOpen(true);
  }

  useEffect(()=>{
    if (isProductDelete){
      dispatch(getAllProduct());
      setProductDelete(false);
    }
  },[dispatch,isProductDelete])
  return (
    <div className='h-screen w-screen'>   
        <div className='flex justify-end p-4 m-4'>
        <div>
          <button className='p-2 border-2 border-gray-800 text-xs font-medium active:bg-black active:text-white' onClick={()=>{handleAddClick()}} >Add Product</button>
        </div>
      </div>

      <div>
        <DataTable columns = {columns} rows = {products}/>
      </div>

        <ProductFormModel open ={open} setOpen = {setOpen} row={rowData}  isUpdate = {isUpdate} setIsUpdate = {setIsUpdate}/>
    </div>
  )
}

export default AdminProduct