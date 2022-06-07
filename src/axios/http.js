import axios from 'axios'

const restApi=axios.create({
    baseURL:process.env.REACT_APP_REST_API_IP,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
})

const login=(data)=>restApi.post("/api/login",data);
const logout=()=>restApi.get("/api/logout")
const authControl=()=>restApi.get("/api/auth/control")

const addRoom=(data)=>restApi.post("/api/room",data)
const getOwnerRoomsByRoomType=(roomType)=>restApi.get("/api/owner/rooms?roomType="+roomType)
const getUserRoomsByRoomType=(roomType)=>restApi.get("/api/user/rooms?roomType="+roomType)

//This is for http requests to Api
export {login,logout,authControl,addRoom,getOwnerRoomsByRoomType,getUserRoomsByRoomType}
