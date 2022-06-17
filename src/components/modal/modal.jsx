import React from 'react'

import styles from './modal.module.css'
const Modal = ({children,id}) => {
  return (
    <div onMouseEnter={(e)=>{
        e.stopPropagation();
    }} onMouseLeave={(e)=>{
        e.stopPropagation();
    }} tabIndex={"-1"} className={'modal fade'} id={id} >
        <div className={'modal-dialog '+styles.wrapped}>
            {children}
        </div>
    </div>
  )
}

export default React.memo(Modal)