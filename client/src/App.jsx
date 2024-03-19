import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Header from './components/Header'
import SignUp from './pages/SignUp'

const App = () => {
  return (
   <BrowserRouter>
   <Header />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/about' element={<About />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<SignUp />} />
     </Routes>
   </BrowserRouter>
  )
}

export default App