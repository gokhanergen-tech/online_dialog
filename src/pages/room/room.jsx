import React, {useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading/loading";
import Canvas from "../../components/room_canvas/canvas";
import Chat from "../../components/room_chat/chat";

import RoomUsers from "../../components/room_users/room_users";
import VideoContent from "../../components/video/video_content";
import VideoMenu from "../../components/video_menu/video_menu";
import { useUserJoinTheSocket } from "../../hooks/useUserSocketRoomInit";
import { ROOM_ACTIONS } from "../../socket/sockets/roomSocketActions";

import styles from './room.module.css'

var menuTimeOut=null;
const clearEvent=(timeout)=>{
   if(timeout!=null)
    clearTimeout(timeout)
}

const Room = () => {
  const {id}=useParams();
  const user=useSelector(state=>state.authReducer.user);

  const navigate=useNavigate()
  
  const [isVideoFullScreen,setVideoFullScreenState]=useState(false)
  const [menuBottomActive,setBottomMenuActive]=useState(0);
  const [isMenuShow,setMenuShow]=useState(false);
  const [isShownChatEventMenu,setChatEventMenuShow]=useState(true)
  const [windowWidth,setWindowWidth]=useState(window.innerWidth)
  const [loading,setLoading]=useState(true)
  const [isWhiteBoardActive,setCanvasActive]=useState(false)
  const [room,setRoom]=useState(null)

  const [users,socket]=useUserJoinTheSocket(id,user,setLoading);

  const onChatEventMenuCloseClick=useCallback(()=>{
    setChatEventMenuShow(false)
    changeBottomMenuState(-1)
  },[])

  
  const stateControl=useCallback((object)=>{
   if((isShownChatEventMenu) && windowWidth<768){
     
      if(object.style.display!=="none")
        object.style.display="none";
   }else{
     if(object.style.display!=="block")
       object.style.display="block";
   }
  },[windowWidth,isShownChatEventMenu])

  const changeBottomMenuState=useCallback((state)=>{
   if([1,0].includes(state)){
      setChatEventMenuShow(true)
   }else{
      setChatEventMenuShow(false)
   }
   setBottomMenuActive(state)
  },[])

  const handleClickMenuItem=useCallback((index)=>{
    switch(index){
      case 5:
        if(isVideoFullScreen)
         setVideoFullScreenState(false)
        else 
         setVideoFullScreenState(true)
        break;
      case 4:
        setLoading(true)
        socket.emit(ROOM_ACTIONS.LEAVE,{})
      break;
         
    }
  },[isVideoFullScreen,socket])
  
  useEffect(()=>{
    
  if(!loading){
      const object=document.getElementsByClassName(styles.videoContent).item(0)
      stateControl(object);
    }
  },[windowWidth,isShownChatEventMenu,loading])

  useEffect(()=>{
    
    const eventSize=(e)=>{
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize",eventSize)
  
    return ()=>{
        clearEvent(menuTimeOut)
        window.removeEventListener("resize",eventSize)
    }
  },[])

  if(loading)
    return <Loading/>
  return <div className={styles.roomWrapper}>

      <div className={"row m-0 "+styles.contentTop}>
        <div className={"col bg-black h-100 "+styles.videoContent}>
         <div onMouseMove={()=>{
         
         if(!isMenuShow){
          setMenuShow(true)
         }
         clearEvent(menuTimeOut)
         menuTimeOut=setTimeout(()=>{
             setMenuShow(false)
         },3000)
        }
        } onMouseLeave={()=>{
          setMenuShow(false)
          clearEvent(menuTimeOut)
        }} className={"p-0 overflow-hidden justify-content-center d-flex align-items-center h-100 "+(isVideoFullScreen?"":"position-relative")}>
           {
             isWhiteBoardActive?<Canvas isFullScreen={isVideoFullScreen} setFullScreenState={setVideoFullScreenState}/>:
             <VideoContent setFullScreenState={setVideoFullScreenState} srcVideo={"/videos/test.mp4"} isFullScreen={isVideoFullScreen}></VideoContent>
           }
           <VideoMenu setClickMenu={handleClickMenuItem} isFullScreen={isVideoFullScreen} setFullScreenState={setVideoFullScreenState} isShow={isMenuShow}></VideoMenu>
         </div>
        </div>
       
        <div className={"col-12 col-lg-4 col-xl-3 col-md-5 bg-white "+(!isShownChatEventMenu?"d-none":"")+" "+styles.chatEventMenu}>
          <div className="p-2 d-flex flex-column h-100">
             
              <Chat roomId={id} user={user} isActive={menuBottomActive===0}
              users={users.map(userRoom=>({email:userRoom.email,name:userRoom?.userDto?.fullName,owner:userRoom?.userDto?.owner}))} 
              socket={socket} onClick={onChatEventMenuCloseClick}/>
             
          </div>
        </div>
      </div>

      <div className={"row m-0  "+styles.contentBottom}>
         <RoomUsers users={users}></RoomUsers>
         <div className={"col-6 col-lg-4 col-xl-3 bg-dark p-0 h-100 "+styles.bottom_menu}>
            <div className="d-flex h-100">
             <button onClick={()=>{
               changeBottomMenuState(0)
               }} className={styles.bottomMenuButton+" "+(menuBottomActive===0?(styles.bottomMenuButtonActive):"")}><i className={"bi bi-chat-left-dots"}></i></button>
             <button onClick={()=>{
               changeBottomMenuState(1)
             }} className={styles.bottomMenuButton+" "+(menuBottomActive===1?styles.bottomMenuButtonActive:"")}><i className={"bi bi-calendar-event "+(menuBottomActive===1?"text-white":"")}></i></button>
            </div>
         </div>
      </div>
    </div>
};

export default React.memo(Room);