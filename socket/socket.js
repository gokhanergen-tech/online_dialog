const interviewsPage = require("../socket_pages/interviews_page")
const officesPage = require("../socket_pages/offices_page")
const roomPage = require("../socket_pages/room_page")
const axios=require("axios")
const { authControl } = require("../http/axiosRequest")
const accessTokenMiddleware = require("../middlewares/authMiddleware")

const isAuth=async (socket,next)=>{
  const error=new Error("Authentication Error");
  accessTokenMiddleware(socket)
  if(socket.accessToken){
      try{
          const {data}=await authControl(socket.accessToken);
          socket.userData=data;
          next();
      }catch(err){
          next(err)
      }
  }
  else{
      next(error)
  }
};

const startSocket=(io)=>{
      io.of("room").use(isAuth)
      io.of("offices").use(isAuth)
      io.of("interviews").use(isAuth)

      io.of("room").on('connection',(socket)=>{
        console.log(socket.userData.user.email+" has joined to room connection")
          roomPage(socket,io.of("room"))
      })

      io.of("offices").on('connection',(socket)=>{
        console.log(socket.userData.user.email+" has joined to offices connection")
          officesPage(socket,io.of("offices"))
      })

      io.of("interviews").on('connection',(socket)=>{
        console.log(socket.userData.user.email+" has joined to interviews connection")
          interviewsPage(socket,io.of("interviews"))
      })

}


module.exports=startSocket;