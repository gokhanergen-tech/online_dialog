const { INTERVIEW_ACTIONS } = require("../socket/socket-actions");

const socketMapToUser={}

const interviewsPage=(socket)=>{
    socket.on(INTERVIEW_ACTIONS.JOIN,({user,rooms})=>{
        try{
           socketMapToUser[socket.id]=user;
           
           if(rooms && Array.isArray(rooms))
             rooms.forEach(({hashedId})=>{
                 socket.join(hashedId+","+"INTERVIEW")
             })
           console.log("%s has joined the interviews page",user.id)
        }catch(error){
           console.log(error.message)
        }
          
     })

     socket.on(INTERVIEW_ACTIONS.LEAVE,({rooms})=>{
        try{
           if(socketMapToUser[socket.id]){
            if(rooms && Array.isArray(rooms))
            rooms.forEach(({hashedId})=>{
                socket.leave(hashedId+","+"INTERVIEW")
            })
            const {id}=socketMapToUser[socket.id]
            delete socketMapToUser[socket.id];
            console.log("%s has left the interviews page",id)
           }else{
            throw new Error("There is no such a user on this page!")
           }
        }catch(error){
           console.log(error.message)
        }
          
     })
}

module.exports=interviewsPage;