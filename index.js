const dotenv = require("dotenv");
const startSocket = require("./socket/socket");
const server = require("http").createServer();
const { Server } = require("socket.io")
const io = new Server(server, {
    crossOriginIsolated: true,
    pingTimeout: 5000,
    pingInterval: 10000,
    cors:
    {
        origin: ["https://admin.socket.io", process.env.FRONTEND_IP],
        methods: ['GET', 'POST'],
        credentials: true,
    },
    allowRequest: (req, callback) => {
        const noOriginHeader = req.headers.origin !== undefined
            && req.headers.origin === process.env.FRONTEND_IP
        //&&req.connection.remoteAddress.includes("localhost")
        callback(undefined, noOriginHeader);
    }
})
const { instrument } = require("@socket.io/admin-ui")




dotenv.config();
startSocket(io);

instrument(io, {
    auth: false,
    namespaceName:"room"
}
);

server.listen(5005, () => {
    console.log("server is listening now!")
})




