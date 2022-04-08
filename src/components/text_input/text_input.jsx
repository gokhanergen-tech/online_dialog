import React from 'react'

import styles from './text_input.module.css'

const TextInput = ({type,setValueOnChange,iconClassName,placeholder,clickIcon}) => {

  return (
          <div className={'bg-white d-flex p-0 m-0 '+styles.base}>
           <i onClick={()=>clickIcon()} className={iconClassName+" text-black "+styles.icon}></i>
           <input placeholder={placeholder} className={styles.input} type={type}></input>
          </div>
  )
}

export default TextInput