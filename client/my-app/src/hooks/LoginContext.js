import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
export const LoginContext = ()=>{
    const context = useContext(AuthContext)
    if(context.user===null){
        console.log("User is null")
    }else{
        console.log(context)
        return context;
    }
}
