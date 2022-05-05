const io= require('socket.io-client')

const socketInit=()=>{

    const options={
        'force new connection':true,
        reconnectionAttempt:'Infinity',
        timeout:10000,
        transports:['websocket'],
    }

    return io("http://localhost:5005",options);

}

const client=socketInit();
console.log(4)
client.emit("HELLO",{name:"Gökhan ERGEN"})
try{
    client.on("HELLO",({message})=>{
        console.log(message)
    })
}catch(err){
    console.log("message")
}
    
