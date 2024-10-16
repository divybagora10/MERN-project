import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toggleIsUpdate, updateInfo } from '../redux/slices/updateDetails';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import OtpAuth from './OtpAuth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PasswordModel({open , setOpen , openOtp  ,setOpenOtp}) {
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  

  const  {isUpdate , error} = useSelector((state)=> state.update)

  const handleSubmit = (e)=>{
    e.preventDefault();
    setOpenOtp(true);
    setOpen(false);
    // const formData = new FormData(e.target);

    // const userDetails = {
    //     email : formData.get('email'),
    //     password : formData.get('newPassword')
    // }

    // console.log(userDetails);
    // console.log(formData);
        
    // dispatch(updateInfo(userDetails));
   
  }

  React.useEffect(()=>{
    if(isUpdate){
        setOpen(false);
        dispatch(toggleIsUpdate());
        toast.success("password Updated Successfully" , {
            autoClose : 3000
        });
    }

    else if (error){
        toast.error(error , {
            autoClose : 2000
        })
    }
  },[isUpdate]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>

                <div>
                    <p className='text-base'>Email :</p>
                    <input type="text" name='email' placeholder='email' className='outline rounded px-1 w-full mt-2' />
                </div>

                {/* <div >
                    <p className='text-base'>Set new password :</p>
                    <input type="text" name = 'newPassword' placeholder='email' className='outline rounded px-1 w-full mt-2' />
                </div> */}
                

                <div className='w-full flex justify-center '>
                    <button className=' p-2 py-1 rounded bg-blue-400 text-white active:bg-blue-700'>Submit</button>
                </div>
            </form>
          </Typography>
         
        </Box>
      </Modal>
    </div>
  );
}
