import React from 'react'
import styles from './service_item.module.css'

const ServiceItem = ({imageUrl,serviceName,content}) => {
  return (
     <div className={'col-md-6 col-8 p-0'}>
         <div className='p-3'>
          <div className={'row m-0 '+styles.wrappedService}>
           <img className={'col-5 p-0 '+styles.img} src={imageUrl}></img>

           <div className='col-7 p-0 '>
             <h5 className='text-center mt-2 '>{serviceName}</h5>
             <p className={'text-center p-3 '+styles.paragraf}>{content}</p>
           </div>

         </div>
         </div>
     </div>
  )
}

export default ServiceItem