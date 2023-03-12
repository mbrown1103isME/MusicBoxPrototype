import NavbarComp from "../Components/Navbar";
import { Button, Container } from "react-bootstrap";
import profileicon from "../img/profileicon.png"
import { useState } from "react";
import './pagesStyle.css'
import axios from "axios";
import { useEffect } from "react";
import { set } from "mongoose";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Rating } from "@mui/material";
import Badge from "react-bootstrap/Badge";
import Comment from "../Components/Comment.js";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import LikePost from "../API_Calls/LikePost";
import Review from "../Components/Review";
import { useNavigate } from "react-router-dom";
import DisplayAlert from "../Components/DisplayAlert";

function Profile(){

  const followers = useRef([]);
  const following = useRef([]);
  const likes = useRef([]);
  const [reviews, setReviews] = useState([])
  // const user = useRef("test1103");
  const [image,setImage] = useState("");
  const token = useRef("");
  const params = useParams().username
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [click,setClick] = useState(1);
  const navigate = useNavigate()
  const [errorDis,setErrorDis] = useState({
    status: "none",
    errorType: "",
    message: ""
  })

  const user = useContext(AuthContext)
  const [username, setUsername] = useState("")

  
  useEffect(()=>{
      if(!localStorage.getItem("user")){
        setUsername("")
      }else{
        setUsername(JSON.parse(localStorage.getItem("user")).username)
        console.log(username)
      }
    

    async function getToken(){
      const client_ID = "7372f3a366214005a13abdb59ca29269";
      const client_Secret = "2ff68ae7cdb5419d9a9e963a41ec86dc";
      var authParams = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_ID + ':' + client_Secret)
          },
          body: 'grant_type=client_credentials'
        }
          fetch('https://accounts.spotify.com/api/token',authParams)
          .then(result=>result.json())
          .then(data => {
              token.current = data.access_token;
          })
          .catch(err => {
              console.log(err)
          });
  }
  getToken()

  },[])

  useEffect(()=>{
    console.log("refresh")
    async function getUsers(){
      const users = await axios("http://localhost:4000/api/users/getusers")
  }
  async function getUser(){
      const userData = await axios(`http://localhost:4000/api/users/${params}`)
          followers.current = await userData.data[0].followers
          console.log(userData.data[0].following);
          console.log(followers.current);
          following.current= await userData.data[0].following;
          console.log(userData.data[0].username)
          likes.current = await userData.data[0].likes;
          user.current = await userData.data[0];
  }

  getUser();
  getReviews()
  console.log(reviews)

  },[click])

  function handleCli(){
    setClick(-click);
  }

  async function followUnfollow(){
    console.log(username)
    console.log(params)
    try{
    const follow = await axios.put(`http://localhost:4000/api/users/${params}/follow/${username}`)
    await setErrorDis({
      status: "success",
      message: "Success!",
      errorType: follow.data
    })
  }catch(err){
    setErrorDis({
    status: "danger",
    message: "Failure!",
    errorType: "Cannot follow yourself!"
  })
  }
    
}



function ShowUsers(props) {   

        
        return (
          <>
            <Button variant="primary" className="w-100 h-25 p-3" onClick={handleShow}>
                Show followers and following
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                </svg>
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h1>Followers</h1>
                {followers.current.map((follower)=>{
                  console.log(follower)
                  return (
                    <div>
                      <Link to={"/profile/" + follower} className="text-decoration-none">
                      <div>
                          <img src={profileicon} width="50" height="50"/>
                          {follower}
                      </div>
                      </Link>
                    </div>
                  )
                })}
                <h1>Following</h1>
                {following.current.map((follower)=>{
                  console.log(follower)
                  return (
                    <div>
                      <Link to={"/profile/" + follower} className="text-decoration-none">
                      <div>
                          <img src={profileicon} width="50" height="50"/>
                          {follower}
                      </div>
                      </Link>
                    </div>
                  )
                })}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {/* <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button> */}
              </Modal.Footer>
            </Modal>
          </>
        );
      }

  async function getReviews(){
    const reviewsT = await axios(`http://localhost:4000/api/reviews/sortrecent/${params}`)
    const filteredReviews = reviewsT.data.filter((pred)=>{
        return pred.username === params
    })
    setReviews(filteredReviews)
}

  function likePost(review,liker){
    const res = LikePost(params,review.album,liker);
    console.log(res);
  }

  async function getAlbumInfo(albumname){

    var searchParameters = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
    }   
        setImage("")
        var album = await axios('https://api.spotify.com/v1/search?q=' + albumname + '&type=album&limit=1',searchParameters)
        return album.data.albums.items[0].images[0].url;
  }
  // console.log(user.user.username)
    return (
        <div>
            <NavbarComp userName={username}/>
            <div>
                <Container>
                    <div id="content">
                    <DisplayAlert status={errorDis.status} mes = {errorDis.message} type={errorDis.errorType}/>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column">
                            <img src={profileicon} width="100px" height="100px"/>
                            <h3>{params}</h3>

                        </div>
                        <div className="d-flex flex-row justify-content-end p-4" id="infoBox">
                            <div className="d-flex flex-column align-self-center align-items-center" id="userStats">
                                <h3>{likes.current.length}</h3>
                                <h3>Likes</h3>
                            </div>
                            <div className="vr"></div>
                            <div className="d-flex flex-column align-self-center align-items-center" id="userStats">
                                <h3>{reviews.length}</h3>
                                <h3>Reviews</h3>
                            </div>
                            <div className="vr"></div>
                            <div className="d-flex flex-column align-self-center align-items-center" id="userStats">
                                <h3>{followers.current.length}</h3>
                                <h3>Followers</h3>
                            </div>
                            <div className="vr"></div>
                            <div className="d-flex flex-column align-self-center align-items-center" id="userStats">
                                <h3>{following.current.length}</h3>
                                <h3>Following</h3>
                            </div>
                        </div> 
                        <div className="d-flex flex-column">
                          <ShowUsers  title= {"Users Followered and users following"}/>
                          <br/>
                          <Button className="w-100 h-25 p-3" onClick={followUnfollow}>Follow/unfollow</Button>
                        </div>
                        </div>
                        <hr/>

                        <div id="reviewContent">
                            <div>
                                <h3>Recent reviews</h3>
                                <hr/>
                            </div>
                            <Review rev = {reviews} user={user}/>
                            {/* <Button onClick={handleShow} className="btn-success"></Button> */}
                            <div id="albumRows">
                                <div className="d-flex flex-column ">
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Profile;