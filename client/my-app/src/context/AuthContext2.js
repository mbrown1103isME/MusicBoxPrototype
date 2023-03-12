import { createContext, useReducer, useState } from "react";

export const AuthContext2 = createContext()

export const authReducer2 = (state,action)=>{
        switch(action.type){
            case "LOGIN":
                if(!localStorage.getItem("user")){
                    localStorage.setItem("user",user)
                }
                return { user: action.payload }
            case "LOGOUT":
                return { user: null}
            default:
                state
        }
}

export const AuthContextProvider2 = ({children})=>{
    const [state, dispatch] = useReducer(authReducer2,{
        user : null,

    })
    console.log("AuthContext state: " + state);

    return(
        <AuthContext2.Provider value = {{...state,dispatch}}>
            { children }
        </AuthContext2.Provider>
    )
}