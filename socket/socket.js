const interviewsPage = require("../socket_pages/interviews_page")
const officesPage = require("../socket_pages/offices_page")
const roomPage = require("../socket_pages/room_page")
const axios=require("axios")
var cookie = require("cookie")

const isAuth=async (socket,next)=>{
  const error=new Error("Authentication Error");
  var cookies = cookie.parse(socket.handshake.headers.cookie);
  if(cookies.accessToken){
      try{
          const {data}=await axios.get("http://localhost:8090/api/auth/control",{
              headers:{
                  cookie:"accessToken="+cookies.accessToken
              },
              withCredentials:true
            })
    
          socket.userData=data;
          next();
      }catch(err){
          console.log(err.message)
          next(error)
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
          roomPage(socket,io)
      })

      io.of("offices").on('connection',(socket)=>{
        console.log(socket.userData.user.email+" has joined to offices connection")
          officesPage(socket,io)
      })

      io.of("interviews").on('connection',(socket)=>{
        console.log(socket.userData.user.email+" has joined to interviews connection")
          interviewsPage(socket,io)
      })

}


module.exports=startSocket;