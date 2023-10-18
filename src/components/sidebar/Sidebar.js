import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  const navigateRouter = useNavigate();
  const [cross, setCross] = useState("bar");

  const handleClick = (e) => {
    if (cross === "bar") {
      document.querySelector(".sidebar").style.width = "190px";
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
      document.querySelector(".sidebar").style.width = "190px";
      document.querySelector("#checkbox").checked = true;
      setCross("cross");
    }

    const all = document.querySelectorAll(".expand");

    for (let i = 0; i < all.length; i++) {
      all[i].classList.remove("expandDis");
    }
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
        <div
          style={{
            paddingLeft: "20px",
            paddingTop: "15px",
            width: "20px",
            height: "30px",
          }}
          onClick={() => {
            navigateRouter && navigateRouter("/home");
          }}
        >
          <i class="fa-solid fa-house" type="button"></i>
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
                navigateRouter && navigateRouter("/pipelines");
              }}
            >
              <i class="fas fa-project-diagram"></i>
              <span className="side">Pipelines</span>
            </li>
            <li
              onClick={() => {
                navigateRouter && navigateRouter("/dataObservability");
              }}
            >
              <i class="fas fa-chart-line"></i>
              <span className="side">Observability</span>
            </li>

            <li
              onClick={() => {
                navigate && navigate("/exploreDatasets");
              }}
            >
              {/* <i class="fa-solid fa-book-open"></i> */}
              <i className="fa-solid fa-database"></i>
              <a
                href="http://3.15.237.154:9002/ingestion"
                className="side"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="side" style={{ marginLeft: "-5px" }}>
                  {" "}
                  Governance
                </span>
              </a>
            </li>
            <li
              onClick={() => {
                navigateRouter && navigateRouter("/monitoring");
              }}
            >
              {/* <i class="fa-solid fa-book-open"></i> */}
              <i className="fa-solid fa-watchman-monitoring"></i>
              <a
                // href="http://3.15.237.154:9002/ingestion"
                className="side"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="side" style={{ marginLeft: "-5px" }}>
                  {" "}
                  Monitoring
                </span>
              </a>
            </li>
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
                    fontSize: "13px",
                  }}
                >
                  Monitoring
                </span>
              </a>
              <a
                onClick={() => {
                  navigateRouter && navigateRouter("/scheduling/configuration");
                }}
                style={{
                  display: "flex",
                  fontSize: "13px",
                  textDecoration: "none",
                  marginLeft: "0px",
                  textAlign: "left",
                  color: "white",
                  marginTop: "10px",
                }}
              >
                {" "}
                <i
                  class="fa-solid fa-chevron-right"
                  style={{
                    fontSize: "8px",
                    marginRight: "4px",
                    marginTop: "6px",
                  }}
                ></i>
                <span
                  className="side"
                  style={{
                    textDecoration: "none",
                    marginLeft: "0px",
                    textAlign: "left",
                  }}
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
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
