const AuthReducer = (state,action) =>{
    switch(action.type){
        case "Login_Start":
            return{
                user: null,
                isFetching: true,
                error: false
            };
    case "Login_Success":
        console.log(action.payload)
        if(!(localStorage.getItem("user"))){
            localStorage.setItem("user", JSON.stringify(action.payload));
        }
        return{
            user: action.payload,
            isFetching: false,
            error: false
        };
    case "Login_Failure":
        return{
            user: null,
            isFetching: false,
            error: action.payload
        }
    case "Logout":
        localStorage.clear()
        return {
            user: null,
            isFetching: false,
            error: false
        }
     default: 
        return state
    }
}

export default AuthReducer