import React, { useMemo, useState} from "react";
import { UsersContext } from "../../pages/room/room";
import Settings from "../settings/settings";
import styles from "./user.module.scss";



const User = ({ video,fullName, email, isLoginUserOwner, isAuthUser,isMicrophoneOpen}) => {
  const [isMenuActive, setActiveMenu] = useState(false)  
  const {addVideoObject}=React.useContext(UsersContext);
  

  const getItems = useMemo(() => {
    return [
      {
        text: "Change Name", handle: () => {
        }, willAdded: isAuthUser, index: 0
      },
      {
        text: "Settings", handle: () => {

        },properties:{"data-bs-toggle":"modal","data-bs-target":"#settings_modal"}, willAdded: isAuthUser, index: 1
      },
      {
        text: "Kick User", handle: () => {
          alert("Kick")
        }, willAdded: isLoginUserOwner, index: 2
      }
    ]
  }, [isLoginUserOwner, isAuthUser])

  return (
    <div draggable="false" className={"bd-info d-flex " + styles.card+" "+(isMicrophoneOpen?styles.micActive:"")}>
       {
        isAuthUser&&<Settings></Settings>
       }
        <video autoPlay="autoplay" muted ref={(instance) => addVideoObject(instance, email)} draggable={false}
          className={"rounded-3 " + styles.video} 
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
        ></video>

        {
          !video?   <div className={"mx-auto " + styles.content}>
          <img
            height={"90%"}
            width={"90%"}
            className={"m-auto" + styles.profil_img}
            src="/icons/user.svg"
            draggable="false"
          ></img>
        </div>:""
        }
     
      
      <div className={"dropup position-absolute " + styles.option}>
        {
          (isLoginUserOwner || isAuthUser) && <>
            {isMenuActive && <ul className={"" + styles.drop}>
              {
                getItems.filter((menuItem) => menuItem.willAdded).
                  map(menuItem => (<li {...menuItem?.properties} onClick={() => {
                    menuItem.handle()
                    setActiveMenu(false)
                  }} key={menuItem.index}>{menuItem.text}</li>))
              }
            </ul>}
            <button 
              className="bg-transparent border-0"
              onClick={(e) => {
                setActiveMenu(prev=>!prev)
              }}
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
