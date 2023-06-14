import React from "react";
import { Alert, Button } from "react-bootstrap";
import "../styles/main.css";

const Success = (props) => {
  const startOverHandler = () => {
    props.setshowMainPage(true);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Alert variant="success" className="mt-3 alertStyle">
        <p className="messageStyle">Pipeline submitted successfully!</p>
        <button
          className="btn-s"
          style={{ marginTop: "15px", marginLeft: "261px" }}
          onClick={startOverHandler}
        >
          Start Over
        </button>
      </Alert>
    </div>
  );
};

export default Success;
