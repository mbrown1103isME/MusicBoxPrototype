import axios from "axios";

export const loginCall = async (user,dispatch)=>{
    try{
        dispatch({type: "Login_Start"});
        const res = await axios.post("http://localhost:4000/api/auth/login",user)
        .catch(err=>console.log(err))
        dispatch({type: "Login_Success", payload: res.data} )
    }catch(err){
        console.log(err)
        dispatch({type: "Login_Failure" , payload: err})
    }
}