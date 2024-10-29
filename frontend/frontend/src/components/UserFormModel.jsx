import React, { useEffect } from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateInfo } from '../redux/slices/updateDetails';

const UserFormModel = ({open , setOpen , row, setRow}) => {

    const {register, handleSubmit  , reset} = useForm({});
    const dispatch = useDispatch();

    const onSubmit = (data)=>{
        console.log(data);
        dispatch(updateInfo(data));
        setOpen(false)
    }

    useEffect(()=>{
        if(row){
            reset(row);
            console.log(row);
        }
    },[row])
  return (
    <div>
    <Modal
    aria-labelledby="modal-title"
    aria-describedby="modal-desc"
    open={open}
    onClose={() => {    
        setOpen(false);
    }}
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
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
        
      </Typography>
      <Box>
        <div className='w-[50vh]' >
            <form action="" className='flex flex-col gap-10 mt-10' onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder='Role' className='p-2 py-1 border border-gray-800 outline-none bg-transparent my-3 text-md' {...register("role")} />
                <input type="text" placeholder='status' className='p-2 py-1 border border-gray-800 outline-none bg-transparent my-3 text-md' {...register("status")} />

                <button 
                    type='submit'
                    className='bg-black text-white text-xs p-2 active:bg-gray-800'
                >Update User</button>
            </form>
        </div>
      </Box>
    </Sheet>
  </Modal>
</div>
  )
}

export default UserFormModel