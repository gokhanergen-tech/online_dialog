import React, { useEffect,useRef } from "react";

import styles from './video_content.module.css'
const VideoContent = ({isFullScreen,srcVideo,srcObject,setFullScreenState}) => {
  const video=useRef(null)

  useEffect(()=>{
    /*navigator.mediaDevices.getDisplayMedia({
      video:{
        width:{
          ideal:1366,
        },
        height:{
          ideal:768
        }
      }
    }).then(stream=>{
      video.current.srcObject=stream;
    })*/


    video.current.src=srcVideo;
    //video.current.playbackRate=5;
  },[])
  

  return (
    <video controlsList="nodownload" tabIndex={-1} onContextMenu={(e)=>e.preventDefault()} onDoubleClick={()=>{
        setFullScreenState(!isFullScreen)
     }} ref={video} className={styles.videoScreen+" "+(isFullScreen?styles.fullScreen:"")}>
       Video does not be supported!
     </video>
  )
}

export default React.memo(VideoContent);