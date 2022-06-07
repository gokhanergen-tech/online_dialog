const io= require('socket.io-client');
const { OFFICES_ACTIONS, INTERVIEW_ACTIONS } = require('../socket/socket-actions');

const socketInit=()=>{

    const options={
        'force new connection':true,
        reconnectionAttempt:'Infinity',
        timeout:10000,
        transports:['websocket'],
        withCredentials:true,
        extraHeaders:{
            "Cookie":"accessToken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlcmdlbjUxODFAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiQURNSU5fUk9MRSIsIlVTRVJfUk9MRSJdLCJpYXQiOjE2NTM3MzczOTAsImV4cCI6MTY1Mzg1ODAwMH0.mzbUnXE5mbHgXPYT-_CKEa3mfDqd3O7y3U8WjSjeTuXbv3Ijct4jf_wNHbQmJXB-8h6Yes7LqLEIe5fWKDQhIw",
            "Origin":"http://localhost:3000"
        }
    }

    return io("http://localhost:5005/room",options);

}

const client=socketInit();
client.on("HAHA",({message})=>console.log(message))

client.emit(OFFICES_ACTIONS.JOIN,{user:{
    id:"51gdfg"
},rooms:[{hashedId:"fdgdf"}]})
client.emit(OFFICES_ACTIONS.LEAVE,{rooms:[{hashedId:"fdgdf"}]})

try{
    
   
}catch(err){
    console.log("message")
}
    
