import React from "react";
import styles from "./chat.module.css";
import Message from "../room_message/message";
const Chat = () => {
  return (
    <div className={" bg-white h-100 " + styles.title}>
      <div className="p-2 border-bottom d-flex ">
        <button
          type="button"
          className="btn-close my-auto"
          aria-label="Close"
        ></button>
        <h5 className="text-dark m-auto ">Messages</h5>
      </div>
      <div className={" p-2 border d-flex w-100 " + styles.content}>
        <div className="w-100">
          <Message sameuser={false} me={false}/>
          <Message sameuser={true} me={false}/>
          <Message sameuser={false} me={false}/>
          <Message sameuser={true} me={true}/>
          <Message sameuser={false} me={true}/>
          <Message sameuser={false} me={false}/>
          <Message sameuser={true} me={false}/>
          <Message sameuser={false} me={true}/>
          <Message sameuser={false} me={false}/>
          <Message sameuser={false} me={true}/>
        </div>
      </div>
      <div className="">
        <div
          className={
            "input-group mb-1 w-50 align-items-center mt-1 " +
            styles.inputSelect
          }
        >
          <span className="text-dark mx-2" for="inputGroupSelect01">
            Send:{" "}
          </span>
          <select
            className={
              "form-select form-select-sm rounded-2 text-dark border-0 " +
              styles.drop
            }
            aria-label=".form-select-sm example"
            id="inputGroupSelect01"
          >
            <option selected>Everyone</option>
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
        <div class="">
          <textarea
            className={"form-control p-2 " + styles.message}
            placeholder="White a message"
            rows="4"
            id="floatingTextarea2"
          ></textarea>
          <span class="icon-user"> <img src=""></img>
        </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
