import React from "react";
import { useNavigate } from "react-router-dom";
import bg from ".././banner.jpg";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const dataIngestionHandler = (e) => {
    navigate("/pipelines");
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
