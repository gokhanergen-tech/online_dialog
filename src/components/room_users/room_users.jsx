import React, { useEffect, useRef } from 'react'
import User from "../room_user/user";

import styles from './room_users.module.css'
const RoomUsers = ({users}) => {

  const usersRef=useRef(null)
  const wrappedRef=useRef(null)
  
  useEffect(()=>{
    const usersSlider=usersRef.current;
    const bounding=wrappedRef.current.getBoundingClientRect();
    let startX =0;
    let scrollLeft=0;
    let isMouseDown=0;
 
    const mouseDown=(e)=>{
      isMouseDown=true;
      startX=e.pageX-bounding.left;
      scrollLeft=usersSlider.scrollLeft;
    }
    const mouseUp=(e)=>{
      isMouseDown=false;
    }
    const mouseMove=(e)=>{
      if(!isMouseDown)
        return;
      const x=e.pageX-bounding.left;
      const goScrollValue=x-startX;
      usersSlider.scrollLeft=scrollLeft-goScrollValue;
    }

    wrappedRef.current.addEventListener("mousedown",mouseDown)
    wrappedRef.current.addEventListener("mouseup",mouseUp)
    wrappedRef.current.addEventListener("mouseover",mouseMove)

    
    return ()=>{
      wrappedRef.current.removeEventListener("mousedown",mouseDown)
      wrappedRef.current.removeEventListener("mouseup",mouseUp)
      wrappedRef.current.removeEventListener("mouseover",mouseMove)
    }
  },[])
  return (
    <div ref={wrappedRef} className={"col-6 col-lg-8 col-xl-9 "}>
     <div ref={usersRef} className={styles.room_users}>
        {
          users.map((user,index)=>{
            return <div key={index}><User areYouOwner={""}   video={true} fullName={user.userDto.fullName}></User></div>
          })
        }
    </div>
   </div>
  )
}

export default React.memo(RoomUsers)