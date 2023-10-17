import React from "react";

const Counter = (props) => {
  return (
    <div
      style={{
        marginTop: "10px",
        fontSize: "22px",
        alignItems: "bottom",
        color: "#4f4f4f",
      }}
    >
      <span style={{}}>{props.filteredPipeLogs.length} </span>
      Pipelines
    </div>
  );
};

export default Counter;
