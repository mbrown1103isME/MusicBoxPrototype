import axios from "axios"
const LikePost = async (user,album,liker)=>{
    const like = await axios.put(`http://localhost:4000/api/reviews//likereview/${user}/${album}`,{
        username: liker
    })
}
export default LikePost