import React from 'react'

import styles from './loading.module.css'
const Loading = () => {
  return (
    <div className={"position-fixed top-0 w-100 h-100 "+styles.wrappedLoading}>
      <div className='d-flex align-items-center'>
        <div>
         <i className="bi bi-arrow-up"></i>
        </div>
        <div>
         <i className="bi bi-arrow-down"></i>
        </div>
      </div>
    </div>
  )
}

export default Loading