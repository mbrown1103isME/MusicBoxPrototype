import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./componentsStyle.css"

// import { renderMatches } from "react-router-dom";
// import render from "react-dom"
const Comment = (props)=>{
  const [commentText,setCommentText] = useState()
  


  // console.log(props.comments)
  return(
    <div>
  {props.comments.map((comment)=>{

    // console.log(comment.username)
    // console.log(comment.userText);
    const forSplit = props.time
    const forDisplay  = forSplit.split("T")
    console.log(comment)
    return(
      <div className="container mt-5">

            <div className="row  d-flex justify-content-center">

                <div className="col-md-8">
                    <div className="card p-3 mt-2">

                        <div className="d-flex justify-content-between align-items-center">
                      <div className="user d-flex flex-row align-items-center">

                        <img src="https://i.imgur.com/ZSkeqnd.jpg" width="30" className="user-img rounded-circle mr-2"/>
                        <span><small className="font-weight-bold text-primary">{comment.username}</small><small className="font-weight-bold">{comment.userText}</small></span>
                          
                      </div>


                      <small>{forDisplay[0]}</small>

                      </div>


                      <div className="action d-flex justify-content-between mt-2 align-items-center">

                        <div className="reply px-4">
                            <small>Remove</small>
                            <span className="dots"></span>                           
                        </div>
                        <div className="icons align-items-center">
                            <i className="fa fa-check-circle-o check-icon text-primary"></i>
                            
                        </div>
                      </div> 
                    </div>
                </div>
            </div>            
        </div>
    )
  })}
  </div>
  )
}
// render(<Comment/>)
export default Comment;