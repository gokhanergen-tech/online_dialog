import React, { useEffect, useRef, useState} from 'react'
import ListOwnerMenu from '../list_owner/list_owner';
import styles from './owner_menu.module.css'
import AddRoom from '../add_room_modal/add_room';
import { useCallback } from 'react';
import { getOwnerRoomsByRoomType } from '../../axios/http';
let closeTimeout=null;
const OwnerMenu = () => {
  const ownerMenu=useRef(null);
  const [isRoomsShow,setRoomsShow]=useState(false)
  const [isEventsShow,setEventsShow]=useState(false)

  const [rooms,setRooms]=useState([])

  const getRooms=useCallback(async ()=>{
       try{
         const {data:{rooms}}=await getOwnerRoomsByRoomType("ALL")
         setRooms(rooms)
       }catch(err){
         console.log(err.response.data?.message)
       }
  },[])

  const addRoom=useCallback((room)=>{
       setRooms([...rooms,room])
  },[rooms])
  
  useEffect(()=>{
     getRooms();
     return ()=>{
         if(closeTimeout)
          clearTimeout(closeTimeout)
     }
  },[])

  return (
    <>
    <div onMouseEnter={()=>{
        ownerMenu.current.style["width"]="100%";
        if(window.innerWidth>500)
         document.body.style["margin-left"]=document.getElementsByClassName(styles.wrappedMenu).item(0).getBoundingClientRect().width+"px";
    }} onMouseLeave={()=>{
        ownerMenu.current.style["width"]="0%";
        if(window.innerWidth>500)
         document.body.style["margin-left"]="0px";
    }} className={"d-flex "+styles.wrappedMenu}>
        <div ref={ownerMenu} className={styles.content}>
         <div style={{width:200}}>
         <h3 className={styles.title}>Host</h3>
         <div>
                  <div className={styles.headerRooms}>
                      <h5 className='m-0'>Rooms</h5>
                      <ListOwnerMenu buttonsTagList={[{button:{"data-bs-toggle":"modal","data-bs-target":"#add_room_modal"},tag:"New Room"}]} item={0} titleIcon={"Rooms Menu"}></ListOwnerMenu>
                  </div>
                  {
                      isRoomsShow&&<ul className={styles.rooms}>
                        <li>
                           <div className={styles.room}>
                              <span><b className='text-black'>Offices</b></span>
                           </div>
                        </li>
                        {
                           rooms.filter(room=>room.roomTypeDto.roomType==="OFFICE_ROOM").map(room=>{
                            return (<li key={room.hashedId}>
                              <div className={"d-flex align-items-center "+styles.room}>
                                 <i className="bi bi-person-workspace text-black px-2"></i>
                                 <span title={room.title} className={'w-100 '+(room.open?"text-success":"text-muted")}>{room.title.length>20?room.title.substring(0,21)+"...":room.title}</span>
                              </div>
                           </li>)
                           })
                        }
                        <li>
                           <div className={styles.room}>
                              <span><b className='text-black'>Interviews</b></span>
                           </div>
                        </li>
                        {
                           rooms.filter(room=>room.roomTypeDto.roomType==="INTERVIEW_ROOM").map(room=>{
                           return (<li key={room.hashedId}>
                              <div className={"d-flex align-items-center "+styles.room}>
                                 <i className="bi bi-person-workspace text-black px-2"></i>
                                 <span title={room.title} className={'w-100 '+(room.open?"text-success":"text-muted")}>{room.title.length>20?room.title.substring(0,21)+"...":room.title}</span>
                              </div>
                           </li>)
                           })
                        }
                  </ul>
                  }
                  <div onClick={()=>{
                      setRoomsShow(!isRoomsShow);
                  }} className='text-center bg-white'>
                    <i className={"bi bi-caret-"+(isRoomsShow?"up":"down")+" text-black"}></i>
                  </div>
              </div>
              {/*Soru event'leri*/}
              <div>
                  <div className={styles.headerRooms}>
                      <h5 className='m-0'>Question Events</h5>
                      <ListOwnerMenu buttonsTagList={[{click:()=>{
                      },tag:"New Event"}]} item={1} titleIcon={"Events Menu"}></ListOwnerMenu>
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
          
        </div>
    
       <div className={'bg-info d-flex '+styles.setting}>
          <i className="bi bi-gear-fill align-self-center"></i>
       </div>
    </div>
    {/*Oda modal*/}
    <AddRoom addRoomToOwnerMenu={addRoom}/>
    </>
  )
}

export default OwnerMenu