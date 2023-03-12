import { AuthContext2 } from "./AuthContext2";
import { useContext } from "react";

const useAuthContext = ()=>{
    const context = useContext(AuthContext2)

    if(!context){
      throw Error("Context must be used inside user hook")
    }

    return context;
    
}
export default  useAuthContext;