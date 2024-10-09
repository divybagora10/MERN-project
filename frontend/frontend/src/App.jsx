  import { useState } from 'react'
  import reactLogo from './assets/react.svg'
  import viteLogo from '/vite.svg'
  import './App.css'
  import Signup from './components/Signup'
  import Router from './router/Router'
  import { RouterProvider } from 'react-router-dom' 
import { Provider } from 'react-redux'
  import store from './redux/store'
  import Navbar from './components/Navbar'
import Tempdr from './components/Tempdr'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


  function App() {
    const [open , setOpen] = useState(false);

    // const handleclick = ()=>{
    //   toast.success("Login successfully" , {
    //     autoClose : 3000
    //   });
    // }
    
    return (
      // <div>
      //   <button onClick={()=> setOpen(true)}>click me </button>
      //   <Tempdr open = {open} setOpen = {setOpen}/>
      // </div>




      <Provider store = {store}>
      <div className='  w-screen flex justify-center items-center'>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
    />
        
          <RouterProvider router = {Router}/>
      </div>
      </Provider>

//       <div>
//         <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//           transition:Bounce
//     />
// {/* Same as */}
//         <button onClick={handleclick}>Click me</button>
//         {/* <ToastContainer /> */}
//       </div>

      // <div>
      //   <input type="file" id='fileInput' onChange={(e)=>{
      //     console.log(e)
      //     if (e.target.files && e.target.files.length > 0){
      //       console.log("true");
      //     }
      //     else{
      //       console.log("false");
      //     }
      //   }} />
      // </div>
        
    )
  }

  export default App
