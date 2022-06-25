import React, { useEffect } from 'react'

import styles from './popup.module.css'
const Popup = ({ setSoundOpen, openAllSound,setAudioOpenAccept}) => {

    useEffect(() => {
        const timeout = () => {
            setSoundOpen(false)
        }

        setTimeout(timeout, 30000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    useEffect(()=>{
        const closePopUp=()=>{
          setSoundOpen(false)
          document.removeEventListener("mouseup",closePopUp);
        }
        
        document.addEventListener("mouseup",closePopUp);
    
        return ()=>{
          document.removeEventListener("mouseup",closePopUp);
        }
    
      },[])
      
    return (
        <div onMouseUp={(e) => e.stopPropagation()} className={"d-flex justify-content-center " + styles.wrapper}>
            <div className={styles.base}>
                <div className={styles.top}>
                    <p className='text-center w-100'>
                        Do you want to connect room's sound?
                    </p>
                </div>
                <div className={styles.bottom}>
                    <button onClick={() => {
                        openAllSound();
                        setAudioOpenAccept(true)
                        setSoundOpen(false)
                    }} className={styles.popup_button}>Connect to Audio</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Popup)