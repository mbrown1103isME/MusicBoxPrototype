import { Children, createContext, useReducer } from "react";
import AuthReducer from "./AuthReduce";
import { useState } from "react";
import { useEffect } from "react";
const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE);

    useEffect(()=>{
        const localUser = JSON.parse(localStorage.getItem("user"))
        if(localUser){
            console.log(localUser)
            dispatch({type: "Login_Success", payload: localUser})
        }
        console.log(localUser)
    },[])

    return (
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}