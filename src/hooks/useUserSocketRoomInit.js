import  { useCallback, useEffect, useRef }from "react";
import initRoomSocket  from "../socket/socketInit";
import { useStateWithCallback } from "./useStateWithCallback"
import { useNavigate } from "react-router-dom";
import { ROOM_ACTIONS } from "../socket/sockets/roomSocketActions";


const useUserJoinTheSocket=(roomId,user,setLoading)=>{
    const [users,setUsers]=useStateWithCallback([]);

    const socketRef=useRef(null)
    const usersRef=useRef([])

    const navigate=useNavigate()

    const addUser=useCallback((user,callback)=>{
        if(!usersRef.current.find(roomUser=>roomUser.email===user.email)){
          setUsers([user,...usersRef.current],callback)
        }

    },[users,setUsers])

    const removeUser=useCallback((user)=>{
      if(user){
        setUsers(usersRef.current.filter(userRoom=>userRoom.email!==user.email))
      }
    },[users,setUsers])

    const closeAllEvents=()=>{
      socketRef.current.off(ROOM_ACTIONS.JOIN)
      socketRef.current.off(ROOM_ACTIONS.LEAVE)
      socketRef.current.off(ROOM_ACTIONS.ON_JOIN)
      socketRef.current.off(ROOM_ACTIONS.ON_LEAVE)
    }

    window.onbeforeunload=(e)=>{
        closeAllEvents();
        socketRef.current.emit(ROOM_ACTIONS.LEAVE,{})
    }

    useEffect(()=>{
         usersRef.current=users;
    },[users])


    useEffect(()=>{
      socketRef.current=initRoomSocket(); 
    },[])

    useEffect(()=>{
      
        socketRef.current.on("connect_error",(err)=>{
         socketRef.current.disconnect();
         console.log("Socket bağlantı hatası oluştu!")
        })

        socketRef.current.on("connect",(err)=>{
         socketRef.current.emit(ROOM_ACTIONS.JOIN,{roomId})

        socketRef.current.on("disconnect",(reason)=>{
          closeAllEvents();
          socketRef.current=null;
          navigate("/")
        })

        socketRef.current.on(ROOM_ACTIONS.ON_JOIN,()=>{
           setLoading(false);
        })
  
        socketRef.current.on(ROOM_ACTIONS.ON_LEAVE,()=>{
          socketRef.current.disconnect();
        })
  
  
        socketRef.current.on(ROOM_ACTIONS.JOIN,({user})=>{
           if(user){
             addUser({...user},()=>{
                  
             })
           }
        })
  
        socketRef.current.on(ROOM_ACTIONS.LEAVE,({user})=>{
          removeUser(user)
       })
  
      })

      

      return ()=>{
        socketRef.current?.emit(ROOM_ACTIONS.LEAVE,{})
      }
    },[])


 
    return [users,socketRef.current]

}

export {useUserJoinTheSocket}