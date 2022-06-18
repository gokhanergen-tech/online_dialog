import React from "react";
import styles from "./message.module.css"
const Message = ({ sameuser, me, messageObject, isPrivacy }) => {
  const { message, fullName, date } = messageObject;
  const dateMessage = new Date(date)
  return (
    <div>
      {(sameuser) ? "" : <div className="mb-2">
        <strong title={fullName} className={"px-1 primary-font w-100 " + styles.userName}>{fullName.substring(0, 21) + "..."}</strong>
      </div>}
      <div className={"mb-1 w-100 d-flex justify-content-between align-items-center  " + styles.message_body + " " + (!me ? styles.messageOuther : styles.messageMe) + " " + (isPrivacy ? styles.privacyMessage : "")}>
        <p className={styles.message}>
          {message ? message.trim().split("\n").map((data,index)=>{
            if(index<message.split("\n").length-1){
              return <span key={index}>{data}<br></br></span>
            }else
             return <span key={index}>{data}</span>;

          }) : ""}
        </p>
        <span className={"text-muted text-end " + styles.time}>{String(dateMessage.getHours()).padStart(2, "0") + " " + String(dateMessage.getMinutes()).padStart(2, "0")}</span>
      </div>
    </div>
  );
};

export default React.memo(Message);
