import React from "react";
import styles from "./user.module.scss";

const User = ({ video }) => {
  return (
    <div className={"bd-info rounded-3 d-flex " + styles.card}>
      {video ? (
        <video
          className={"rounded-3 " + styles.video}
          width={"100%"}
          src="https://media.geeksforgeeks.org/wp-content/uploads/20190616234019/Canvas.move_.mp4"
          controls
        ></video>
      ) : (
        <div className={"mx-auto " + styles.content}>
          <img
            height={"90%"}
            width={"90%"}
            className={"m-auto" + styles.profil_img}
            src="/icons/user.svg"
          ></img>
        </div>
      )}
      <div className={"dropup position-absolute " + styles.option}>
        <button
          type="button"
          class="bg-transparent border-0"
          data-bs-toggle="dropdown"
        >
          <img height={"20px"} width={"20px"} src="/icons/3dot.svg"></img>
        </button>
        <ul className={"dropdown-menu  " + styles.drop}>
          <li className="dropdown-item">Direct message</li>
          <li className="dropdown-item">Change name</li>
          <li className="dropdown-item">Kick out</li>
        </ul>
      </div>
      <div
        className={
          "px-1 position-absolute bottom-0 start-0 text-light fs-6 " +
          styles.name
        }
      >
        1030516746 Muhammed Yusuf ADIYAMAN
      </div>
    </div>
  );
};

export default User;
