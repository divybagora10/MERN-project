  import { useState } from 'react'
  import reactLogo from './assets/react.svg'
  import viteLogo from '/vite.svg'
  import './App.css'
  import Signup from './components/Signup'
  import Router from './router/Router'
  import { RouterProvider } from 'react-router-dom' 
import { Provider } from 'react-redux'
  import store from './redux/store'

  function App() {
    
    return (
      <Provider store = {store}>

      <div className='h-screen w-screen flex justify-center items-center'>
          <RouterProvider router = {Router}/>
      </div>
      </Provider>
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
