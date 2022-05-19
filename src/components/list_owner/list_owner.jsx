import React from 'react'


import styles from './list_owner.module.css'
const ListOwnerMenu = ({buttonsTagList,item,titleIcon}) => {

  const handleToggleList=()=>document.getElementsByClassName(styles.roomsMenu)
  .item(item).classList.toggle(styles.roomsMenuShow)

  return (
    <div className={styles.wrappedMenuOwner}>
     <i title={titleIcon} onClick={handleToggleList} className={"bi bi-three-dots-vertical "+styles.icon}></i>
     <div className={styles.roomsMenu}>
       {
           buttonsTagList.map((menuItem,index)=><button onClick={handleToggleList} {...menuItem?.button} key={index} className=''>{menuItem.tag}</button>)
       }
     </div>
   </div>
  )
}

export default React.memo(ListOwnerMenu)