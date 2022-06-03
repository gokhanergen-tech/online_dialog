import  { useEffect, useRef }from "react";
import initRoomSocket  from "../socket/socketInit";
import { useStateWithCallback } from "./useStateWithCallback"
import cookie from 'react-cookie'
import { useNavigate } from "react-router-dom";


const useUserJoinTheSocket=(roomId,user,setLoading)=>{
    const [users,setUsers]=useStateWithCallback([]);
    const socketRef=useRef(null)
    const navigate=useNavigate()


    useEffect(()=>{
    
      /*socketRef.current=initRoomSocket(); 
    
      
      socketRef.current.on("connect_error",(err)=>{
        socketRef.current.disconnect()
        navigate("/")
      })

      socketRef.current.on("connect",(err)=>{
         setLoading(false)
      })

      socketRef.current.on("disconnect",()=>{
        navigate("/")
      })*/
      
    },[])

    useEffect(()=>{
      //socketRef.current.emit()
      setLoading(false)
    },[])

   
    return [users]

}

export {useUserJoinTheSocket}