import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.js'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import NavbarComp from './Components/Navbar.js';
import UserHome from './Pages/UserHome.js'
import Search from './Pages/Search.js';
import AlbumPage from './Pages/AlbumPage.js'
import { AuthContext } from './context/AuthContext.js';
import { Navigate } from "react-router-dom"
// import Comment from './Components/Comment.js';
import { AuthContextProvider } from './context/AuthContext.js';
import UserInfo from "./Pages/UserInfo.js"
import Comment from "./Pages/Comment.js"

function App() {
  const user = useContext(AuthContext)
  console.log(user);
  console.log("APP")
  

  useEffect(()=>{
    // setUserRef()
    console.log("USESUSESUEUSEUSE")
  
    console.log(user)
  },[user])

  return(
  <Router>
    <Routes>
      <Route exact path = '/' element={!user.user ? <Home/> : <Navigate to="/userhome"/>}/>
      <Route path="/login" error = {user.error}element={user.user ? <Navigate to="/userhome"/> : <Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/userhome" element={user.user ? <UserHome u = {user}/> : <Home/>}/>
      <Route path="/profile/:username" element={<Profile/>}/>
      <Route path='/userhome' element={!user ? <Home/> : <UserHome/>} />
      <Route path="/search" element={<Search/>}/>
      <Route path="/albumpage/:albumname" element={<AlbumPage/>}/>
      <Route path="/comments/:albumname" element={<Comment/>}/>
      <Route path="/userinfo/:user" element={<UserInfo/>}/>
      <Route path = "/review/:album/:id" element={<Comment/>}/>
    </Routes>
  </Router>
  )
}

export default App;
