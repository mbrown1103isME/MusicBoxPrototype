import NavbarComp from "../Components/Navbar";
import { Container } from "react-bootstrap";
import profileicon from "../img/profileicon.png"
import './pagesStyle.css'
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from '@mui/material/Rating';
import Button from "react-bootstrap/Button";
import Review from "../Components/Review";
import { AuthContext } from "../context/AuthContext";
import { get } from "mongoose";
import DisplayAlert from "../Components/DisplayAlert";
import { Modal } from "react-bootstrap";

const AlbumPage = (props) =>{
    const [accessToken, setAccessToken] = useState("");
    const [album, setAlbum] = useState("");
    const [albumImage, setAlbumImage] = useState("");
    const [albumName,setAlbumName] = useState();
    const albumname = useParams().albumname;
    const [userrating, setUserrating] = useState(0);
    const [reviewText,setReviewText] = useState();
    const [reviews,setReviews] = useState([]);
    const par = useParams()
   
    // const [user,setUser] = useState("test1103")
    const user = useContext(AuthContext)
    const [error,setError] = useState({
        status: "none",
        errorType: "",
        message: ""
      });

    useEffect(()=>{

        async function getAccess(){
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
            .then(data => setAccessToken(data.access_token))
            .catch(err => {
                console.log(err)
            });
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
            console.log("Got Access");
            setAccessToken(data.access_token);
            console.log(data.access_token)
            return data.access_token
        })
        .then((data)=>{
            console.log("First")
            const info = getAlbumInfo(data)
            
        })
        .then(()=>{
            // console.log("second")
        })
          .catch(err => {
            console.log(err)
          });
                      
        }

         
        async function getAlbumInfo(creds){
            
            var searchParameters = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + creds
                }
            }   

                const toSt = 'https://api.spotify.com/v1/search?q=' + par.albumname + '&type=album&limit=1'
                console.log(toSt);

                var album = await axios(`https://api.spotify.com/v1/search?q=${par.albumname}&type=album&limit=1`,searchParameters)
                .then((alb=>{
                    console.log(alb.data.albums.items[0])
                    setAlbumImage(alb.data.albums.items[0].images[0].url)
                    setAlbum(alb.data.albums.items[0]);
                    setAlbumName(alb.data.albums.items[0].artists[0].name);
                    return 
                })).catch((err)=>{
                    console.log(err);
                    // console.log(err);
                })
          }

          async function callFun(){
            await getAccess();
          }
 
        callFun();

    },[])

    useEffect(()=>{
        async function getReviews(){
            reviews.length = 0;
            const reviewss = await axios.get(`http://localhost:4000/api/reviews/getreviews/${album.name}`)
            console.log(album)
            console.log(reviewss)
            const filter = reviewss.data.filter((review)=>{
                return review.album ===album.name
            })
            console.log(filter);
            setReviews(filter);
        }
        getReviews()

    },[album])

    async function postReview(){
        try{
            const reviewObj = {
                album: album.name,
                username: user.user.username,
                albumObj: album,
                rating: userrating,
                reviewText: reviewText
            }
        const reviewPost = await axios.post("http://localhost:4000/api/reviews/reviewalbum",reviewObj)
        console.log(reviewPost);
        setError({
            status: "success",
            errorType: "Success!",
            message: "Review successfully posted!"
          })
          
          reviews.push(reviewPost.data);
    }catch(err){
        console.log(err);
        setError({
            status: "danger",
            errorType: "",
            message: "Something went wrong!"
          })
    }
    }


    const handleRating = (e)=>{
        setUserrating(e.target.value)
    }

    const handleReviewText = (e)=>{
        setReviewText(e.target.value);
    }


    

    return(
        <div>
            <NavbarComp/>
                <div>
                    <Container>
                        <div id="content">
                        <DisplayAlert status = {error.status} mes = {error.message} type={error.errorType}/>

                        <div className="d-flex flex-row">
                           <div className="d-flex flex-column">
                                <img src={albumImage} width="300px" height="300px"/>
                                <h3>{album.name}</h3>
                                <h3>by {albumName}</h3>
                                <h3></h3>
                            </div>
                            <div className="container d-flex flex-column border  border-dark align-items-center" id="RatingBox">
                                <h3>What did you think?</h3>
                                <hr/>
                                <Rating className="" name="half-rating" defaultValue={0} precision={0.5} onChange={handleRating}/>
                                <hr/>
                                <textarea rows = "6" onChange={handleReviewText}></textarea>
                                <hr/>
                                <Button className="btn-success h-2" onClick={postReview}>Submit</Button>
                            </div>
                            
                            <div className="d-flex flex-row justify-content-end p-4" id="infoBox">
                            </div>
                            </div>
                            <hr/>
                            <div id="mainContent">
                            <h3>Recent reviews</h3>
                                <hr/>
                                <div id="albumRows">
                                 
                                </div>
                                <div id="mainContent">
                                <Review rev = {reviews} user={user}/>

                                    {/* {reviews.map((review)=>{
                                        return(
                                            <div>
                                                <div id="reviewStack" >
                                                    <div className="d-flex flex-row" >
                                                        <img src = {review.albumObj.images[0].url} height="200px" width="200px"/>
                                                        <div className="d-flex flex-column border" id="boxRev" >
                                                        <h5>Reviewed by {review.username}</h5>
                                                        <h5>{review.reviewText}</h5>
                                                        <Rating name="read-only" value={review.rating} readOnly />
                                                    </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                            </div>
                                        )
                                    })} */}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
}

export default AlbumPage;