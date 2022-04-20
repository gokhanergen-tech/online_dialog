import React from "react";
import { Link } from "react-router-dom";

import styles from './card.module.css'

const Card = ({ roomName, title, teacher, id }) => {
  return (
    <div className="p-3 col-xl-4 col-md-6 p-4 mt-3">
     <div className="card bg-white">
      <div className="first  text-center">
        <div className="heading text-black fs-4" style={{ fontWeight: "bold" }}>
          {roomName}
        </div>
        <div className=" text-black fs-5 "> {title}</div>
      </div>
      <div className="second d-flex flex-row mt-2">
        <div className="image mr-3 border border-light rounded-circle">
          <img src="/images/office.png" className="rounded-circle" width="60" />
        </div>
        <div className=" align-self-center fs-5 text-black m-3 ml-1">
          {teacher}
        </div>
      </div>

      <div className="third mt-4 align-self-center">
        <Link to={`/interview/${id}`}>
          <button
            className="btn btn-block text-white"
            style={{ backgroundColor: "#524E4E" }}
          >
            Join The Room
          </button>
        </Link>
      </div>
    </div>
   </div>
    
  );
};

export default Card;
