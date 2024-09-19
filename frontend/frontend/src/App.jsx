  import { useState } from 'react'
  import reactLogo from './assets/react.svg'
  import viteLogo from '/vite.svg'
  import './App.css'
  import Signup from './components/Signup'
  import Router from './router/Router'
  import { RouterProvider } from 'react-router-dom' 

  function App() {
    const [count, setCount] = useState(0)

    return (
      
      <div className='h-screen flex justify-center items-center'>
          <RouterProvider router = {Router}/>
      </div>
        
      
    )
  }

  export default App
