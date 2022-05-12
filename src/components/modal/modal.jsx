import React from 'react'

import styles from './modal.module.css'
const Modal = ({children}) => {
  return (
    <div onMouseEnter={(e)=>{
        e.stopPropagation();
    }} onMouseLeave={(e)=>{
        e.stopPropagation();
    }} tabIndex={"-1"} className={'modal fade show d-block'} id="modal" >
        <div className={'modal-dialog '+styles.wrapped}>
            {children}
        </div>
    </div>
  )
}

export default React.memo(Modal)