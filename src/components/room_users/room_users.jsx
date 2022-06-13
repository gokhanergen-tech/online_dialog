import React, { useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux';
import { UsersContext } from '../../pages/room/room';
import User from "../room_user/user";

import styles from './room_users.module.css'
const RoomUsers = ({isAllUsersActive}) => {

  const usersRef=useRef(null)
  const wrappedRef=useRef(null)

  const {isOwner,email}=useSelector(state=>({isOwner:state.authReducer.user?.userDto.owner,email:state.authReducer.user?.email}))
  const {users,setAllUsersActive}=React.useContext(UsersContext);

  useEffect(()=>{
    usersRef.current.style.setProperty("--usersCount",users.length)
  },[users])

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

    wrappedRef.current?.addEventListener("mousedown",mouseDown)
    wrappedRef.current?.addEventListener("mouseup",mouseUp)
    wrappedRef.current?.addEventListener("mouseover",mouseMove)

    
    return ()=>{
      wrappedRef.current?.removeEventListener("mousedown",mouseDown)
      wrappedRef.current?.removeEventListener("mouseup",mouseUp)
      wrappedRef.current?.removeEventListener("mouseover",mouseMove)
    }
  },[])

  return (
    <div ref={wrappedRef} className={"col-6 col-lg-8 col-xl-9 "}>
     <div ref={usersRef} className={styles.room_users+" "+(isAllUsersActive&&styles.allUsersMode)}>
     
        {
          isAllUsersActive&&<menu className='d-flex justify-content-end'>
            <span onClick={()=>setAllUsersActive(false)} className={styles.fullUsersExit}>Close</span>
          </menu>
        }
 
         {
            users.map((user)=>{
              console.log(user.video)
             return <div key={user.email}><User video={user.video} email={user.email} isAuthUser={user.email===email} isLoginUserOwner={user.email===email?false:isOwner} fullName={user.userDto.fullName}></User></div>
           })
         }
     
    </div>
   </div>
  )
}

export default React.memo(RoomUsers)