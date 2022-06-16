import React, { useRef, useEffect } from 'react'
import { startCanvas, clear } from './board.js';


import styles from './canvas.module.css'
const Canvas = ({ isFullScreen, setFullScreenState, setCanvasObject }) => {


  const canvasRef = useRef(null);

  useEffect(() => {
    startCanvas(canvasRef.current)
    /* const video=document.createElement("video");
     video.autoplay=true;
       const captureStart=async ()=>{
        const ctx=canvasRef.current.getContext("2d");
   
     const stream=await navigator.mediaDevices.getDisplayMedia({video:true});
     video.srcObject=stream;
     setInterval(()=>{
      ctx.drawImage(video,0,0)
     },1000/30)*/


    window.onbeforeunload = () => {
      clear && clear();
    };

    return () => {
      clear && clear()
    }

  }, [])

  return (
    <div className={styles.canvasBase}>
      <canvas ref={instance => {
        setCanvasObject(instance);
        canvasRef.current = instance;
      }} onDoubleClick={() => {
        setFullScreenState(!isFullScreen)
      }} className={(isFullScreen ? styles.fullScreen : "")} id="canvasUser" width={"1024"} height={"768"}>
      </canvas>
    </div>)


}

export default React.memo(Canvas)