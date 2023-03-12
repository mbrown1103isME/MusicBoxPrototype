import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import profileicon from "../img/profileicon.png"
import { Button } from 'react-bootstrap';
function NavbarComp(props) {
  // const userString = "/profile/" + user.username;
  const user = useContext(AuthContext)
  const [username,setUsername] = useState("")
  const [usericon,setIcon] = useState(profileicon)
  const [logged,setLogged] = useState(false)

  useEffect(()=>{
    if(!localStorage.getItem("user")){
      setUsername("")
      console.log(localStorage.getItem("user"))
      console.log(user)
    }else{
      setLogged(true)      
    console.log()
    const userObj = JSON.parse(localStorage.getItem("user"))
      setUsername(userObj.username)
    }
    // console.log(user);
  })
  if(logged){
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Music Box</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/userhome">Home</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
                <NavDropdown title="Profile" id="collasible-nav-dropdown">
                  <NavDropdown.Item href={"/profile/" + username}>User Profile</NavDropdown.Item>
                  <NavDropdown.Item href={"/userinfo/" + username}>
                    Profile Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={()=>{
                    localStorage.clear()
                    console.log("Cleared local storage")
                  }}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link eventKey={2} href="">
                  {username}
                  <img src={usericon} width = "30px" height="30px" alt='Profile Picture'/>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
            }else{
              return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                  <Container>
                    <Navbar.Brand href="/">Music Box</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                      <Nav className="me-auto">
                        <Nav.Link href="/userhome">Home</Nav.Link>
                        <Nav.Link href="/search">Search</Nav.Link>
                        {/* <Button onClick={()=>{console.log(user)}}>Click</Button> */}
                      </Nav>
                      <Nav>
                        <Nav.Link eventKey={2} href="/login">
                          <Button>Log in</Button>
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="/register">
                          <Button className='btn-success'>Sign up</Button>
                        </Nav.Link>
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
              );
            }
}

export default NavbarComp;