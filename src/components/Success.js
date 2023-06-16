import React from "react";
import { Alert, Button } from "react-bootstrap";
import "../styles/main.css";

const Success = (props) => {
  const startOverHandler = () => {
    window.location.reload();
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
        <p>
          <a
            href="http://ec2-54-197-121-247.compute-1.amazonaws.com:27020/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here{" "}
          </a>
          to Monitor the Pipeline Runs
        </p>
        <p>
          <a
            href=" http://3.15.237.154:9002/ingestion"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Pipeline Lineage{" "}
          </a>
        </p>

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
