import React, { useContext, useEffect, useRef, useState } from 'react';
import "./pagesStyle.css"
import LoginImage from "../img/loginImage.png"
// import useS
import Form from "react-bootstrap/Form"
import { loginCall } from '../API_Calls/loginCall';
import axios from 'axios';
// import { navigate } from 'react-router-dom/Navigate';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import DisplayAlert from '../Components/DisplayAlert';

function Login(props) {
 
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [checkPrivacy, setCheckPrivacy] = useState(false)
  const check = useRef(false);
  const {user, isFetching, error, dispatch} = useContext(AuthContext)
  console.log(user);
  const [errorDis,setErrorDis] = useState({
    status: "none",
    errorType: "",
    message: ""
  })

  useEffect(()=>{
    // if(props.error===TypeError){
    //   console.log("Error!")
    // }
    // console.log(props.error)
    
  })

  
  const handleEmail = (e)=>{
    setEmail(e.target.value)
    console.log(email)
  }

  const handlePassword = (e)=>{
    setPassword(e.target.value)
    console.log(password)
  }
  
  const handleClick = async (e)=>{
    e.preventDefault();
    try{
      dispatch({type: "Login_Start"});
      const res = await axios.post("http://localhost:4000/api/auth/login",{
        email: email,
        password : password
      })
      .catch(err=>console.log(err))
      dispatch({type: "Login_Success", payload: res.data} )
      setErrorDis({
        status: "success",
        errorType: "Successful login",
        message : "loading your profile..."
      })
  }catch(err){
      console.log(err)
      setErrorDis({
        status: "danger",
        errorType: "Wrong credentials",
        message: "Please try again"

      })
      dispatch({type: "Login_Failure" , payload: err})
  }
      // const h = await loginCall({email,password},dispatch)
      // console.log(h);
      // setTimeout(()=>{
      //   if(!user){
      //     console.log(user)
      //   }
      // },1000)
     
    // <Navigate to="/userhome"/>
    console.log(email);
    console.log(password);
  }
    console.log(user)
  return (
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol md='6'>
           <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">MusicBox</span>
          </div>
          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3> 
            <Form>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg" onChange={handleEmail} required/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" onChange={handlePassword} required/>
             {/* <input className='mb-4 mx-5 w-100' label='password' id='formControlLg' type='password' size="lg" ref={email} required/> */}
            {/* <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='md' onClick={handleClick}>Login</MDBBtn> */}
            <Button className="mb-4 px-5 mx-5 w-100" color='info' size='md' onClick={handleClick}>Login</Button>
            <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">Forgot password?</a></p>
            <p className='ms-5'>Don't have an account? <a href="/register" class="link-info">Register here</a></p>
            </Form>
          </div> 
          <DisplayAlert status={errorDis.status} mes={errorDis.message} error={errorDis.errorType}/>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src={LoginImage}
            alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;