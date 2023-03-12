export const LoginStart = (userCredentials) = ({
    type: "Login_Start",
});

export const LoginSuccess = (user) =>({
    type: "Login_Success",
    payload: user
});
export const Logout = (user)=>({
    type: "Logout",
    payload: null
})

export const LoginFailure = (user) =>({
    type: "Login_Failure",
    payload: error
})