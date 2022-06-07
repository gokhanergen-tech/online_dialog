var cookie = require("cookie")


const accessTokenMiddleware=(socket)=> {
    var cookies = cookie.parse(socket.handshake.headers.cookie);
    if(cookies.accessToken){
        socket.accessToken=cookies.accessToken;
    }
  
}


module.exports=accessTokenMiddleware;