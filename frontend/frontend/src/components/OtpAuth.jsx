import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toggleIsUpdate, updateInfo } from '../redux/slices/updateDetails';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

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

export default function OtpAuth({open , setOpen}) {
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const [otp ,setOtp] = React.useState(["","","",""]);
  const inputRef = React.useRef([]);

  const handleInput = (e , index)=>{
    const newOtp = [...otp];
    otp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value !== "" && index < otp.length-1){
        inputRef.current[index+1].focus();
    }

    if (e.target.value === "" && index > 0){
        inputRef.current[index-1].focus();
    }
  }

  React.useEffect(()=>{
    
    if(open){
        inputRef.current[0].focus();
    }
  },[]);

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
            <div className='flex gap-2'>
                {otp.map(( item , index)=>{
                    return (
                        <input 
                        key={index}
                        ref={(element) => inputRef.current[index] = element}
                        type="text" 
                        className='outline rounded-lg w-8 px-1'
                        maxLength={1}

                        onChange={(e)=>handleInput (e,index)}
                            
                        />
                    )
                })}
            </div>
          </Typography>
         
        </Box>
      </Modal>
    </div>
  );
}
