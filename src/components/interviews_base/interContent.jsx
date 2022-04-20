import React from "react";

const InterContent = ({ children }) => {
  return (
    <div className="container">
      <div className="row m-0">
          {children}
      </div>
    </div>
  );
};

export default InterContent;
