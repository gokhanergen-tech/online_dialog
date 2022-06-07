const { validateRoom } = require("../http/axiosRequest")
const {ROOM_ACTIONS} = require("../socket/socket-actions")


let socketMapToUser={}
let roomToMapMessages={}

const roomPage=(socket,io)=>{
 
    const leave=(roomId)=>{
       delete socketMapToUser[socket.id]
       io.to(roomId).emit(ROOM_ACTIONS.LEAVE,{user:socket.userData.user})
    }

    const findUser=(email)=>{
        const keys=Object.keys(socketMapToUser);
        for(var i=keys.length-1;i>=0;i--){
            if(socketMapToUser[keys[i]].user.email===email)
               return keys[i];
        }
        return false
    }

    const hasRoom=(roomId)=>{
      return socket.rooms.has(roomId)
    }

    socket.on("disconnecting",(reason)=>{
        
        if(reason==="ping timeout" || reason==="transport close"){
          socket.rooms.forEach((roomId)=>{
                socket.broadcast.to(roomId).emit(ROOM_ACTIONS.LEAVE,{user:socket.userData.user})
          })
          delete socketMapToUser[socket.id]
        }
        
    })

    socket.on(ROOM_ACTIONS.JOIN,async ({roomId})=>{
 
        try{
            if(roomId){
                const {data}=await validateRoom(roomId,socket.accessToken);
               
                const user = socket.userData.user;
                const rooms=Object.keys(socketMapToUser)
                .filter(userRoom=>socketMapToUser[userRoom].user.email===user.email).map(userRoom=>({hashedId:socketMapToUser[userRoom].room.hashedId,socket:userRoom}));
                
                if(data.isOpen && !rooms.map(room=>room.hashedId).includes(roomId)){
                    if(io.to(roomId)){
                        
                        io.to(roomId).emit(ROOM_ACTIONS.JOIN,{user})
                        const sockets=await io.in(roomId).fetchSockets();
                        sockets.forEach(socketUser=>{
                            if(socketMapToUser[socketUser.id])
                             socket.emit(ROOM_ACTIONS.JOIN,{user:socketMapToUser[socketUser.id].user})
                        })
                    }
                    const room=data.room;

                    if(room.roomTypeDto.roomType==="INTERVIEW_ROOM"){
                        if(!roomToMapMessages[roomId])
                            roomToMapMessages[roomId]=[]
                    }
                    socketMapToUser[socket.id]={user,room};
                    socket.join(roomId);
                    socket.emit(ROOM_ACTIONS.ON_JOIN,{})
                }else{
                    socket.disconnect();
                }
           } 
        }catch(err){
          leave();
          socket.disconnect();
        }
    })

    socket.on(ROOM_ACTIONS.LEAVE,({roomId})=>{
         leave(roomId)
         socket.emit(ROOM_ACTIONS.ON_LEAVE,{})  
    })

    socket.on(ROOM_ACTIONS.SEND_MESSAGE,({roomId,toUser,message})=>{
        const authUser=socket.userData;

        if(roomId){
            const currentDate=Date.now()
           
            const editedMessage={
                user:socket.userData.user,
                message:message,
                messageDate:currentDate
            };

            if(!toUser){ 
                if(hasRoom(roomId)){
                    io.to(roomId).emit(ROOM_ACTIONS.ON_MESSAGE,{messageUser:editedMessage,selectedMessages:"0"})
                }
            }else{
                const socketUser=findUser(toUser)
                if(socketUser){
                   
                    if(!authUser?.user?.userDto?.owner){
                        if(socketMapToUser[socketUser].user.userDto.owner){
                              //Send to room owner
                             
                              console.log(socketMapToUser[socketUser].user.userDto.owner)
                              io.to(socketUser).emit(ROOM_ACTIONS.ON_MESSAGE,{messageUser:editedMessage,selectedMessages:authUser.user.email})
                              socket.emit(ROOM_ACTIONS.ON_MESSAGE,{messageUser:editedMessage,selectedMessages:toUser})
                        }else{
                              //send error message
                        }
                    }else{
                        if(!socketMapToUser[socketUser].user.userDto.owner){
                                //Send to room owner
                            io.to(socketUser).emit(ROOM_ACTIONS.ON_MESSAGE,{messageUser:editedMessage,selectedMessages:authUser.user.email})
                            socket.emit(ROOM_ACTIONS.ON_MESSAGE,{messageUser:editedMessage,selectedMessages:toUser})
                        }else{
                                //send error message
                        } 
                    }
                }    
            }
        }
       

    })


    

}

module.exports=roomPage;


