import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from './user_menu.module.css'
let closeTimeout=null;

const UserMenu = () => {

  function closeHandler(){
      document.getElementById("menu").style["transform"]="translateX(100%)";

      closeTimeout=setTimeout(()=>{
        document.getElementById("menu").style.display="none";
      },500)
  }   

  const eventOnBodyClick=document.onclick=()=>{
      closeHandler();
  }

  useEffect(()=>{
    ()=>{
        if(closeTimeout)
          clearTimeout(closeTimeout)
        document.removeEventListener("click",eventOnBodyClick);
    }
  },[])

  return (
    <div onClick={(e)=>{
        e.stopPropagation();
    }} id="menu" className={styles.wrappedMenu}>
     <div>
      <div className="bg-white">
        <div className="p-1">
           <i onClick={closeHandler} className={styles.exit+" bi bi-x-lg"}></i>
        </div>
        <div className='ps-5 px-5 pt-1 pb-2 d-flex flex-column align-items-center'>
          <i className={"bi bi-person-circle "+styles.user_icon}></i>
          <h6 className={styles.name_surname}>Name Surname</h6>
        </div>
      </div>

     <div className={'d-flex flex-column '+styles.base_buttons}>
         <button className={styles.link}>
            <div className='row align-items-center m-0'>
               <i className="col-auto bi bi-person-square p-0"></i>
               <span className='col-3 p-0'>Profile</span>
            </div>
         </button>
         <Link to="/interviews" className={styles.link}>
           <div className='row align-items-center m-0'>
               <i className="col-auto bi bi-people-fill p-0"></i>
               <span className='col-3 p-0'>Classes</span>
            </div>
         </Link>
         <Link className={styles.link} to="/offices">
           <div className='row align-items-center m-0'>
               <i className="bi bi-building p-0 col-auto"></i>
               <span className='col-3 p-0'>Offices</span>
            </div>
         </Link>
         <button className={styles.link}>
            <div className='row align-items-center m-0'>
               <i className="col-auto bi bi-box-arrow-right p-0"></i>
               <span className='col-3 p-0'>Logout</span>
            </div>
         </button>
     </div>
     </div> 
    </div>
  )
}

export default React.memo(UserMenu)