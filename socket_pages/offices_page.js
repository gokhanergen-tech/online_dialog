
const {OFFICES_ACTIONS}=require("../socket/socket-actions")

const socketMapToUser={}
const officesPage=(socket,io)=>{
  socket.on(OFFICES_ACTIONS.JOIN,async ({user,rooms})=>{
     try{
        socketMapToUser[socket.id]=user;
        
        if(rooms && Array.isArray(rooms))
          rooms.forEach(({hashedId})=>{
              socket.join(hashedId+","+"OFFICE")
          })
          console.log("%s has joined the offices page",user.id)
     }catch(error){
        console.log(error.message)
     }
       
  })

  socket.on(OFFICES_ACTIONS.LEAVE,({rooms})=>{
    try{
       if(socketMapToUser[socket.id]){
        if(rooms && Array.isArray(rooms))
        rooms.forEach(({hashedId})=>{
            socket.leave(hashedId+","+"OFFICE")
        })
        const {id}=socketMapToUser[socket.id]
        delete socketMapToUser[socket.id];
        console.log("%s has left the offices page",id)
       }else{
        throw new Error("There is no such a user on this page!")
       }
    }catch(error){
       console.log(error.message)
    }
      
 })
}

module.exports=officesPage;