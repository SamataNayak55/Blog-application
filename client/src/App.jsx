import React from 'react'
import { Route,Routes} from 'react-router-dom'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import Listblog from './pages/admin/Listblog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/login'
import {Toaster} from "react-hot-toast"
import { useAppContext } from './context/AppContext'
import Home from './pages/home'

const App = () => {
  
  const {token} = useAppContext()


  return (
    <div>
      <Toaster />

        <Routes>
          <Route path='/' element={<Home/>} />  
         <Route path='/blog/:id' element={<Blog/>} />
        
        <Route path='/admin' element={token ? <Layout/> : <Login/>}>
        <Route index element={<Dashboard/>} />
        <Route path='addBlog' element={<AddBlog/>} />
        <Route path='listBlog' element={<Listblog/>} />
        <Route path='comment' element={<Comments/>} />
        </Route>
       </Routes> 
    </div>
  )
}

export default App;
