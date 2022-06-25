import React from "react";
import { Link } from "react-router-dom";

import styles from './card.module.css'

const Card = ({ roomName, title, teacher, id,open }) => {
  return (
    <div className={"p-3 col-xl-4 col-md-6 p-4 mt-3"}>
     <div className={styles.card}>
      <div className="first  text-center">
        <div title={roomName} className={"heading text-white fs-4 "+ styles.title }>
          {roomName.length>35?roomName.substring(0,35)+"...":roomName}
        </div>
        <div className=" fs-5 "> {title}</div>
      </div>
      <div className="second d-flex flex-row justify-content-around mt-2">
        <div>
         <div className={"mr-3 border border-light rounded-circle overflow-hidden "+styles.avatar}>
          <img src="/images/office.png" className={"w-100 h-100 "+styles.image}/>
         </div>
        </div>
        <h5 title={teacher} className={" align-self-center  m-3 ml-1 "+styles.teacher_name}>
          {teacher.length>35?teacher.substring(0,35)+"...":teacher}
        </h5>
      </div>

      <div className="d-flex justify-content-center mt-4 align-self-center">
        <Link  to={open?`/interview/${id}`:""}>
          <button  {...{disabled:!open,title:open?"Join":"Kapalı"}}
            className={'text-white ' + styles.button}
          >
            {open?"Join The Room":"Closed"}
          </button>
        </Link>
      </div>
    </div>
   </div>
    
  );
};

export default Card;
