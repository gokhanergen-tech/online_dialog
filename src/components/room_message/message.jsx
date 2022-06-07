import React from "react";
import styles from "./message.module.css"
const Message = ({sameuser,me,messageObject,isPrivacy}) => {
  const {message,fullName,date}=messageObject;
  const dateMessage=new Date(date)
  return (
    <div>
      {(sameuser)?"":<div className="d-flex justify-content-between align-items-center mb-2">
        <strong  title={fullName} className={"px-1 primary-font "+styles.userName}>{fullName.substring(0,21)+"..."}</strong>
        <small className="text-muted">
          <span className={"text-dark "+styles.time}>{String(dateMessage.getHours()).padStart(2,"0")+" "+String(dateMessage.getMinutes()).padStart(2,"0")}</span>
        </small>
      </div>}
      <div className={"mb-1 w-100" + styles.message_body }>
        <p className={` m-0 ${styles.message} ${!me?styles.messageOuther:styles.messageMe}`+" "+(isPrivacy?styles.privacyMessage:"")} >
          {message?message:""}
        </p>
      </div>
    </div>
  );
};

export default React.memo(Message);
