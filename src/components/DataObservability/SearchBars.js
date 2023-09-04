import React from "react";

const SearchBarsRow = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px",
      }}
    >
      <input
        type="text"
        placeholder="Search Pipelines ..."
        style={{ width: "25%", padding: "5px", margin: "10px" }}
      />
      <input
        type="text"
        placeholder=""
        style={{ width: "25%", padding: "5px", margin: "10px" }}
      />
      <input
        type="text"
        placeholder=""
        style={{ width: "25%", padding: "5px", margin: "10px" }}
      />
      <input
        type="text"
        placeholder=""
        style={{ width: "25%", padding: "5px", margin: "10px" }}
      />
    </div>
  );
};

export default SearchBarsRow;
