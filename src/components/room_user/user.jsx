import React, { useCallback, useState } from "react";
import styles from "./user.module.scss";



const User = ({ fullName, email, isLoginUserOwner, isAuthUser, addVideoObject }) => {
  const [isMenuActive, setActiveMenu] = useState(false)

  const getItems = useCallback(() => {
    return [
      {
        text: "Change Name", handle: () => {
          alert("Name")
        }, willAdded: isAuthUser, index: 0
      },
      {
        text: "Kick User", handle: () => {
          alert("Kick")
        }, willAdded: isLoginUserOwner, index: 1
      }
    ]
  }, [isLoginUserOwner, isAuthUser])



  return (
    <div draggable="false" className={"bd-info rounded-3 d-flex " + styles.card}>
      {true ? (
        <video ref={(instance) => addVideoObject(instance, email)} draggable={false}
          className={"rounded-3 " + styles.video}
          controlsList="nodownload"
          muted
          autoPlay
          onContextMenu={(e) => e.preventDefault()}
        ></video>
      ) : (
        <div className={"mx-auto " + styles.content}>
          <img
            height={"90%"}
            width={"90%"}
            className={"m-auto" + styles.profil_img}
            src="/icons/user.svg"
            draggable="false"
          ></img>
        </div>
      )}
      <div className={"dropup position-absolute " + styles.option}>
        {
          (isLoginUserOwner || isAuthUser) && <>
            {isMenuActive && <ul className={"" + styles.drop}>
              {
                getItems().filter((menuItem) => menuItem.willAdded).
                  map(menuItem => (<li onClick={() => {
                    menuItem.handle()
                    setActiveMenu(false)
                  }} key={menuItem.index}>{menuItem.text}</li>))
              }
            </ul>}
            <button
              className="bg-transparent border-0"
              onClick={() => setActiveMenu(!isMenuActive)}
            >
              <img className={styles.threeDot} height={"20px"} width={"20px"} src="/icons/3dot.svg"></img>
            </button>


          </>
        }

      </div>
      <div title={fullName}
        className={
          "px-1 position-absolute bottom-0 start-0 " +
          styles.name
        }
      >
        {fullName}
      </div>
    </div>
  );
};

export default React.memo(User);
