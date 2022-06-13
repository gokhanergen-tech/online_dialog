import React from "react";
import styles from "./service_item.module.css";

const ServiceItem = ({ imageUrl, serviceName, content }) => {
  return (
    <div className={"col-md-6 col-12 p-0 "}>
      <div className="p-3">
        <div className={"row m-0 " + styles.wrappedService}>
          <div className="col-6 p-0 ">
           <img className={"" + styles.img} src={imageUrl}></img>
          </div>
          <div className="col-6 p-0">
            <h5 className="text-center mt-2 ">{serviceName}</h5>
            <p className={"text-center p-3 " + styles.paragraf}>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
