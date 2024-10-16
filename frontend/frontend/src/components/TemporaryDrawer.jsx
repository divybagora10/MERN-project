import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useSelector } from 'react-redux'
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";


export default function TemporaryDrawer({open , setOpen}) {
//   const [open, setOpen] = React.useState(false);
const [isEditable , setIsEditable] = React.useState(false);
const {userDetails} = useSelector((state)=>state.auth);
const [username , setUsername] = React.useState(userDetails.username);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  console.log(open)

  const data = {
    email : userDetails.username,
    updatedUsername : username
  }

  console.log(data);

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation" >
      <div className='ml-3'>
        <p className='text-lg font-medium' >username : </p>
          <div className='flex  items-center'>
              <input type="text" value={username} 
                    readOnly = {isEditable ? false : true}
                    onChange={(e)=> setUsername(e.target.value)}
                    className ={`w-[90%] text-lg font-medium  p-1 ${isEditable ? `border-2 border-gray-400` : `outline-none`}`} />
                    {isEditable ? <FaSave onClick={()=> 
                      setIsEditable(false)
                    } /> : 
                      <MdEdit onClick={()=> {
                        setIsEditable(true)
                      }}/>
                    }
          </div>

      </div>
      <Divider />

      <div  className='ml-3'>
        <p className='text-lg font-medium'>User_ID :</p>
        <div>
          <input type="text" value= {userDetails.user_id} readOnly className='w-[90%] outline-none text-lg font-medium' />
          
        </div>
      </div>
     
      
    </Box>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>Profile</Button> */}
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </div>
  );
}
