import React, { useCallback, useState } from "react";
import styles from "./chat.module.css";
import Message from "../room_message/message";


const isMessageValid=(message)=>{
  return message&&message.trim()
}

const Chat = ({messages,addMessage,socket,user,onClick}) => {

  const [message,setMessage]=useState("");

  const handleSendMessage=useCallback((e)=>{
      e.preventDefault();
      const isValid=isMessageValid(message);
      if(isValid){
        if(messages[0]?.messageArray){
          messages[0].messageArray=[message,...messages[0].messageArray]
          addMessage([...messages])
        }else
          addMessage([{messageArray:["fsdfsd","gdfgfdgdf"]},{messageArray:["fsdfsd,gfgdfd"]},...messages])
        setMessage("");
      }
  },[message])

  return (
    <div className={styles.wrapper_chat}>
      <div className={"p-2 border-bottom d-flex "+styles.title}>
        <button onClick={onClick} className={"btn btn-close"}></button>
        <h5 className="text-dark text-center w-100 text-center ">Messages</h5>
      </div>
      <div className="d-flex flex-column h-100">
       <div className={" p-2 border  w-100 " + styles.content}>
          {
              messages.map((message,index)=>{
                if(message?.messageArray.length>1)
                 return message.messageArray.map((messageSub,indexSub)=>{
                  if(indexSub===message.messageArray.length-1)
                    return <Message key={indexSub} message={messageSub} sameuser={false} me={true}/>
                  else
                    return <Message key={indexSub} message={messageSub} sameuser={true} me={true}/>
                 })
                else
                 return <Message key={index} message={message?.messageArray[0]} sameuser={false} me={true}/>
              })
          }
       </div>

      <div className={styles.chat_bottom}>
        <div
          className={
            "d-flex mb-1 w-100 align-items-center mt-1 h-25 " +
            styles.inputSelect
          }
        >
          <label className="text-dark mx-2" htmlFor="inputGroupSelect01">
            Send:{" "}
          </label>
          <div className="w-50">
           <select
            className={
              "form-select form-select-sm rounded-2 text-dark border-0 w-100 " +
              styles.drop
            }
            aria-label=".form-select-sm example"
            id="inputGroupSelect01"
          >
            <option defaultValue={"0"}>Everyone</option>
            <option value="1">Onfsdfsdfe</option>
            <option value="2">Twdsfsdfdo</option>
            <option value="3">Thfsdfdsree</option>
            <option value="3">Thfsdfdsree</option>
            <option value="3">Thfsdfdsree</option>
            <option value="3">Thfsdfdsree</option>
            <option value="3">Thfsdfdsree</option>
            <option value="3">Thfsdfdsree</option>
          </select>
        </div>
          </div>
          
        <div className=" h-75 d-flex mt-1 ">
          <textarea onKeyUp={(e)=>{
            if(e.key==="Enter")
              handleSendMessage(e)
          }} onChange={(e)=>setMessage(e.target.value)} value={message}
            className={"form-control p-1 h-100 " + styles.message}
            placeholder="White a message"
            id="floatingTextarea2"></textarea>
        </div>
      </div>
      </div>
    
     
    </div>
  );
};

export default React.memo(Chat);
