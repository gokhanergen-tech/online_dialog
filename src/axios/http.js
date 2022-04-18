import axios from 'axios'

const resApi=axios.create({
    baseURL:process.env.REACT_APP_REST_API_IP,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
})
//This is for http requests to Api
export {}
export default resApi;
