import  { io }  from "socket.io-client";

const options={
    'force new connection':true,
    reconnectionAttempt:'Infinity',
    timeout:10000,
    transports:['websocket'],
    withCredentials:true,
    
}

const initRoomSocket=()=>{
    return io(process.env.REACT_APP_SOCKET_IP+"/room",options)
}


export default initRoomSocket