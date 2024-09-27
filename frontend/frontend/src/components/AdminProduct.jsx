import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import DataTable from './DataTable'
import ProductFormModel from './ProductFormModel'

const AdminProduct = () => {
   const [open , setOpen] = useState(false);

   useEffect(()=>{

   })
  return (
    <div className='h-screen w-screen'>   
        <div className='flex justify-end p-4 m-4'>
        <div>
          <button className='p-2 border-2 border-gray-800 text-xs font-medium active:bg-black active:text-white' onClick={()=>{setOpen(true)}} >Add Product</button>
        </div>
      </div>

      <div>
        <DataTable/>
      </div>

        <ProductFormModel open ={open} setOpen = {setOpen}/>
    </div>
  )
}

export default AdminProduct