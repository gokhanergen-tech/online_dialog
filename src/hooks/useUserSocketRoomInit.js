import { useCallback, useEffect, useRef } from "react";
import initRoomSocket from "../socket/socketInit";
import { useStateWithCallback } from "./useStateWithCallback"
import { useNavigate } from "react-router-dom";
import { ROOM_ACTIONS } from "../socket/sockets/roomSocketActions";
import freeice from 'freeice'


const useUserJoinTheSocket = (roomId, userLogin, setLoading, setRoom, setCameraOpen, setScreenShareOpen, setMicrophoneOpen, setCanvasActive,isAudioOpenAccept) => {
  const [users, setUsers] = useStateWithCallback([]);

  const beforeUnLoad = useRef((e) => {
    closeAllShare();
    socketRef.current.emit(ROOM_ACTIONS.LEAVE, {})
  })

  const socketRef = useRef(null)
  const baseVideoRef = useRef(null);
  const canvasObject = useRef(null);
  const userCamera = useRef(null);
  const userScreenShare = useRef(null);
  const userMicrophone = useRef(null);
  const userCanvas = useRef(null);
  const audioAccept=useRef(false)
  const sendedStream=useRef(null)

  const usersRef = useRef([])
  const connections = useRef({})
  const videoObjects = useRef({})
  const mediaDevices = useRef([])
  const connectionsChannels = useRef({})
  const userAudios = useRef({})

  const navigate = useNavigate()

  const addUser = useCallback((user, callback) => {
    if (!usersRef.current.find(roomUser => roomUser.email === user.email)) {
      if (user.email === userLogin.email)
        usersRef.current.unshift({ video: false, isMicrophoneOpen: false, ...user })
      else
        usersRef.current.push({ video: false, isMicrophoneOpen: false, ...user })
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

  const removeSenderTrack = useCallback(async (type, connection) => {
    const senders = await connection.getSenders();

    let sender;
    if (type === "SCREEN") {
      sender = senders.find(sender => sender?.track?.kind === "video");
    } else if (type === "VIDEO") {
      sender = senders.find(sender => sender?.track?.kind === "video");
    } else if (type === "CANVAS") {
      sender = senders.find(sender => sender?.track?.canvas);
    } else if (type === "MICROPHONE") {
      sender = senders.find(sender => sender?.track?.kind === "audio");
    }

    if (sender) {
      connection.removeTrack(sender)
    }
  }, [])

  const sendStreamToAllUser = useCallback((stream, type) => {
    Object.keys(connections.current).forEach(async (email) => {

      if (email !== userLogin.email) {
        const connection = connections.current[email];
        await removeSenderTrack(type, connection)
        stream.getTracks().forEach(track => {
          connection.addTrack(track, stream)
        })
        sendOffer(email, connection)
      }
    })
  }, [])

  const sendOffer = useCallback(async (email, connection) => {

    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);

    socketRef.current.emit(ROOM_ACTIONS.SEND_OFFER, {
      offer, email: email
    })

  }, [])

  const muteVideoFromAllUsers = useCallback((email) => {
    Object.keys(connectionsChannels.current).forEach(email => {
      if (email !== userLogin.email)
        connectionsChannels.current[email].send(JSON.stringify({ type: "VIDEO_MUTE" }))
    })
  }, [])


  const closeAllEvents = () => {
    socketRef.current.off(ROOM_ACTIONS.JOIN)
    socketRef.current.off(ROOM_ACTIONS.LEAVE)
    socketRef.current.off(ROOM_ACTIONS.ON_JOIN)
    socketRef.current.off(ROOM_ACTIONS.ON_LEAVE)
    socketRef.current.off(ROOM_ACTIONS.SESSION_DESCRIPTION)
    socketRef.current.off(ROOM_ACTIONS.ICE_CANDIDATE)
    socketRef.current.off(ROOM_ACTIONS.ACCEPT_VIDEO_STREAM)
    socketRef.current.off(ROOM_ACTIONS.ACCEPT_CANVAS_STREAM)
    socketRef.current.off(ROOM_ACTIONS.ACCEPT_SCREEN_STREAM)
    socketRef.current.off(ROOM_ACTIONS.ACCEPT_MICROPHONE_STREAM)
  }

  useEffect(()=>{
   audioAccept.current=isAudioOpenAccept;
  },[isAudioOpenAccept])


  useEffect(() => {
    socketRef.current = initRoomSocket();
    window.addEventListener("beforeunload", beforeUnLoad.current)


    return () => {
      window.removeEventListener("beforeunload", beforeUnLoad.current)
    }

  }, [])

  useEffect(() => {

    socketRef.current.on("connect", async (err) => {
      try {
        mediaDevices.current = await navigator.mediaDevices.enumerateDevices();
      } catch (err) {
        console.log(err)
      }

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

        connectionsChannels.current[user.email] = connection.createDataChannel("channel")
        connection.ondatachannel = (e) => {
          e.channel.onmessage = (data) => {
            const dataJSON = JSON.parse(data.data)
            if (dataJSON.type === "MICROPHONE_CLOSE")
              updateUser(user.email, { isMicrophoneOpen: false })
            else if (dataJSON.type === "VIDEO_MUTE") {
              if (baseVideoRef.current) {
                baseVideoRef.current.load();
                baseVideoRef.current.srcObject = null;
              }
              videoObjects.current[user.email]?.load()
              videoObjects.current[user.email].srcObject = null;
              updateUser(user.email, { video: false })
            }
          }
        }

        if (user) {
          addUser({ ...user, video: false }, () => {

          })
        }

        const setStreamToVideoObjects = async (stream) => {
          const track = stream.getTracks()[0]
          const kind = track.kind
          let videoUserVideoObject = videoObjects.current[user.email];
          if (videoUserVideoObject) {
            if (!videoUserVideoObject.srcObject) {
              videoUserVideoObject.srcObject = stream
            } else {
              const hasTrack = videoUserVideoObject.srcObject.getTracks().find(track => track.kind === kind)
              if (hasTrack) {
                videoUserVideoObject.srcObject.removeTrack(hasTrack);
              }
              videoUserVideoObject.srcObject.addTrack(track);
            }
            if (baseVideoRef.current && kind === "video")
              baseVideoRef.current.srcObject = stream;
          } else {

            const interval = setInterval(async () => {
              videoUserVideoObject = videoObjects.current[user.email];
              if (videoUserVideoObject) {
                if (!videoUserVideoObject.srcObject) {
                  videoUserVideoObject.srcObject = stream;
                } else {
                  const hasTrack = videoUserVideoObject.srcObject.getTracks().find(track => track.kind === kind)
                  if (hasTrack) {
                    videoUserVideoObject.srcObject.removeTrack(hasTrack);
                  }
                  videoUserVideoObject.srcObject.addTrack(track);
                }
                if (baseVideoRef.current && kind === "video")
                  baseVideoRef.current.srcObject = stream;
                clearInterval(interval)
              }
            }, 1000)
          }
        }

        connection.ontrack = ({
          streams: [remoteStream]
        }) => {
          const track = remoteStream.getTracks()[0];
          if (remoteStream.getVideoTracks().length > 0) {
            track.onunmute = () => {
              updateUser(user.email, { video: true })
            }
            setStreamToVideoObjects(remoteStream);
          } else if (remoteStream.getAudioTracks().length > 0) {
            track.onunmute = () => {
              updateUser(user.email, { isMicrophoneOpen: true })
            }

            if (userAudios.current[user.email]) {
              console.log(userAudios.current[user.email])
              userAudios.current[user.email].srcObject = remoteStream;
                 
            }
            else {
              const interval = setInterval(() => {
                console.log(userAudios.current[user.email])
                if (userAudios.current[user.email]) {
                  userAudios.current[user.email].srcObject = remoteStream;
                  clearInterval(interval)
                }
              }, 1000)
            }
          }

        }

        let trackFlag = false;

        if (userCamera.current && userCamera.current.getTracks()[0].readyState === "live") {
          removeSenderTrack("VIDEO", connection)
          connection.addTrack(userCamera.current.getVideoTracks()[0], userCamera.current)
          trackFlag = true;
        }

        if (userScreenShare.current && userScreenShare.current.getTracks()[0].readyState === "live") {
          removeSenderTrack("SCREEN", connection)
          connection.addTrack(userScreenShare.current.getVideoTracks()[0], userScreenShare.current)
          trackFlag = true;
        }

        if (userMicrophone.current && userMicrophone.current.getTracks()[0].readyState === "live") {
          removeSenderTrack("MICROPHONE", connection)
          connection.addTrack(userMicrophone.current.getAudioTracks()[0], userMicrophone.current)
          trackFlag = true;
        }

        if (userCanvas.current && userCanvas.current.getTracks()[0].readyState === "live") {
          removeSenderTrack("CANVAS", connection)
          connection.addTrack(userCanvas.current.getVideoTracks()[0], userCanvas.current)
          trackFlag = true;
        }

        if (trackFlag)
          sendOffer(user.email, connection)
      })

      socketRef.current.on(ROOM_ACTIONS.LEAVE, ({ user }) => {
        removeUser(user)
        connections.current[user.email] && (delete connections.current[user.email])
      })

      socketRef.current.on(ROOM_ACTIONS.ACCEPT_VIDEO_STREAM, async () => {
        const selectedDevice = window.localStorage.getItem("videoDeviceId");
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: (selectedDevice ? selectedDevice : ""),
              height: {
                max: 1080,
                ideal: 720
              }, width: {
                max: 1920, ideal: 1280
              },
              aspectRatio: 1.777777778
            }
          })

          updateUser(userLogin.email, { video: true })

          videoObjects.current[userLogin.email].srcObject = stream;


          setCameraOpen(true)
          sendStreamToAllUser(stream, "VIDEO");
          userCamera.current = stream;
        } catch (err) {
          console.log("You cannot share, there is a problem. Maybe, because of permission")
        }

      })


      socketRef.current.on(ROOM_ACTIONS.ACCEPT_SCREEN_STREAM, async () => {
        try {
          const stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
              height: {
                max: 1080,
                ideal: 720,
              }, width: {
                max: 1920, ideal: 1280
              },
              aspectRatio: 1.777777778
            }
          })


          const track = stream.getVideoTracks()[0];

          const ended = () => {
            setScreenShareOpen(false)
            muteVideoFromAllUsers();
            track.removeEventListener("ended", ended);
          }

          track.addEventListener("ended", ended);

          setScreenShareOpen(true)
          sendStreamToAllUser(stream, "SCREEN");
          userScreenShare.current = stream;
        } catch (err) {
          console.log("You cannot share, there is a problem. Maybe, because of permission")
        }

      })

      socketRef.current.on(ROOM_ACTIONS.ACCEPT_MICROPHONE_STREAM, async () => {
        const selectedDevice = window.localStorage.getItem("audioDeviceId");
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              deviceId: (selectedDevice ? selectedDevice : "")
            }
          })
          setMicrophoneOpen(true)

          sendStreamToAllUser(stream, "MICROPHONE");
          userMicrophone.current = stream;
        } catch (err) {
          console.log("You cannot share, there is a problem. Maybe, because of permission")
        }

      })

      socketRef.current.on(ROOM_ACTIONS.ACCEPT_CANVAS_STREAM, async () => {
        if (canvasObject.current) {
          const stream = canvasObject.current.captureStream(30);
          sendStreamToAllUser(stream, "CANVAS");
          userCanvas.current = stream;
        }
      })

      socketRef.current.emit(ROOM_ACTIONS.JOIN, { roomId })
    })

    return () => {
      closeAllShare();
      socketRef.current?.emit(ROOM_ACTIONS.LEAVE, {})
    }
  }, [])

  const addVideoObject = useCallback((instance, email) => {

    if (instance && !videoObjects.current[email]) {
      videoObjects.current[email] = instance;
      const userAudio = new Audio();
      userAudio.autoplay = "autoplay"
      if(!audioAccept.current){
        userAudio.muted=true;
      }
      if (!userAudios.current[email])
        userAudios.current[email] = userAudio;
     
    }
  }, [])

  const setBaseVideoObject = useCallback((instance) => {
    baseVideoRef.current = instance;
  }, [])

  const setCanvasObject = useCallback((instance) => {
    if(!canvasObject.current){
      socketRef.current.emit(ROOM_ACTIONS.PERMISSON_CONTROL, { type: "CANVAS" })
      canvasObject.current = instance;
    }
  }, [])

  const closeAllShare = useCallback(() => {
    closeCamera();
    closeScreenShare();
    closeMicrophone();
    closeCanvas();
    Object.keys(userAudios.current)
    .forEach(email=>{
      userAudios.current[email].srcObject=null;
    })
  }, [])

  const closeCamera = useCallback(() => {
    if (userCamera.current && userCamera.current.getVideoTracks()[0].readyState === "live") {
      userCamera.current.getTracks()
        .forEach(track => track.stop())
      updateUser(userLogin.email, { video: false })
      setCameraOpen(false)
      muteVideoFromAllUsers();
    }
  }, [])


  const closeScreenShare = useCallback(() => {
    if (userScreenShare.current && userScreenShare.current.getVideoTracks()[0].readyState === "live") {
      userScreenShare.current.getTracks()
        .forEach(track => track.stop())
      setScreenShareOpen(false)
      muteVideoFromAllUsers();
    }
  }, [])

  const closeMicrophone = useCallback(() => {
    if (userMicrophone.current && userMicrophone.current.getAudioTracks()[0].readyState === "live") {
      userMicrophone.current.getTracks()
        .forEach(track => {
          track.stop()
        })
      Object.keys(connections.current)
        .forEach(email => {
          if (email !== userLogin.email)
            connectionsChannels.current[email].send(JSON.stringify({ type: "MICROPHONE_CLOSE" }))
        })
      setMicrophoneOpen(false)
    }
  }, [])

  const closeCanvas = useCallback(() => {
    if (userCanvas.current && userCanvas.current.getVideoTracks()[0].readyState === "live") {
      userCanvas.current.getTracks()
        .forEach(track => {
          track.stop()
        })
      muteVideoFromAllUsers();
      canvasObject.current=null;
    }
    setCanvasActive(false);
  }, [])

  const openAllSound=useCallback(()=>{
      Object.keys(userAudios.current).
      forEach(email=>{
        userAudios.current[email].muted=false;
        userAudios.current[email].play()
      })
  },[])

  return [users, socketRef.current, addVideoObject, closeCamera, setBaseVideoObject, setCanvasObject, closeScreenShare, closeMicrophone, closeCanvas,openAllSound]

}

export { useUserJoinTheSocket }