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


export default function TemporaryDrawer({open , setOpen}) {
//   const [open, setOpen] = React.useState(false);
  const {userDetails} = useSelector((state)=>state.auth);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  console.log(open)

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className='ml-3'>
        <p className='text-lg font-medium' >username : </p>
          <div className='flex  items-center'>
              <input type="text" value={userDetails.username} className='w-[90%] outline-none text-lg font-medium' />
              <MdEdit />
          </div>

      </div>
      <Divider />

      <div  className='ml-3'>
        <p className='text-lg font-medium'>User_ID :</p>
        <div>
          <input type="text" value= {userDetails.user_id} readOnly className='w-[90%] outline-none text-lg font-medium' />
        </div>
      </div>
      <Divider />
      
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
