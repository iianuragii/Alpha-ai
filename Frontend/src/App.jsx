import React from 'react'
import Login from './components/Login'
import { Route, Routes} from 'react-router-dom'
import Homepage from './components/Homepage'
const App = () => {
  return (
    <Routes>
      <Route path='/chat' element={<Homepage/>}/>
      <Route path='/' element={<Login/>}/>      
    </Routes>    
  )
}

export default App