import React from "react";

const InterContent = ({ children }) => {
  return (
    <div className="container-fluid w-100 mt-5">
      <div className="row justify-content-center m-0">
        <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap
         p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InterContent;
