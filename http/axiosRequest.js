const axios=require('axios')
const dotenv=require('dotenv')

dotenv.config();
const restApi=axios.create({
    baseURL:process.env.REACT_APP_REST_API_IP,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
})

const setAccessTokenToOption=(accessToken)=>({headers:{"Cookie":"accessToken="+accessToken}})

const validateRoom=(roomId,accessToken)=>restApi.get("/validate?roomId="+roomId,setAccessTokenToOption(accessToken))
const authControl=(accessToken)=>restApi.get("/auth/control",setAccessTokenToOption(accessToken))

//This is for http requests to Api
module.exports= {validateRoom,authControl}
