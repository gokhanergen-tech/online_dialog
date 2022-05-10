import React, { useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom';

import ListOwnerMenu from '../list_owner/list_owner';
import Modal from "../../components/modal/modal";
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
    <>
    <div onMouseEnter={()=>{
        ownerMenu.current.style["width"]="100%";
    }} onMouseLeave={()=>{
        ownerMenu.current.style["width"]="0%";
    }} className={"d-flex "+styles.wrappedMenu}>
        <div ref={ownerMenu} className={styles.content}>
          <h3 className={styles.title}>Host</h3>
            <div>
                  <div className={styles.headerRooms}>
                      <h5 className='m-0'>Rooms</h5>
                      <ListOwnerMenu buttonsTagList={[{button:{"data-bs-toggle":"modal","data-bs-target":"#modal"},tag:"New Room"}]} item={0} titleIcon={"Rooms Menu"}></ListOwnerMenu>
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
    
       <div className={'bg-info d-flex '+styles.setting}>
          <i className="bi bi-gear-fill align-self-center"></i>
       </div>
    </div>
      {
        ReactDOM.createPortal((
          <Modal>
             <div id={styles.wrappedModal} className={"modal-content"}>
      
               <div className="modal-header border-0">   
                  <span className={styles.titleModal}>New Room</span>
                  <button className={styles.cancelModalButton} data-bs-dismiss="modal">Cancel</button>
               </div>

             </div>
          </Modal>
       ),document.getElementById("modalBase"))
       }
    </>
  )
}

export default OwnerMenu