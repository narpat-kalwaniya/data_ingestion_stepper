import React from "react";
import bg from ".././banner.jpg";
import { Row } from "react-bootstrap";
import "./Home.css";

const Home = (props) => {
  const dataIngestionHandler = (e) => {
    props.setIsHome(false);
    props.setIsScheduling(false);
    props.setStep(1);
    // window.location.reload();
  };
  return (
    <div className="homepageimagebtn">
      <img className="HomeImage" src={bg} alt="Logo"></img>
      <button
        className="btn-s"
        style={{
          position: "absolute",
          marginLeft: "400px",
          marginTop: "270px",
        }}
        onClick={dataIngestionHandler}
      >
        Get Started Now
      </button>
    </div>
  );
};

export default Home;
