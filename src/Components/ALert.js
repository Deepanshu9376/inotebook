import React from "react";

const ALert = (props) => {
  return (
    <div>
      <div className="alert alert-primary" role="alert">
       {props.message}
      </div>
    </div>
  );
};

export default ALert;
