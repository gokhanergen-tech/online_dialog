import React, { useRef, useState } from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import styles from './navigator.module.css'

const isAuth=true;

const Navigator = () => {
  const ref=useRef(null)
  const navigate=useNavigate();

  const [isShow,setShow]=useState(false);

  return (
    <div className='container'>

      <nav className={'d-flex align-items-center justify-content-between '+styles.navbar}>
       <span onClick={()=>navigate("/")} className={styles.logo}>OnInterview</span>
       
       {
         isAuth?
         <div><i style={{cursor:"pointer",fontSize:"2rem"}} className="bi bi-person-circle"></i></div>
         :
         <div>
         <NavLink style={({isActive})=>({backgroundColor:(isActive?"#565151":"")})} className={styles.nav_link} to={"/"}>Home</NavLink>
         <NavLink style={({isActive})=>({backgroundColor:(isActive?"#565151":"")})}  className={styles.nav_link}  to={"/about"}>About</NavLink>
         <NavLink style={({isActive})=>({backgroundColor:(isActive?"#565151":"")})} className={styles.nav_link}  to={"/contact"}>Contact</NavLink>
       </div>
       }
       
      </nav>
      
    </div>
  )
}

export default Navigator