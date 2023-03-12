import { useContext, useEffect, useState } from "react"
import NavbarComp from "../Components/Navbar"
import { AuthContext } from "../context/AuthContext"
import profileicon from "../img/profileicon.png"
import pagesStyle from "./pagesStyle.css"
import { Button, Container } from "react-bootstrap"
import axios from "axios"

const UserInfo = (props)=>{
    const user = useContext(AuthContext)
    const [username,setUsername] = useState("")
    const [createdAt,setCreatedAt] = useState("")
    const [newUsername,setNewUsername] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [refUser,setRefUse] = useState({})

    useEffect(()=>{
        console.log(user)
        if(!localStorage.getItem("user")){
            setUsername("")
            console.log("Hello")
        }else{
            setUsername(JSON.parse(localStorage.getItem("user")).username)
            setRefUse(JSON.parse(localStorage.getItem("user")))
            const date = JSON.parse(localStorage.getItem("user")).createdAt
            const newDate = date.split("T")
            setCreatedAt(newDate)
        }
    },[])


    async function changeUsername(){
        const request = await axios.put()
        console.log(request)
    }
    async function changePasword(){
        const request = await axios.put()
        console.log(request)
    }
    async function deleteAccount(){
        const user = await axios.get()
        const request = await axios.delete()
        console.log(request)
    }

    return(
        <div>
            <NavbarComp />
            <div>
                <Container>
                    <div id="content">
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column">
                            <img src={profileicon} width="100px" height="100px"/>
                            <h3>{username}</h3>
                        </div>
                        <div className="d-flex flex-row justify-content-end p-4" id="infoBox">
                            <div className="d-flex flex-column align-self-center align-items-center" id="userStats">
                                {/* <h3>{likes.current.length}</h3> */}
                                <h3>Created: {createdAt}</h3>
                            </div>
                            <div className="vr"></div>
                            <div className="d-flex flex-column align-self-center align-items-center" id="userStats">
                                {/* <h3>{reviews.length}</h3> */}
                                <h3>Reviews</h3>
                            </div>
                            <div className="vr"></div>
                            <div className="d-flex flex-column align-self-center align-items-center" id="userStats">
                                {/* <h3>{followers.current.length}</h3> */}
                                <h3>Followers</h3>
                            </div>
                            <div className="vr"></div>
                            <div className="d-flex flex-column align-self-center align-items-center" id="userStats">
                                {/* <h3>{following.current.length}</h3> */}
                                <h3>Following</h3>
                            </div>
                        </div> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                        </svg>
                        {/* Followed by {followers.current.length} */}
                        </div>
                        <hr/>

                        <div id="reviewContent">
                            <div>
                                <h3>User info</h3>
                                <hr/>
                            </div>
                            <div>
                                Created at {createdAt}
                            </div>
                            <div>
                                Username: {username}
                            </div>
                            <div>
                                Password: {refUser.password}
                            </div>
                            <hr/>
                            <div>
                                <h3>Change Info</h3>
                                <hr/>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row">
                                        <Button>Change username</Button>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <Button>Change  password</Button>
                                    </div>
                                    <div className="d-flex flex-row">
                                        <Button>Delete account</Button>
                                    </div>
                                </div>
                                

                            </div>
                            {/* <Review rev = {reviews} user={user}/> */}
                            {/* <ShowUsers title= {"Followers"}/> */}
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
export default UserInfo