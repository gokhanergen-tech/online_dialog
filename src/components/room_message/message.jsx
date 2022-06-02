import React from "react";
import styles from "./message.module.css"
const Message = ({sameuser,me}) => {
    console.log(sameuser);
  return (
    <div className="chat w-100 ">
      {sameuser?"":<div className="chat-header clearfix "  >
        <strong className="px-1 text-dark primary-font ">Jack Sparrow</strong>
        <small className="float-end text-muted">
          <span className="text-dark">12 mins ago</span>
        </small>
      </div>}
      <div className={"chat-body mb-1 " + styles.message_body }>
        <p className={`p-2 m-0 ${styles.message} ${me?styles.messageOuther:styles.messageMe}`} >
          Lorem ipsumf sdfdsfdsfsdr sit amet.
          Lorem ipsumf sdfdsfdsfsdr sit amet.
          Lorem ipsumf sdfdsfdsfsdr sit amet.
        </p>
      </div>
    </div>
  );
};

export default Message;
