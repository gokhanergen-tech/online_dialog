import React, { useEffect, useRef, useState } from 'react'

import styles from './owner_menu.module.css'
let closeTimeout=null;
const OwnerMenu = () => {
  const ownerMenu=useRef(null);
  const [isRoomsShow,setRoomsShow]=useState(false)
  const [isEventsShow,setEventsShow]=useState(false)

  useEffect(()=>{
     return ()=>{
         if(closeTimeout)
          clearTimeout(closeTimeout)
     }
  },[])

  return (
    <div onMouseEnter={()=>{
        ownerMenu.current.style.display="block";
        
        setTimeout(()=>{
            ownerMenu.current.style["width"]="100%";
        },0)
        
    }} onMouseLeave={()=>{
        ownerMenu.current.style["width"]="0%";
        closeTimeout=setTimeout(()=>{
            ownerMenu.current.style.display="none";
        },200)
    }} className={"d-flex "+styles.wrappedMenu}>
        <div ref={ownerMenu} className={styles.content}>
          <h3 className={styles.title}>Host</h3>
            <div>
                  <div className={styles.headerRooms}>
                      <h5 className='m-0'>Rooms</h5>
                  </div>
                  {
                      isRoomsShow&&<ul className={styles.rooms}>
                      <li>
                         <div className={"d-flex align-items-center "+styles.room}>
                            <i className="bi bi-person-workspace text-black ps-2"></i>
                            <span className='w-100 text-center text-black'>Room</span>
                         </div>
                      </li>
                      <li>
                         <div className={"d-flex align-items-center "+styles.room}>
                            <i className="bi bi-person-workspace text-black ps-2"></i>
                            <span className='w-100 text-center text-black'>Room</span>
                         </div>
                      </li>
                      <li>
                         <div className={"d-flex align-items-center "+styles.room}>
                            <i className="bi bi-person-workspace text-black ps-2"></i>
                            <span className='w-100 text-center text-black'>Room</span>
                         </div>
                      </li>
                      <li>
                         <div className={"d-flex align-items-center "+styles.room}>
                            <i className="bi bi-person-workspace text-black ps-2"></i>
                            <span className='w-100 text-center text-black'>Room</span>
                         </div>
                      </li>
                  </ul>
                  }
                  <div onClick={()=>{
                      setRoomsShow(!isRoomsShow);
                  }} className='text-center bg-white'>
                    <i className={"bi bi-caret-"+(isRoomsShow?"up":"down")+" text-black"}></i>
                  </div>
            </div>
            <div>
                  <div className={styles.headerRooms}>
                      <h5 className='m-0'>Question Events</h5>
                  </div>
                  {
                      isEventsShow&&<ul className={styles.rooms}>
                      <li>
                         <div className={"d-flex align-items-center "+styles.room}>
                            <i className="bi bi-person-workspace text-black ps-2"></i>
                            <span className='w-100 text-center text-black'>Event</span>
                         </div>
                      </li>
                  </ul>
                  }
                  <div onClick={()=>{
                      setEventsShow(!isEventsShow);
                  }} className='text-center bg-white'>
                    <i className={"bi bi-caret-"+(isEventsShow?"up":"down")+" text-black"}></i>
                  </div>
            </div>
        </div>
    
       <div className={'bg-info d-flex '+styles.setting}>
          <i className="bi bi-gear-fill align-self-center"></i>
       </div>
    </div>
  )
}

export default OwnerMenu