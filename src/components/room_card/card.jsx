import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
const Card = ({ roomName, title, teacher, id }) => {
  return (
    <div className={"card col-xl-3 col-lg-4 col-md-6 p-4 mt-3 "+ styles.card}>
      <div className="first  text-center">
        <div className={"heading text-white fs-4 "+ styles.title }>
          {roomName}
        </div>
        <div className=" text-white fs-5 "> {title}</div>
      </div>
      <div className="second d-flex flex-row mt-2">
        <div className="image mr-3">
          <img src="/images/office.png" className="rounded-circle" width="60" />
        </div>
        <div className=" align-self-center fs-5 text-white m-3 ml-1">
          {teacher}
        </div>
      </div>

      <div className="third mt-4 align-self-center">
        <Link to={`/interview/${id}`}>
          <button
            className={'btn text-white border border-2 border-light' + styles.button}
          >
            Join The Room
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
