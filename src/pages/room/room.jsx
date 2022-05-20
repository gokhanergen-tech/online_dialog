import React, {useState } from "react";
import { useParams } from "react-router-dom";
import VideoContent from "../../components/video/video_content";
import VideoMenu from "../../components/video_menu/video_menu";

import styles from './room.module.css'
const Room = () => {
  const {id}=useParams();
  
  const [isVideoFullScreen,setVideoFullScreenState]=useState(false)
  const [menuBottomActive,setBottomMenuActive]=useState(0);


  return <div className={styles.roomWrapper}>

      <div className={"row m-0 "+styles.contentTop}>
        <div className={"col bg-black p-0 w-100 h-100 "+(isVideoFullScreen?"":"position-relative")}>
           <VideoContent setFullScreenState={setVideoFullScreenState} srcVideo={"/videos/dd.mp4"} isFullScreen={isVideoFullScreen}></VideoContent>
           <VideoMenu></VideoMenu>
        </div>
        <div className="col-3 bg-white d-lg-block d-none">

        </div>
      </div>

      <div className={"row m-0 "+styles.contentBottom}>
         <div className="col-6 col-lg-9">

         </div>
         <div className="col-6 col-lg-3 bg-dark p-0 h-100">
            <div className="d-flex h-100">
             <button onClick={()=>setBottomMenuActive(0)} className={styles.bottomMenuButton+" "+(menuBottomActive===0?(styles.bottomMenuButtonActive):"")}><i className={"bi bi-chat-left-dots"}></i></button>
             <button onClick={()=>setBottomMenuActive(1)} className={styles.bottomMenuButton+" "+(menuBottomActive===1?styles.bottomMenuButtonActive:"")}><i className={"bi bi-calendar-event "+(menuBottomActive===1?"text-white":"")}></i></button>
            </div>
         </div>
      </div>
    </div>
};

export default React.memo(Room);