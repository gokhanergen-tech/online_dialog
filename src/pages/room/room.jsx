import React, { Suspense, useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/loading";

import VideoMenu from "../../components/video_menu/video_menu";
import { useUserJoinTheSocket } from "../../hooks/useUserSocketRoomInit";
import { ROOM_ACTIONS } from "../../socket/sockets/roomSocketActions";

import styles from './room.module.css'

const Users = React.lazy(() => import("../../components/room_users/room_users"))
const Chat = React.lazy(() => import("../../components/room_chat/chat"))
const Canvas = React.lazy(() => import("../../components/room_canvas/canvas"))
const VideoContent = React.lazy(() => import("../../components/video/video_content"))

export const UsersContext = React.createContext()

var menuTimeOut = null;
const clearEvent = (timeout) => {
  if (timeout != null)
    clearTimeout(timeout)
}

const Room = () => {
  const { id } = useParams();
  const user = useSelector(state => state.authReducer.user);

  const navigate = useNavigate()


  const [menuBottomActive, setBottomMenuActive] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [room, setRoom] = useState(null)

  const [isMenuShow, setMenuShow] = useState(false);
  const [isShownChatEventMenu, setChatEventMenuShow] = useState(true)
  const [isVideoFullScreen, setVideoFullScreenState] = useState(false)
  const [isAllUserActive, setAllUsersActive] = useState(false)
  const [loading, setLoading] = useState(true)

  const [isWhiteBoardActive, setCanvasActive] = useState(false)
  const [isCameraOpen, setCameraOpen] = useState(false);
  const [isScreenOpen, setScreenShareOpen] = useState(false);


  const [users, socket, addVideoObject, closeCamera, setBaseVideoObject,setCanvasObject,closeScreenShare] = useUserJoinTheSocket(id, user, setLoading, setRoom,setCameraOpen,setScreenShareOpen);


  const onChatEventMenuCloseClick = useCallback(() => {
    setChatEventMenuShow(false)
    changeBottomMenuState(-1)
  }, [])


  const stateControl = useCallback((object) => {
    if ((isShownChatEventMenu) && windowWidth < 768) {

      if (object.style.display !== "none")
        object.style.display = "none";
    } else {
      if (object.style.display !== "block")
        object.style.display = "block";
    }
  }, [windowWidth, isShownChatEventMenu])

  const changeBottomMenuState = useCallback((state) => {
    if ([1, 0].includes(state)) {
      setChatEventMenuShow(true)
    } else {
      setChatEventMenuShow(false)
    }
    setBottomMenuActive(state)
  }, [])

  const handleClickMenuItem = useCallback((index) => {
    switch (index) {
      case 5:
        if (isVideoFullScreen){
          setVideoFullScreenState(false)
        }
        else{
          setVideoFullScreenState(true)
        }
        break;
      case 4:
        setLoading(true)
        socket.emit(ROOM_ACTIONS.LEAVE, {})
        break;
      case 3:
        setAllUsersActive(true)
        break;
      case 1:
        if (!isCameraOpen) {
          socket.emit(ROOM_ACTIONS.PERMISSON_CONTROL, { type: "VIDEO" })
        }
        else {
          closeCamera();
        }
        break;
      case 2:
        if(!isScreenOpen){
          socket.emit(ROOM_ACTIONS.PERMISSON_CONTROL, { type: "SCREEN" })
        }else{
          closeScreenShare();
        }

    }
  }, [isVideoFullScreen, socket, isCameraOpen,isScreenOpen])

  useEffect(() => {

    if (!loading) {
      const object = document.getElementsByClassName(styles.videoContent).item(0)
      stateControl(object);
    }
  }, [windowWidth, isShownChatEventMenu, loading])

  useEffect(() => {

    const eventSize = (e) => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", eventSize)
  
    return () => {
      clearEvent(menuTimeOut)
      window.removeEventListener("resize", eventSize)
    }
  }, [])

  if (loading)
    return <Loading />
  return <UsersContext.Provider value={{ users, addVideoObject,setAllUsersActive }}><div className={styles.roomWrapper}>

    <div className={"row m-0 " + styles.contentTop}>
      <div className={"col bg-black h-100 " + styles.videoContent}>
        <div onMouseMove={() => {

          if (!isMenuShow) {
            setMenuShow(true)
          }
          clearEvent(menuTimeOut)
          menuTimeOut = setTimeout(() => {
            setMenuShow(false)
          }, 3000)
        }
        } onMouseLeave={() => {
          setMenuShow(false)
          clearEvent(menuTimeOut)
        }} className={"p-0 overflow-hidden justify-content-center d-flex align-items-center h-100 " + (isVideoFullScreen ? "" : "position-relative")}>
          {
            isWhiteBoardActive ?
              <Suspense fallback={<></>}>
                <Canvas setCanvasObject={setCanvasObject} isFullScreen={isVideoFullScreen} setFullScreenState={setVideoFullScreenState} />
              </Suspense>
              :
              <Suspense fallback={<></>}>
                <VideoContent setBaseVideoObject={setBaseVideoObject} setFullScreenState={setVideoFullScreenState} srcVideo={"/videos/test.mp4"} isFullScreen={isVideoFullScreen}></VideoContent>
              </Suspense>
          }
          <VideoMenu isCameraActive={isCameraOpen} setClickMenu={handleClickMenuItem} isFullScreen={isVideoFullScreen} setFullScreenState={setVideoFullScreenState} isShow={isMenuShow}></VideoMenu>
        </div>
      </div>

      <div className={"col col-md-auto bg-white " + (!isShownChatEventMenu ? "d-none" : "") + " " + styles.chatEventMenu}>
        <div className="p-2 d-flex flex-column h-100">
          <Suspense fallback={<div>Loading...</div>}>
            <Chat users={users.map(userRoom => ({ email: userRoom.email, name: userRoom?.userDto?.fullName, owner: userRoom?.userDto?.owner }))} roomId={id} user={user} isActive={menuBottomActive === 0}
              socket={socket} onClick={onChatEventMenuCloseClick} />
          </Suspense>
        </div>
      </div>
    </div>

    <div className={"row m-0  " + styles.contentBottom}>
      <Suspense fallback={<div>Loading...</div>}>
        <Users isAllUsersActive={isAllUserActive}></Users>
      </Suspense>
      <div className={"col-auto bg-dark p-0 h-100 " + styles.bottom_menu}>
        <div className="d-flex h-100 flex-column">
          <button onClick={() => {
            changeBottomMenuState(0)
          }} className={styles.bottomMenuButton + " " + (menuBottomActive === 0 ? (styles.bottomMenuButtonActive) : "")}><i className={"bi bi-chat-left-dots"}></i></button>
          <button onClick={() => {
            changeBottomMenuState(1)
          }} className={styles.bottomMenuButton + " " + (menuBottomActive === 1 ? styles.bottomMenuButtonActive : "")}><i className={"bi bi-calendar-event " + (menuBottomActive === 1 ? "text-white" : "")}></i></button>
        </div>
      </div>
    </div>
  </div></UsersContext.Provider>
};

export default React.memo(Room);