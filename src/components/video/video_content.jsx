import React, { useEffect,useRef, useState } from "react";

import styles from './video_content.module.css'
const VideoContent = ({isFullScreen,srcVideo,srcObject,setFullScreenState}) => {
  const video=useRef(null)

  useEffect(()=>{
    video.current.src=srcVideo;
  },[])
  

  return (
    <video onDoubleClick={()=>{
        setFullScreenState(!isFullScreen)
     }} ref={video} className={styles.videoScreen+" "+(isFullScreen?styles.fullScreen:"")}>
       Video is does not be supported!
     </video>
  )
}

export default React.memo(VideoContent);