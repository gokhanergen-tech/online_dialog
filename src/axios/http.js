import axios from 'axios'

const resApi=axios.create({
    baseURL:process.env.REACT_APP_REST_API_IP,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
})

const login=(data)=>resApi.post("/api/login",data);
//This is for http requests to Api
export {login}
export default resApi;
