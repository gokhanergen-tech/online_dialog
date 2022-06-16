import React from 'react'
import VideoMenuIcon from '../video_menu_icon/video_menu_icon'

import styles from './video_menu.module.css'
const VideoMenu = ({isShow,isFullScreen,setClickMenu,isCameraActive}) => {

  return (
    <div className={"position-absolute "+styles.videoMenu+" "+(isShow?styles.menuShow:"")}>
        <div className={'ps-3 px-3 gap-3 '+styles.menuItems+" "}>
          <VideoMenuIcon index={0} onClick={setClickMenu} hoverText={"Whiteboard"}  icon={"pencil-square"}></VideoMenuIcon>
          <VideoMenuIcon isActive={isCameraActive} index={1} onClick={setClickMenu} hoverText={"Camera"} icon={"camera-video-fill"}></VideoMenuIcon>
          <VideoMenuIcon index={2} onClick={setClickMenu} hoverText={"Screen Share"} icon={"projector-fill"}></VideoMenuIcon>
          <VideoMenuIcon index={3} onClick={setClickMenu} hoverText={"Users"} icon={"three-dots-vertical"}></VideoMenuIcon>
          <VideoMenuIcon index={4} onClick={setClickMenu} hoverText={"Leave the room"} icon={"telephone-x-fill"}></VideoMenuIcon>
          <VideoMenuIcon index={5} onClick={setClickMenu} hoverText={(isFullScreen?"Fullscreen exit":"Fullscreen")} icon={(isFullScreen?"fullscreen-exit":"fullscreen")}></VideoMenuIcon>
        </div>
    </div>
  )
}

export default React.memo(VideoMenu)