import { useCallback, useEffect, useRef } from "react";
import initRoomSocket from "../socket/socketInit";
import { useStateWithCallback } from "./useStateWithCallback"
import { useNavigate } from "react-router-dom";
import { ROOM_ACTIONS } from "../socket/sockets/roomSocketActions";
import freeice from 'freeice'


const useUserJoinTheSocket = (roomId, userLogin, setLoading, setRoom, setCameraOpen, setScreenShareOpen) => {
  const [users, setUsers] = useStateWithCallback([]);

  const socketRef = useRef(null)
  const userCamera = useRef(null);
  const baseVideoRef = useRef(null);
  const canvasObject = useRef(null);
  const userScreenShare = useRef(null);

  const usersRef = useRef([])
  const connections = useRef({})
  const videoObjects = useRef({})
  const mediaDevices = useRef([])




  const navigate = useNavigate()

  const addUser = useCallback((user, callback) => {
    if (!usersRef.current.find(roomUser => roomUser.email === user.email)) {
      usersRef.current.unshift({ video: false, ...user })
      setUsers([...usersRef.current], callback)

    }

  }, [setUsers])

  const removeUser = useCallback((user) => {
    if (user) {
      usersRef.current = usersRef.current.filter(userRoom => userRoom.email !== user.email)
      setUsers([...usersRef.current])
    }
  }, [setUsers])

  const updateUser = useCallback((email, state) => {
    usersRef.current = (usersRef.current.map(user => {
      if (user.email === email)
        return {
          ...user, ...state
        }
      return user;
    }))
    setUsers([...usersRef.current])
  }, [users, setUsers])

  const sendStreamToAllUser = useCallback((stream,type) => {
    Object.keys(connections.current).forEach(async (email) => {

      if (email !== userLogin.email) {
        const connection = connections.current[email];
        const senders = await connection.getSenders();
        
        let videoSender;
        if(type==="SCREEN"){
          videoSender=senders.find(sender => sender?.track === userScreenShare.current.getVideoTracks()[0]);
        }else if(type==="VIDEO"){
          videoSender=senders.find(sender => sender?.track === userCamera.current.getVideoTracks()[0]);
        }else if(type==="CANVAS"){
          videoSender=senders.find(sender => sender?.track instanceof 
          CanvasCaptureMediaStreamTrack);
        }
        if (videoSender) {
          connection.removeTrack(videoSender)
        }
        connection.addTrack(stream.getVideoTracks()[0], stream)
        const offer = await connection.createOffer();
        connection.setLocalDescription(offer);

        socketRef.current.emit(ROOM_ACTIONS.SEND_OFFER, {
          offer, email
        })
      }
    })
  }, [])

  const sendOffer=useCallback(async (email,connection)=>{
    const offer = await connection.createOffer();
    connection.setLocalDescription(offer);

    socketRef.current.emit(ROOM_ACTIONS.SEND_OFFER, {
      offer, email: email
    })
  },[])


  const closeAllEvents = () => {
    socketRef.current.off(ROOM_ACTIONS.JOIN)
    socketRef.current.off(ROOM_ACTIONS.LEAVE)
    socketRef.current.off(ROOM_ACTIONS.ON_JOIN)
    socketRef.current.off(ROOM_ACTIONS.ON_LEAVE)
    socketRef.current.off(ROOM_ACTIONS.SESSION_DESCRIPTION)
    socketRef.current.off(ROOM_ACTIONS.ICE_CANDIDATE)
    socketRef.current.off(ROOM_ACTIONS.ACCEPT_VIDEO_STREAM)
  }

  window.onbeforeunload = (e) => {
    closeAllEvents();
    socketRef.current.emit(ROOM_ACTIONS.LEAVE, {})
  }

  useEffect(() => {
    socketRef.current = initRoomSocket();
  }, [])

  useEffect(() => {

    socketRef.current.on("connect", async (err) => {
      try {
        mediaDevices.current = await navigator.mediaDevices.enumerateDevices();
      } catch (err) {
        console.log(err)
      }


      socketRef.current.emit(ROOM_ACTIONS.JOIN, { roomId })

      socketRef.current.on("connect_error", (err) => {
        socketRef.current.disconnect();
        console.log("Socket bağlantı hatası oluştu!")
      })

      socketRef.current.on("disconnect", (reason) => {
        closeAllEvents();

        navigate("/")
      })

      socketRef.current.on(ROOM_ACTIONS.SESSION_DESCRIPTION, async ({ email, offer }) => {
        const connection = connections.current[email];
        await connection.setRemoteDescription(
          new RTCSessionDescription(offer)
        );


        if (offer.type === "offer") {
          const answer = await connection.createAnswer();
          await connection.setLocalDescription(answer);

          socketRef.current.emit(ROOM_ACTIONS.SEND_OFFER, {
            email, offer: answer
          })
        }

      })


      socketRef.current.on(ROOM_ACTIONS.ICE_CANDIDATE, async ({ email, icecandidate }) => {
        const connection = connections.current[email];
        icecandidate && await connection.addIceCandidate(new RTCIceCandidate(icecandidate))
      })

      socketRef.current.on(ROOM_ACTIONS.ON_JOIN, ({ room }) => {
        document.title = room.title;
        setRoom(room)
        setLoading(false);
      })

      socketRef.current.on(ROOM_ACTIONS.ON_LEAVE, () => {
        socketRef.current.disconnect();
      })


      socketRef.current.on(ROOM_ACTIONS.JOIN, async ({ user }) => {

        const connection = new RTCPeerConnection({
          iceServers: freeice()
        })

        connections.current[user.email] = connection;

        connection.onicecandidate = (e) => {
          socketRef.current.emit(ROOM_ACTIONS.RELAY_ICE, {
            icecandidate: e.candidate, email: user.email
          })
        }

        if (user) {
          addUser({ ...user, video: false }, () => {

          })
        }

        if (userCamera.current && userCamera.current.getVideoTracks()[0].readyState === "live") {
          connection.addTrack(userCamera.current.getVideoTracks()[0], userCamera.current)
          sendOffer(user.email,connection)
        }

        if (userScreenShare.current && userScreenShare.current.getVideoTracks()[0].readyState === "live") {
          connection.addTrack(userScreenShare.current.getVideoTracks()[0], userScreenShare.current)
          sendOffer(user.email,connection)
        }

        const setStreamToVideoObjects = (stream) => {
          if (videoObjects.current[user.email]) {
            if (videoObjects.current[user.email])
              videoObjects.current[user.email].srcObject = stream;
            if (baseVideoRef.current)
              baseVideoRef.current.srcObject = stream;
          } else {
            const interval = setInterval(() => {
              if (videoObjects.current[user.email]) {
                if (videoObjects.current[user.email])
                  videoObjects.current[user.email].srcObject = stream;
                if (baseVideoRef.current)
                  baseVideoRef.current.srcObject = stream;
                clearInterval(interval)
              }
            }, 2000)
          }
        }


        connection.ontrack = ({
          streams: [remoteStream]
        }) => {
          console.log(remoteStream.getVideoTracks())
          if (remoteStream.getVideoTracks().length > 0) {

            setStreamToVideoObjects(remoteStream);
            remoteStream.getVideoTracks()[0].onmute = () => {
              updateUser(user.email, { video: false })
              baseVideoRef.current?.load()
            }
            remoteStream.getVideoTracks()[0].onunmute = () => {
              updateUser(user.email, { video: true })
            }
          }
        }

      })

      socketRef.current.on(ROOM_ACTIONS.LEAVE, ({ user }) => {
        removeUser(user)
        connections.current[user.email] && (delete connections.current[user.email])
      })

    })

    socketRef.current.on(ROOM_ACTIONS.ACCEPT_VIDEO_STREAM, async () => {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: mediaDevices.current[2].deviceId,
          height: {
            max: 1920,
            ideal: 768
          }
        }
      })

      updateUser(userLogin.email, { video: true })

      videoObjects.current[userLogin.email].srcObject = stream;


      setCameraOpen(true)
      sendStreamToAllUser(stream,"VIDEO");
      userCamera.current=stream;
    })


    socketRef.current.on(ROOM_ACTIONS.ACCEPT_SCREEN_STREAM, async () => {

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          deviceId: mediaDevices.current[2].deviceId,
          height: {
            max: 1920,
            ideal: 768
          }
        }
      })

      setScreenShareOpen(true)
      sendStreamToAllUser(stream,"SCREEN");
      userScreenShare.current=stream;
    })

    return () => {
      closeCamera();
      closeScreenShare();
      socketRef.current?.emit(ROOM_ACTIONS.LEAVE, {})
    }
  }, [])

  const addVideoObject = useCallback((instance, email) => {
    videoObjects.current[email] = instance;
  }, [])

  const setBaseVideoObject = useCallback((instance) => {
    baseVideoRef.current = instance;
  }, [])

  const setCanvasObject = useCallback((instance) => {
    canvasObject.current = instance;
  }, [])

  const closeCamera = useCallback(() => {
    if (userCamera.current && userCamera.current.getVideoTracks()[0].readyState === "live") {
      userCamera.current.getTracks()
        .forEach(track => track.stop())
      updateUser(userLogin.email, { video: false })
      setCameraOpen(false)
    }
  }, [])


  const closeScreenShare = useCallback(() => {
    if (userScreenShare.current && userScreenShare.current.getVideoTracks()[0].readyState === "live") {
      userScreenShare.current.getTracks()
        .forEach(track => track.stop())
      setScreenShareOpen(false)
    }
  }, [])

  return [users, socketRef.current, addVideoObject, closeCamera, setBaseVideoObject, setCanvasObject, closeScreenShare]

}

export { useUserJoinTheSocket }