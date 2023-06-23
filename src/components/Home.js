import React from "react";
import bg from ".././shutterstock_177350003.jpg";
import { Row } from "react-bootstrap";

const Home = (props) => {
  const dataIngestionHandler = () => {
    props.setIsHome(false);
    props.setIsScheduling(false);
  };
  return (
    <div style={{ display: "block" }}>
      <Row>
        <img
          src={bg}
          alt="Logo"
          style={{ maxWidth: "1200px", position: "relative" }}
        ></img>
      </Row>
      <Row>
        <button
          className="btn-s"
          style={{
            maxWidth: "160px",
            position: "relative",
            marginLeft: "500px",
          }}
          onClick={dataIngestionHandler}
        >
          Data Ingestion
        </button>
      </Row>
    </div>
  );
};

export default Home;
