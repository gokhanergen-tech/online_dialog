import React from 'react'

import styles from './text_input.module.css'

const TextInput = ({type,setValueOnChange,iconClassName,placeholder,clickIcon,warning}) => {

  return (<>
    <div className={'bg-white d-flex p-0 m-0 '+styles.base}>
      <i onClick={()=>clickIcon()} className={iconClassName+" text-black "+styles.icon+" "+styles.anim}></i>
      <input onChange={(e)=>setValueOnChange(e.target.value.trim())} placeholder={placeholder} className={styles.input} type={type}></input>
    </div>
    {
      warning&&<h5 className={styles.warning}>{warning}</h5>
    }
  </>
        
  )
}

export default React.memo(TextInput);