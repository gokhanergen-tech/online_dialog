import React from 'react'

import styles from './button.module.css'

const Button = ({value,onClick,customClassName}) => {
  return (
    <button className={styles.button+" "+customClassName} onClick={onClick}>
         {
             value
         }
    </button>
  )
}

export default Button