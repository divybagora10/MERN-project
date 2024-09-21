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

      <div className='h-screen flex justify-center items-center'>
          <RouterProvider router = {Router}/>
      </div>
      </Provider>
        
    )
  }

  export default App
