import React from "react";


export default (props) => {
  return (
    <div className="container">
      <div data-animation="fadeInUp" data-delay=".5s">
        { props.children }
      </div>
    </div>
  );
};


