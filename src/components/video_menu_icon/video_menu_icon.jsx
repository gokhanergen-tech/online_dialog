import React from 'react'

import styles from './video_menu_icon.module.css'
const VideoMenuIcon = ({icon,type,hoverText,onClick,index,isActive}) => {
  return (
    <button index={index} onClick={()=>onClick(index)} hovertext={hoverText} className={styles.iconWrapper}><i type={type?type:""} className={"bi bi-"+icon+" "+(isActive?styles.active:"text-black")}></i></button>
  )
}

export default React.memo(VideoMenuIcon)