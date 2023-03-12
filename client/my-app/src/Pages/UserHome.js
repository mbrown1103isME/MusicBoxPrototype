import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Dropdown from '../Components/Dropdown';
import DisplayError from '../Components/DisplayAlert';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarComp from '../Components/Navbar';
import './pagesStyle.css'
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import Review from '../Components/Review';
import axios from 'axios';
import { Link } from 'react-router-dom';
import profileicon from "../img/profileicon.png"
// import CommentIcon from '@mui/icons-material/Comment';

// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';


function UserHome() {
  // const [user,setUser] = useState("test1103")

  const [reviews,setReviews] = useState([]);
  const [newUser,setNewUser] = useState(false);
  const [topAlbums,setTopAlbums]  = useState([])
  const [users,setUsers] = useState([])

  const user = useContext(AuthContext);
 

  useEffect(()=>{

    async function getReviews(){
      console.log(user)
      var reviewArray = []
      const currUser = await axios.get(`http://localhost:4000/api/users/${user.user.username}`)
      const followingList = await currUser.data[0].following
      const reviews = await axios.get("http://localhost:4000/api/reviews/getallreviews")
      followingList.forEach((following) => {
        const fil = reviews.data.filter((pred)=>{
          return pred.username === following
        })
        reviewArray = reviewArray.concat(fil)
      });
      if(reviewArray.length===0){
        console.log("New user")
        setNewUser(true)
        getReviewsNew()
      }
      setReviews(reviewArray)
    }
  getReviews()
  },[])

  async function getReviewsNew(){
    console.log("JDJFJDFDJFJDFJFJ")
    const albs = await axios.get("http://localhost:4000/api/reviews/allreviewedalbums")
    await setTopAlbums(albs.data)
    const usersS = await axios.get("http://localhost:4000/api/users/getusersrecent/:dummy")
    console.log(usersS)
    setUsers(usersS.data)
  }


  if(!newUser){


  return(
    <div>
      <NavbarComp userName={user.user.username}/>
      <div id="content">
        <div className='d-flex flex-row justify-content-center'>
          <h3>Welcome back {user.user.username}, here is what has been happening since you left...</h3>
        </div>
        <div id="mainContent">
          <h3>New reviews from friends</h3>
          <hr/>
          <div id="albumRows">
            <hr/>
            <Review rev = {reviews}/>
          </div>
        </div>
      </div>
    </div>
  )
  }else{
    return(
      <div>
      <NavbarComp/>
      <div id="content">
        <div className='d-flex flex-row justify-content-center'>
          <h3>Welcome to MusicBox {user.user.username}! Here is some community content to get you started...</h3>
        </div>
        <div id="mainContent">
          <h3>Most recent community reviews</h3>
          <hr/>
          <Review rev = {topAlbums}/>
          <h3>Newly joined members</h3>
          <Row className="mx-2 row row-cols-4">
          {users.map((user)=>{
            console.log(users)
            return(
              <div className="container">
                <Link className="text-decoration-none"  to={"/profile/"  + user.username}>
                <div className="d-flex flex-column">
                <img src={profileicon} width = "100" height="100"/>
                <h3>{user.username}</h3>
                </div>
                </Link>
                </div>
            )
          })}
          </Row>
          <div id="albumRows">
            <hr/>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default UserHome;