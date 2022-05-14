import React from "react";

import styles from './inter_content.module.css'

const InterContent = ({ children }) => {
  return (
    <div className={"container "+styles.wrappedBase}>
      <div className="row m-0">
          {children}
      </div>
    </div>
  );
};

export default InterContent;
