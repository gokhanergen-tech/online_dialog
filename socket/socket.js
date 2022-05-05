const {ACTIONS}=require("./socket-actions")

const startSocket=(io)=>{
      const socketToMapToUser={}

      io.on('connection',(socket)=>{
          console.log(socket.id)

          socket.on("HELLO",({name})=>{
              console.log(name);
          })
      })
}


module.exports=startSocket;