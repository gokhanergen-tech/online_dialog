const { validateRoom } = require("../http/axiosRequest")
const { ROOM_ACTIONS } = require("../socket/socket-actions")


let socketMapToUser = {}
let roomToMapMessages = {}

const roomPage = (socket, io) => {

    const leave = (roomId) => {
        io.to(roomId).emit(ROOM_ACTIONS.LEAVE, { user: socket.userData.user })
    }

    const initPermissions = () => {
        if (socket.userData.user.userDto.owner) {
            socket.isScreenShare = true;
            socket.isCanvasShare=true;
        } else {
            socket.isScreenShare = false;
            socket.isCanvasShare=false;
        }

        socket.isCameraShare = true;
        socket.isMicrophoneShare = true;
    }

    const findUser = async (email) => {
        const sockets = await io.in(socket.roomId).fetchSockets();
        for (var i = sockets.length - 1; i >= 0; i--) {
            if (sockets[i].userData.user.email === email)
                return sockets[i];
        }
        return false
    }

    const hasRoom = (roomId) => {
        return socket.rooms.has(roomId)
    }

    socket.on("disconnecting", (reason) => {
        if (reason === "ping timeout" || reason === "transport close") {
            socket.rooms.forEach((roomId) => {
                socket.broadcast.to(roomId).emit(ROOM_ACTIONS.LEAVE, { user: socket.userData.user })
            })
        }
    })

    socket.on(ROOM_ACTIONS.JOIN, async ({ roomId }) => {

        try {
            if (roomId) {
                const { data } = await validateRoom(roomId, socket.accessToken);

                const sockets = await io.in(roomId).fetchSockets();
                const user = socket.userData.user;
                const rooms = sockets
                    .filter(userRoom => userRoom.userData.user.email === user.email).map(userRoom => userRoom.roomId);

                if (data.isOpen && !rooms.includes(roomId)) {
                    const room = data.room;

                    if (io.to(roomId)) {
                        initPermissions();
                        socket.roomId = roomId;
                        socket.roomType = room.roomTypeDto.roomType;
                        socket.emit(ROOM_ACTIONS.JOIN, { user })
                        sockets.forEach(socketUser => {
                            socket.emit(ROOM_ACTIONS.JOIN, { user: socketUser.userData.user })
                        })
                        socket.emit(ROOM_ACTIONS.ON_JOIN, { room })

                        io.to(roomId).emit(ROOM_ACTIONS.JOIN, { user })

                    }
            
                    if (room.roomTypeDto.roomType === "INTERVIEW_ROOM") {
                        if (!roomToMapMessages[roomId])
                            roomToMapMessages[roomId] = []
                    }
                    socket.join(roomId);
                } else {
                    socket.disconnect();
                }
            }
        } catch (err) {
            leave();
            socket.disconnect();
        }
    })

    socket.on(ROOM_ACTIONS.LEAVE, () => {
        leave(socket.roomId)
        socket.emit(ROOM_ACTIONS.ON_LEAVE, {})
    })

    socket.on(ROOM_ACTIONS.SEND_MESSAGE, async ({ toUser, message }) => {
        const authUser = socket.userData;
        if (socket.roomId) {
            const roomId = socket.roomId;
            const currentDate = Date.now()
            console.log(toUser)
            const editedMessage = {
                user: authUser.user,
                message: message,
                messageDate: currentDate
            };

            if (!toUser) {
                io.to(roomId).emit(ROOM_ACTIONS.ON_MESSAGE, { messageUser: editedMessage, selectedMessages: "0" })
            } else {
                const socketUser = await findUser(toUser)
                if (socketUser) {

                    if (!authUser?.user?.userDto?.owner) {
                        if (socketUser.userData.user.userDto.owner) {
                            //Send to room owner

                            console.log(socketUser.userData.user.userDto.owner)
                            socketUser.emit(ROOM_ACTIONS.ON_MESSAGE, { messageUser: editedMessage, selectedMessages: authUser.user.email })
                            socket.emit(ROOM_ACTIONS.ON_MESSAGE, { messageUser: editedMessage, selectedMessages: toUser })
                        } else {
                            //send error message
                        }
                    } else {
                        socketUser.emit(ROOM_ACTIONS.ON_MESSAGE, { messageUser: editedMessage, selectedMessages: authUser.user.email })
                        socket.emit(ROOM_ACTIONS.ON_MESSAGE, { messageUser: editedMessage, selectedMessages: toUser })
                    }
                }
            }
        }


    })

    socket.on(ROOM_ACTIONS.RELAY_ICE, async ({ email, icecandidate }) => {
        const socketUser = await findUser(email)
        if (socketUser)
            socketUser.emit(ROOM_ACTIONS.ICE_CANDIDATE, {
                icecandidate, email: socket.userData.user.email
            })
    })

    socket.on(ROOM_ACTIONS.SEND_OFFER, async ({ email, offer }) => {
        const socketUser = await findUser(email)
        if (socketUser)
            socketUser.emit(ROOM_ACTIONS.SESSION_DESCRIPTION, {
                offer, email: socket.userData.user.email
            })
    })

    socket.on(ROOM_ACTIONS.PERMISSON_CONTROL, ({ type }) => {
        switch (type) {
            case "VIDEO":
                if (socket.isCameraShare) {
                    socket.emit(ROOM_ACTIONS.ACCEPT_VIDEO_STREAM)
                }
                break;
            case "SCREEN":
                if (socket.isScreenShare) {
                    socket.emit(ROOM_ACTIONS.ACCEPT_SCREEN_STREAM);
                }
                break;
            case "MICROPHONE":
                if (socket.isMicrophoneShare) {
                    socket.emit(ROOM_ACTIONS.ACCEPT_MICROPHONE_STREAM);
                }
                break;
            case "CANVAS":
                if(socket.isCanvasShare){
                    socket.emit(ROOM_ACTIONS.ACCEPT_CANVAS_STREAM);
                }
                break
        }
    })
}

module.exports = roomPage;


