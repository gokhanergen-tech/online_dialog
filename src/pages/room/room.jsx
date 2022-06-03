import React, {useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoContent from "../../components/video/video_content";
import VideoMenu from "../../components/video_menu/video_menu";

import styles from './room.module.css'

var menuTimeOut=null;
const clearEvent=(timeout)=>{
   if(timeout!=null)
    clearTimeout(timeout)
}
const Room = () => {
  const {id}=useParams();
  
  const [isVideoFullScreen,setVideoFullScreenState]=useState(false)
  const [menuBottomActive,setBottomMenuActive]=useState(0);
  const [isMenuShow,setMenuShow]=useState(false);
  const [isShownChatEventMenu,setChatEventMenuShow]=useState(true)
  const [windowWidth,setWindowWidth]=useState(window.innerWidth)
  
  const videoShowControl=(object)=>{
   if(isShownChatEventMenu && windowWidth<768){
      if(object.style.display!=="none")
        object.style.display="none";
   }else{
     if(object.style.display!=="block")
       object.style.display="block";
   }
  }

  const changeBottomMenuState=useCallback((state)=>{
   if([1,0].includes(state)){
      setChatEventMenuShow(true)
      setWindowWidth(window.innerWidth)
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
    }
  },[isVideoFullScreen])
  
  useEffect(()=>{
   const object=document.getElementsByClassName(styles.videoContent).item(0)
   videoShowControl(object);
  },[windowWidth,isShownChatEventMenu])

  useEffect(()=>{
    const eventSize=(e)=>{
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize",eventSize)
    return ()=>{
        clearEvent(menuTimeOut)
        window.removeEventListener(eventSize)
    }
  },[])
  
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
         clearEvent(menuTimeOut)
         setMenuShow(false)
         
        }} className={"p-0 overflow-hidden justify-content-center d-flex align-items-center h-100 "+(isVideoFullScreen?"":"position-relative")}>
          <div className="w-100">
           <VideoContent setFullScreenState={setVideoFullScreenState} srcVideo={"/videos/dd6.mp4"} isFullScreen={isVideoFullScreen}></VideoContent>
           <VideoMenu setClickMenu={handleClickMenuItem} isFullScreen={isVideoFullScreen} setFullScreenState={setVideoFullScreenState} isShow={isMenuShow}></VideoMenu>
          </div>
         </div>
        </div>
       
        <div className={"col-12 col-lg-4 col-xl-3 col-md-5 bg-white "+(!isShownChatEventMenu?"d-none":"")+" "+styles.chatEventMenu}>
          <div className="p-2">
             <i onClick={()=>{
               const object=document.getElementsByClassName(styles.videoContent).item(0)
               setChatEventMenuShow(false)
               changeBottomMenuState(-1)
               object.style.display="block"
             }} className={"bi bi-x-lg text-black"}></i>
        
          </div>
        </div>
      </div>

      <div className={"row m-0  "+styles.contentBottom}>
         <div className="col col-lg-8 col-xl-9">

         </div>
         <div className="col-6 col-lg-4 col-xl-3 bg-dark p-0 h-100">
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