import React, { useCallback, useEffect, useState } from "react";
import styles from "./chat.module.css";
import Message from "../room_message/message";
import { ROOM_ACTIONS } from "../../socket/sockets/roomSocketActions";


const isMessageValid = (message) => {
  return message && message.trim()
}

const Chat = ({ socket, users, user, onClick, isActive, roomId }) => {

  const [messages, addMessage] = useState({ "0": [] })
  const [selectedMessages, setSelectedMessages] = useState("0")

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();

    let message=message=document.getElementsByClassName(styles.message).item(0).innerText;

    const isValid = isMessageValid(message);

    if (isValid) {
      if (selectedMessages === "0")
        socket.emit(ROOM_ACTIONS.SEND_MESSAGE, { message })
      else
        socket.emit(ROOM_ACTIONS.SEND_MESSAGE, { message, toUser: selectedMessages })
    }
  }, [selectedMessages])

  useEffect(() => {
    const isOwner = user.userDto.owner;
    let options = [{}]
    if (users.length > 0) {

      options = users.filter(userRoom => {

        if (userRoom.email !== user.email && isOwner)
          return true;

        if (!isOwner && userRoom.owner)
          return true;

      }).map(roomUser => ({ [roomUser.email]: (messages[roomUser.email] ? messages[roomUser.email] : []) }));
    }

    options = (options.length === 0 ? [{}] : options)

    addMessage({ "0": messages["0"], ...Object.assign(...options) })

    if (document.getElementsByClassName(styles.drop).item(0).value !== selectedMessages) {
      setSelectedMessages("0")
    }
  }, [users, selectedMessages])


  useEffect(() => {
    socket.off(ROOM_ACTIONS.ON_MESSAGE)
    socket.on(ROOM_ACTIONS.ON_MESSAGE, ({ messageUser, selectedMessages: gettedSelected }) => {
      
      let selected = messages[gettedSelected]

      if (messageUser && selected) {
        addMessage(prev => ({ ...prev, [gettedSelected]: [{ isSameUserMessage: (selected[0]?.user?.email === messageUser.user.email && !selected[0]?.privacyMessage ? true : false), user: messageUser.user, messageArray: [messageUser.message], date: messageUser.messageDate }, ...selected] }))
      }

      if (messageUser && gettedSelected !== "0" && selectedMessages === "0" && messageUser.user.email !== user.email) {
        selected = messages["0"]
        addMessage(prev => ({ ...prev, ["0"]: [{ privacyMessage: true, isSameUserMessage: (false), user: messageUser.user, messageArray: [messageUser.message], date: messageUser.messageDate }, ...selected] }))
      }
    })

    return () => {
      socket.off(ROOM_ACTIONS.ON_MESSAGE)
    }
  }, [messages, selectedMessages])

  return (
    <div className={styles.wrapper_chat + " " + (!isActive ? "d-none" : "d-block")}>
      <div className={"p-1 border-bottom d-flex " + styles.title}>
        <button onClick={onClick} className={"btn btn-close " + styles.btnClose}></button>
        <h5 className={"text-dark text-center w-100 text-center " + styles.messageTitle}>Messages</h5>
      </div>

      <div className={"d-flex " + styles.wrapped_content}>
        <div className={" border " + styles.content}>
          {
            messages[selectedMessages]?.map((message, index) => {
              return <Message key={index} messageObject={{ message: message?.messageArray[0], fullName: message?.user?.userDto?.fullName, date: message.date }} isPrivacy={message?.privacyMessage ? true : false} sameuser={message.isSameUserMessage} me={user.email === message.user.email} />
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
              <select value={selectedMessages} onChange={e => setSelectedMessages(e.target.value)}
                className={
                  "form-select form-select-sm rounded-2 text-dark border-0 w-100 " +
                  styles.drop
                }
                aria-label=".form-select-sm example"
                id="inputGroupSelect01"
              >
                <option value={"0"} defaultValue={"0"}>Everyone</option>
                {
                  <>
                    {
                      users.filter(userRoom => messages[userRoom.email]).map((userRoom, index) => <option key={index} value={userRoom?.email}>{userRoom?.name}</option>)
                    }
                  </>

                }
              </select>
            </div>
            <div className={styles.chatColorChooser} >
              <input onChange={(e) => {
                document.getElementsByClassName(styles.content)
                  .item(0).style.backgroundColor = e.target.value;

              }} className={styles.chatColorInput} type={"color"}></input>
            </div>
          </div>

          <div className=" h-75 d-flex mt-2 align-items-center ">
            <div contentEditable="true" aria-label="Write a message"
              className={"p-1 h-100 " + styles.message}
              id="floatingTextarea2"></div>
            <button className={styles.send_button} onClick={e => {
              handleSendMessage(e)
              document.getElementsByClassName(styles.message).item(0).innerText=""
            }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chat);
