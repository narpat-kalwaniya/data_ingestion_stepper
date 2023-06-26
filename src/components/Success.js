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
        <p className="messageStyle" style={{ color: "green" }}>
          {props.response.message}!
        </p>
        <p className="messageStyle"> Status : {props.response.status}</p>
        <p className="messageStyle"> Dag Name : {props.response.dag_name}</p>
        <p className="messageStyle"> Entity ID : {props.response.entity_id}</p>
        <p className="messageStyle">
          {" "}
          Source Entity : {props.response.source_entity}
        </p>
        <p className="messageStyle">
          {" "}
          Target Entity : {props.response.target_entity}
        </p>

        {/* <p>
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
        </p> */}
        {/* {Object.entries(props.response).map(([key, value]) => (
          <div key={key} style={{ display: "flex", marginBottom: "10px" }}>
            <span className="key">{key}</span>
            <span className="colon">:</span>
            <span className="value">{value}</span>
          </div>
        ))} */}

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
