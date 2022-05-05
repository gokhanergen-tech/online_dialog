const dotenv=require("dotenv");
const startSocket = require("./socket/socket");
const server=require("http").createServer();
const io=require("socket.io")(server,{
   crossOriginIsolated:true,
   cors:
   {
       origin:"http://localhost:3000",
       methods:['GET','POST']
    }
})

startSocket(io);

server.listen(5005,()=>{
    console.log("server is listening now!")
})


dotenv.config();