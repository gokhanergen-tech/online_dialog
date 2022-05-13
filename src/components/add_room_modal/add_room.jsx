import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import ReactDOM from 'react-dom'
import { addRoom } from '../../axios/http';

import Modal from "../../components/modal/modal";
import TextInput from '../text_input/text_input';
import styles from "./add_room.module.css"

const isTitleValid=(title)=>{
  return title && title.trim().length>=10
}

const isSubTitleValid=(subTitle)=>{
    return subTitle && subTitle.trim().length>=10
}

const AddRoom = () => {
  
  const [messages,setMessages]=useState({titleMessage:"",subTitleMessage:"",backendMessage:""})
  const [title,setTitle]=useState("");
  const [subTitle,setSubTitle]=useState("");
  const [roomType,setRoomType]=useState("INTERVIEW_ROOM");
  const [selectType,setType]=useState(0);

  const handleAddRoom=useCallback(async (e)=>{
    e.preventDefault();
    const errors={titleMessage:"",subTitleMessage:"",backendMessage:""}
    if(!isTitleValid(title))
      errors["titleMessage"]="Title must not be null and smaller than 10 length!"
    if(!isSubTitleValid(subTitle))
      errors["subTitleMessage"]="Subtitle must not be null and smaller than 10 length!"

    if(!errors.titleMessage && !errors.subTitleMessage){
      try{
        const {data:{room}}=await addRoom({
          "title":title,
          "subtitle":subTitle,
          "roomTypeDto":{"roomType":roomType}
        })
        document.getElementById("modal").click();
      }catch(err){
        errors["backendMessage"]=err.response.data?.message
      }
     
    }
     
    setMessages({...messages,...errors})
  },[messages,title,subTitle,roomType])

  const hiddenModalListener=useCallback(()=>{
    setMessages({titleMessage:"",subTitleMessage:"",backendMessage:""})
    setTitle("")
    setSubTitle("")
    setType(0)
  },[])

  useEffect(()=>{
   const modal=document.getElementById("modal")
   modal.addEventListener("hidden.bs.modal",hiddenModalListener)

   return ()=>{
    modal.removeEventListener(hiddenModalListener);
   }
  },[])

  return (
     ReactDOM.createPortal((
        <Modal>
           <div id={styles.wrappedModal} className={"modal-content"}>
    
             <div className="modal-header border-0">   
                <span className={"modal-title "+styles.titleModal}>New Room</span>
                <button className={styles.cancelModalButton} data-bs-dismiss="modal">Cancel</button>
             </div>
        
             <div className='modal-body'>
              <form onSubmit={handleAddRoom}>
               <div className='row'>

                  <div className='col-12'>
                      <TextInput value={title} warning={messages.titleMessage} clickIcon={()=>{}} iconClassName={"bi "+(!isTitleValid(title)?"bi-x text-danger ":"bi-check2-circle text-success")} setValueOnChange={setTitle} placeholder={"Title"}></TextInput>
                  </div>

                  <div className='col-12 mt-4'>
                      <TextInput value={subTitle} warning={messages.subTitleMessage}  clickIcon={()=>{}} iconClassName={"bi "+(!isSubTitleValid(subTitle)?"bi-x text-danger ":"bi-check2-circle text-success")} setValueOnChange={setSubTitle} placeholder={"Subtitle"}></TextInput>
                  </div>

                  <div className={'col-12 mt-4'}>
                      <h5 className={styles.selectTypeHeading}>Select a type</h5>
                  </div>

                  <div className='col-12 mt-2'>
                    <div className="d-flex gap-3">
                        <div className={styles.roomTypeBox} onClick={()=>{
                            setRoomType("INTERVIEW_ROOM");
                            setType(0)
                        }}>
                         <i className={"col-auto bi bi-people-fill p-0 "+styles.selectIcon+" "+(selectType==0?styles.active:"")}></i>
                         <h6 className={styles.selectIconTitle+" "+(selectType==0?styles.active:"")}>Class</h6>
                        </div>
                        <div className={styles.roomTypeBox} onClick={()=>{
                            setRoomType("OFFICE_ROOM");
                            setType(1)
                        }}>
                         <i className={"bi bi-building p-0 col-auto "+styles.selectIcon+" "+(selectType==1?styles.active:"")}></i>
                         <h6 className={styles.selectIconTitle+" "+(selectType==1?styles.active:"")}>Office</h6>
                        </div>
                    </div>
                  </div>

                  <div className='col-12 mt-2'>
                    {/*This is for backend error */}
                    {
                         messages.backendMessage&&<div className='mt-2 text-center'>
                          <span className="text-warning font-monospace">{messages.backendMessage}</span>
                        </div>
                     }
                  </div>

                  <div className="col-12 mt-2">
                    <div className='d-flex justify-content-center'>
                     <input onClick={handleAddRoom} type={"submit"} className={styles.createRoomButton} value="Create"/>
                    </div>
                  </div>

                 
               </div>
              </form>
             </div>

           </div>
        </Modal>
     ),document.getElementById("modalBase"))
  )
}

export default React.memo(AddRoom)