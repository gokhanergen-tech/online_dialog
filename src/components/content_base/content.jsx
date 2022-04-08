import React from 'react'

import styles from './content.module.css'

const Content = ({children}) => {
  return (
    <div className='container mt-5'>
      <div className='row justify-content-center m-0'>
         <div className={'col-md-8 col-12 '+styles.content}>
             <div className='d-flex h-100 align-items-center justify-content-center p-3 '>
               {
                 children
               }
             </div>
         </div>
      </div>
    </div>
  )
}

export default Content