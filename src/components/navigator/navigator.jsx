import React, { useRef, useState } from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import OwnerMenu from '../owner_menu/owner_menu';
import UserMenu from '../user_menu/user_menu';
import styles from './navigator.module.css'

const isAuth=true;
const isOwner=true;

const Navigator = () => {
  const ref=useRef(null)
  const navigate=useNavigate();

  function handleOpenMenu(e){

    e.stopPropagation();
    document.getElementById("menu").style.display="block";
    setTimeout(()=>{
      document.getElementById("menu").style["transform"]="translateX(0%)";
    },0)
  }

  return (
    <div className='container'>

      <nav className={'d-flex align-items-center justify-content-between '+styles.navbar}>
       <span onClick={()=>navigate("/")} className={styles.logo}>OnInterview</span>
       
       {
         isAuth?
         <div><i onClick={handleOpenMenu} style={{cursor:"pointer",fontSize:"2rem"}} className="bi bi-person-circle"></i></div>
         :
         <div>
         <NavLink style={({isActive})=>({backgroundColor:(isActive?"#565151":"")})} className={styles.nav_link} to={"/"}>Home</NavLink>
         <NavLink style={({isActive})=>({backgroundColor:(isActive?"#565151":"")})}  className={styles.nav_link}  to={"/about"}>About</NavLink>
         <NavLink style={({isActive})=>({backgroundColor:(isActive?"#565151":"")})} className={styles.nav_link}  to={"/contact"}>Contact</NavLink>
       </div>
       }

       {
         isAuth&&<UserMenu/>
       }

       {
         isAuth&&isOwner&&<OwnerMenu/>
       }   
       
      </nav>
      
    </div>
  )
}

export default React.memo(Navigator)