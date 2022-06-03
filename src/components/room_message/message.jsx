import React from "react";
import styles from "./message.module.css"
const Message = ({sameuser,me,message}) => {
    console.log(sameuser);
  return (
    <div>
      {sameuser?"":<div className="clearfix mb-2">
        <strong className={"px-1 text-dark primary-font "+styles.userName}>Jack Sparrow</strong>
        <small className="float-end text-muted">
          <span className={"text-dark "+styles.time}>12 mins ago</span>
        </small>
      </div>}
      <div className={"mb-1 w-100 " + styles.message_body }>
        <p className={` m-0 ${styles.message} ${me?styles.messageMe:styles.messageOuther}`} >
          {message?message:""}
        </p>
      </div>
    </div>
  );
};

export default React.memo(Message);
