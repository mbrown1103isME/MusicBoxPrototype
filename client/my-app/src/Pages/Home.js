import { useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import NavbarComp from "../Components/Navbar";
import { useState } from "react";
import Review from "../Components/Review";
import axios from "axios";
import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import profileicon from "../img/profileicon.png"
const Home = ()=>{

  const [topAlbums,setTopAlbums] = useState([])
  const [users, setUsers] = useState([])

  useEffect(()=>{
    var albumsS = []
    async function getReviews(){
      console.log("JDJFJDFDJFJDFJFJ")
      const albs = await axios.get("http://localhost:4000/api/reviews/allreviewedalbums")
      await setTopAlbums(albs.data)
      const usersS = await axios.get("http://localhost:4000/api/users/getusersrecent/:dummy")
      console.log(usersS)
      setUsers(usersS.data)
    }

    // async function getAlbumAverage(albumname){
    //   var x;
    //   console.log(albumname)
    //   x = await axios.get(`http://localhost:4000/api/reviews/getreviews/${albumname}`)
    //   const y = calculateAlbumAverage(x.data)
    //   console.log(y);
    //   return y
    // }

    

    // async function wrapper(){
    //   await getReviews()

    //   // setTopAlbums(albumsS)
    //   const n = await sortReviews(topAlbums)
    //   setTopAlbums(n)

    // }
    // wrapper()
    getReviews()
    // sortReviews(top)
  // getReviews()
  },[])

  function getAlbum(){
    console.log(topAlbums);
  }


  async function getAlbumAverage(albumname){
    var x;
    console.log(albumname)
    x = await axios.get(`http://localhost:4000/api/reviews/getreviews/${albumname}`)
    const y = calculateAlbumAverage(x.data)
    console.log(y);
    return y
  }

  function sortReviews(review){
    var arr = []
    const sorted = review.sort((a,b)=>{
      return a.avgScore - b.avgScore
  })
    return sorted
  }
  function calculateAlbumAverage(reviews){
    // console.log(reviews)
    var reviewscore = 0;
    // console.log("REbiews")
    // console.log(reviews)
    const numReviews = reviews.length
    reviews.forEach(review => {
      reviewscore += review.rating
    });
    // console.log(reviewscore)
    // console.log(numReviews)
    const reviewSc = reviewscore/numReviews
    return reviewSc;
  }

  

  return(
    <div>
      <NavbarComp/>
      <div id="content">
        <div className='d-flex flex-row justify-content-center'>
          <h3>Welcome to MusicBox anonymous user! Hopefully you won't stay anonymous!</h3>
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

export default Home;