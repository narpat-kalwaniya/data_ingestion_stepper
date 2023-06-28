import React from "react";
import bg from ".././banner.jpg";
import { Row } from "react-bootstrap";

const Home = (props) => {
  const dataIngestionHandler = (e) => {
    props.setIsHome(false);
    props.setIsScheduling(false);
    props.setStep(1);
    // window.location.reload();
  };
  return (
    <div
      style={{
        flex: "1",
        zIndex: "-10",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
        // boxShadow: "0px 10px 5px 1px rgba(0, 0, 0, 0.2)",

        // bottom: "0",
        // right: "0",
      }}
    >
      <img
        src={bg}
        alt="Logo"
        style={{
          width: "1316px",
          position: "absolute",
        }}
      ></img>
      <button
        className="btn-s"
        style={{
          // maxWidth: "160px",
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
