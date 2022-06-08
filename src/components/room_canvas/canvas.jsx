import React, { useRef,useEffect } from 'react'
import {startCanvas,clear} from './board.js';


import styles from './canvas.module.css'
const Canvas = ({isFullScreen,setFullScreenState}) => {
   

  const canvasRef=useRef(null);

  useEffect(()=>{
        startCanvas(canvasRef.current)
        
         window.onbeforeunload = () => {
            clear&&clear();
        };

        return ()=>{
             clear&&clear()
        }
    },[])

  return (
    <div className={styles.canvasBase}>
      <canvas onDoubleClick={()=>setFullScreenState(!isFullScreen)} ref={canvasRef} className={(isFullScreen?styles.fullScreen:"")} id="canvasUser" width={"1024"} height={"768"}>
      </canvas>
    </div>)

 
}

export default React.memo(Canvas)