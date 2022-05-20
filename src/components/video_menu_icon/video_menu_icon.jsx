import React from 'react'

import styles from './video_menu_icon.module.css'
const VideoMenuIcon = ({icon,type}) => {
  return (
    <button className={styles.iconWrapper}><i type={type?type:""} className={"text-black bi bi-"+icon}></i></button>
  )
}

export default React.memo(VideoMenuIcon)