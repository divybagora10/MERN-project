import React, { useEffect, useState } from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";


// import { isRejected } from '@reduxjs/toolkit';
import { addProduct, getAllProduct, updateProduct } from '../redux/slices/productSlice';
// import { addProduct } from '../redux/slices/productSlice';

const ProductFormModel = ({open,setOpen , row , isUpdate ,setIsUpdate}) => {
  const [isImageUpdate , setIsImageUpdate] = useState(false);
    const { register , handleSubmit ,reset } = useForm({});

    const {isProductAdded} = useSelector((state)=>state.product)

    const dispatch = useDispatch();
  

    const onSubmit = (data)=>{
        const formData = new FormData();

        formData.append("name",data.name);
        formData.append("price",data.price);
        formData.append("description",data.description);
        formData.append("category",data.category);
        console.log(data.category);

        if (isUpdate){
          formData.append("_id",row._id);
          console.log(formData)
          dispatch(updateProduct(formData));
        }
        else {
          formData.append("productImage",data.productImage[0]);

          dispatch(addProduct(formData));
        }
        // console.log(data.productImage[0]); 
        console.log(data);

    }

    useEffect(()=>{
      if (isProductAdded){
        setOpen(false);
        dispatch(getAllProduct());
      }
    },[isProductAdded]);

    useEffect(()=>{
      if (row ){
        reset(row);
      }
    },[row, isUpdate]);

  return (
    <div>
        <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => {
          setOpen(false)
          setIsUpdate(false);
          setIsImageUpdate(false);
        }}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{ minWidth: 300, p: 3, boxShadow: 'lg' }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: 'lg', mb: 1 }}
          >
            {/* Add Product */}
            {isUpdate ? "Update Product" : "Add product"}
          </Typography>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-5 my-5 '>
                <div>
                    <label className='text-sm block '>Product Name</label>
                    <input type="text" className='p-2 py-1 border border-gray-800 outline-none bg-transparent my-3' {...register("name")} />
                </div>
                <div>
                <label className='text-sm block '>Price</label>
                <input type="text" className='p-2 py-1 border border-gray-800 outline-none bg-transparent my-3' {...register("price")} />
                </div>
                <div>
                <label className='text-sm block '>Description</label>
                <input type="text" className='p-2 py-1 border border-gray-800 outline-none bg-transparent my-3' {...register("description")} />
                </div>
                <div>
                <label className='text-sm block '>Category</label>
                <input type="text" className='p-2 py-1 border border-gray-800 outline-none bg-transparent my-3' {...register("category")} />
                </div>
                <div>
                <label className='text-sm block '>Image</label>
                {isUpdate ?
                 (isImageUpdate ? <div className='flex gap-4'>
                  <input type="file"  className='p-2 py-1 border border-gray-800 outline-none bg-transparent my-3 text-xs' {...register("productImage")} />
                  <MdCancel className='mt-2 cursor-pointer' onClick={()=>{
                    setIsImageUpdate(false);
                  }}/>

                 </div>
                  : <div className='flex gap-4'>
                  <img src={`http://localhost:3000/${row.productURL}`} className='w-[100px]'/>
                  <MdEdit size={25} className='cursor-pointer ' onClick={()=>{
                    setIsImageUpdate(true);
                  }}/>
                  </div>):
                    <input type="file"  className='p-2 py-1 border border-gray-800 outline-none bg-transparent my-3 text-xs' {...register("productImage")} />
                  }
                  

                </div>
                </div>
                <button type='submit' className='bg-black text-white text-xs p-2 active:bg-gray-800'>
                {isUpdate ? "Update Product" : "Add product"}
                </button>
            </form>
          </Box>
        </Sheet>
      </Modal>
    </div>
  )
}

export default ProductFormModel