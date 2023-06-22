import "./sidebar.scss";
import Navigation from "../Navigation/Navigation";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = (props) => {
  const [cross, setCross] = useState("bar");

  // console.log("isscheduling", isScheduling);
  const schedulingHandler = () => {
    props.setIsScheduling(!props.isScheduling);
  };
  const handleClick = (e) => {
    if (cross === "bar") {
      document.querySelector(".sidebar").style.width = "180px";
      document.querySelector("#checkbox").checked = true;
      setCross("cross");
    } else {
      document.querySelector("#checkbox").checked = false;
      setCross("bar");
      document.querySelector(".sidebar").style.width = "50px";
      const sides = document.querySelectorAll(".itemD");
      for (let i = 0; i < sides.length; i++) {
        sides[i].classList.remove("itemC_dis");
      }
    }
    navigate && navigate("/");
  };

  const handle = (e) => {
    if (cross === "bar") {
      document.querySelector(".sidebar").style.width = "180px";
      document.querySelector("#checkbox").checked = true;
      setCross("cross");
    }

    const all = document.querySelectorAll(".expand");

    for (let i = 0; i < all.length; i++) {
      all[i].classList.remove("expandDis");
    }
    //  const sides = document.querySelectorAll('.side')
    //  for(let i=0;i<sides.length;i++){

    //   sides[i].classList.toggle('dis')

    //  }
  };
  const handleB = (e) => {
    document.querySelector("#checkbox").checked = false;
    setCross("bar");
    document.querySelector(".sidebar").style.width = "50px";
    const sides = document.querySelectorAll(".itemD");
    for (let i = 0; i < sides.length; i++) {
      sides[i].classList.remove("itemC_dis");
    }
  };

  //  document.querySelector(".sidebar").addEventListener('mouseleave',handleB)

  const navigate = null;
  return (
    <div
      className="sidebar"
      style={{ color: "white", backgroundColor: "#4F4F4F" }}
      onMouseOver={(e) => {
        handle(e);
      }}
      onMouseLeave={handleB}
    >
      <div className="navF">
        {/* <div className="top">
          {cross === "bar" ? (
            <div className="bar">
              <i class="fa-solid fa-bars" style={{ fontSize: "16px" }}></i>
            </div>
          ) : (
            <div className="cross">
              <i class="fa-solid fa-xmark" style={{ fontSize: "16px" }}></i>
            </div>
          )}
        </div> */}
        <div className="top">
          <div
            className="bar"
            onClick={(e) => {
              navigate && navigate("/");
            }}
          >
            <i
              class="fa-solid fa-house"
              style={{ fontSize: "16px", color: "white" }}
            ></i>
          </div>
        </div>
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          style={{
            position: "absolute",
            top: "12px",
            left: "18px",
            opacity: "0",
            cursor: "pointer",
          }}
          onClick={handleClick}
        />

        <div className="">
          <ul>
            {/* <li
              onClick={() => {
                navigate && navigate("/login");
              }}
            >
              <i class="fa-solid fa-right-to-bracket"></i>
              <span className="side">Login</span>
            </li> */}

            <li
              onClick={() => {
                navigate && navigate("/connections");
              }}
            >
              <i class="fa fa-link" aria-hidden="true"></i>
              <span className="side">Connections</span>
            </li>
            <li
              onClick={() => {
                navigate && navigate("/projects");
              }}
            >
              <i class="fas fa-project-diagram "></i>
              <span className="side">Pipelines</span>
            </li>

            {/* <li
              onClick={() => {
                 navigate && navigate("/datasets");
              }}
            >
              <i className="fa-solid fa-database"></i>
              <span className="side">DataSets</span>
            </li> */}

            <li
              onClick={() => {
                navigate && navigate("/exploreDatasets");
              }}
            >
              {/* <i class="fa-solid fa-book-open"></i> */}
              <i className="fa-solid fa-database"></i>
              <a
                href="http://3.15.237.154:9002/ingestion"
                style={{
                  display: "block",
                  alignItems: "center",
                  justifyContent: "Center",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="side"
                  style={{ marginLeft: "0px", textAlign: "left" }}
                >
                  Governance
                </span>
              </a>
            </li>
            {/*

            <li
              onClick={() => {
                 navigate && navigate("/profiling");
              }}
            >
              <i className="fa-solid fa-file-arrow-down"></i>
              <span className="side">Profiling</span>
            </li> */}

            {/* <li
              onClick={() => {
                 navigate && navigate("/validate");
              }}
            >
              <i class="fa-solid fa-vial"></i>
              <span className="side">Validation</span>
            </li> */}

            {/* <div className="special">
              <i class="fa-solid fa-vial"></i>
              <span
                className="side"
                onClick={(e) => {
                  document.getElementById("val").classList.toggle("itemC_dis");
                  document.getElementById("meta").classList.remove("itemC_dis");
                  document.getElementById("dash").classList.remove("itemC_dis");
                  document
                    .getElementById("admini")
                    .classList.remove("itemC_dis");
                }}
              >
                Validation <i class="fa-solid fa-chevron-down"></i>
              </span>
            </div> */}
            <div className="itemD" id="val">
              <p onClick={(e) => navigate && navigate("/execution")}>
                {" "}
                <i
                  class="fa-solid fa-chevron-right"
                  style={{ fontSize: "10px", marginRight: "4px" }}
                ></i>{" "}
                Execution
              </p>

              <p onClick={(e) => navigate && navigate("/validate")}>
                {" "}
                <i
                  class="fa-solid fa-chevron-right"
                  style={{ fontSize: "10px", marginRight: "4px" }}
                ></i>{" "}
                Configure
              </p>
            </div>

            <div className="special">
              <i class="fa-solid fa-chart-line"></i>
              <span
                className="side"
                onClick={(e) => {
                  document.getElementById("dash").classList.toggle("itemC_dis");
                  document.getElementById("meta").classList.remove("itemC_dis");
                  document.getElementById("val").classList.remove("itemC_dis");
                  document
                    .getElementById("admini")
                    .classList.remove("itemC_dis");
                }}
              >
                Dashboard <i class="fa-solid fa-chevron-down"></i>
              </span>
            </div>
            <div className="itemD" id="dash">
              <p onClick={(e) => navigate && navigate("/profiling")}>
                {" "}
                <i
                  class="fa-solid fa-chevron-right"
                  style={{ fontSize: "10px", marginRight: "4px" }}
                ></i>{" "}
                Cost Management
              </p>

              <p onClick={(e) => navigate && navigate("/pbiValidation")}>
                {" "}
                <i
                  class="fa-solid fa-chevron-right"
                  style={{ fontSize: "10px", marginRight: "4px" }}
                ></i>{" "}
                Data Quality
              </p>
            </div>

            <div className="special">
              <i class="fa-solid fa-server"></i>
              <span
                className="side"
                onClick={(e) => {
                  document.getElementById("meta").classList.toggle("itemC_dis");
                  document.getElementById("dash").classList.remove("itemC_dis");
                  document.getElementById("val").classList.remove("itemC_dis");
                  document
                    .getElementById("admini")
                    .classList.remove("itemC_dis");
                }}
              >
                Scheduling <i class="fa-solid fa-chevron-down"></i>
              </span>
            </div>
            <div className="itemD" id="meta">
              <a
                onClick={(e) => navigate && navigate("/testcases")}
                href="http://ec2-54-197-121-247.compute-1.amazonaws.com:27020/home"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  marginLeft: "0px",
                  textAlign: "left",
                  color: "white",
                }}
              >
                {" "}
                <i
                  class="fa-solid fa-chevron-right"
                  style={{ fontSize: "8px", marginRight: "4px" }}
                ></i>
                <span
                  className="side"
                  style={{
                    textDecoration: "none",
                    marginLeft: "0px",
                    textAlign: "left",
                  }}
                >
                  Monitoring
                </span>
              </a>
              <a
                onClick={(e) => navigate && navigate("/config")}
                style={{
                  display: "flex",
                  fontSize: "13px",
                  textDecoration: "none",
                  marginLeft: "0px",
                  textAlign: "left",
                  color: "white",
                }}
                // href="http://ec2-54-197-121-247.compute-1.amazonaws.com:27022/docs"
                // target="_blank"
                // rel="noopener noreferrer"
              >
                {" "}
                <i
                  class="fa-solid fa-chevron-right"
                  style={{ fontSize: "8px", marginRight: "4px" }}
                ></i>
                <span
                  className="side"
                  style={{
                    textDecoration: "none",
                    marginLeft: "0px",
                    textAlign: "left",
                  }}
                  onClick={schedulingHandler}
                >
                  Configuration
                </span>
              </a>
            </div>

            <div className="special">
              <i class="fa-solid fa-user"></i>
              <span
                className="side"
                onClick={(e) => {
                  document
                    .getElementById("admini")
                    .classList.toggle("itemC_dis");
                  document.getElementById("dash").classList.remove("itemC_dis");
                  document.getElementById("meta").classList.remove("itemC_dis");
                  document.getElementById("val").classList.remove("itemC_dis");
                }}
              >
                Administration <i class="fa-solid fa-chevron-down"></i>
              </span>
            </div>
            <div className="itemD" id="admini">
              <p onClick={(e) => navigate && navigate("/users")}>
                {" "}
                <i
                  class="fa-solid fa-chevron-right"
                  style={{ fontSize: "10px", marginRight: "4px" }}
                ></i>{" "}
                Users
              </p>

              {/* <p onClick={(e) => navigate && navigate("/role")}>
                {" "}
                <i
                  class="fa-solid fa-chevron-right"
                  style={{ fontSize: "10px", marginRight: "4px" }}
                ></i>
                Role
              </p> */}
            </div>
          </ul>
        </div>
        <div className="bottom">
          {props.childrens}
          {/* <div className="item help" style={{ fontSize: "20px" }}>
            <i className="fa-solid fa-circle-question"></i>
          </div>
          <div className="item profile">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
          <div className="item help" style={{ fontSize: "20px" }}>
          <i class="fa-solid fa-power-off"></i>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
