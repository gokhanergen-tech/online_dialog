import React from 'react'
import VideoMenuIcon from '../video_menu_icon/video_menu_icon'

import styles from './video_menu.module.css'
const VideoMenu = () => {
  return (
    <div className={"position-absolute "+styles.videoMenu}>
        <div className='d-flex gap-3'>
          <VideoMenuIcon type={"mic"} icon={"mic-fill"}></VideoMenuIcon>
          <VideoMenuIcon icon={"camera-video-fill"}></VideoMenuIcon>
          <VideoMenuIcon icon={"projector-fill"}></VideoMenuIcon>
          <VideoMenuIcon icon={"three-dots-vertical"}></VideoMenuIcon>
          <VideoMenuIcon icon={"telephone-x-fill"}></VideoMenuIcon>
        </div>
        
    </div>
  )
}

export default React.memo(VideoMenu)