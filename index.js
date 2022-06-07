const dotenv=require("dotenv");
const startSocket = require("./socket/socket");
const server=require("http").createServer();
const io=require("socket.io")(server,{
   crossOriginIsolated:true,
   pingTimeout:5000,
   pingInterval:10000,
   cors:
    {
       origin:"http://192.168.196.58:3000",
       methods:['GET','POST'],
       credentials:true,
    },
    allowRequest: (req, callback) => {
        const noOriginHeader = req.headers.origin !== undefined
        &&req.headers.origin==="http://192.168.196.58:3000"
        //&&req.connection.remoteAddress.includes("localhost")
        callback(undefined, noOriginHeader);
      }
})
dotenv.config();
startSocket(io);

server.listen(5005,()=>{
    console.log("server is listening now!")
})




