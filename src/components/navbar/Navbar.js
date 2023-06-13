import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { NotificationsNoneOutlinedIcon } from "@mui/icons-material";
import "./navbar.scss";
// import Navigation from "../Navigation/Navigation";
import { auth } from "../../services/firebase";

const Navbar = (props) => {
  // const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    console.log(cMonth);
    if (cDay < 10) {
      cDay = `0${cDay}`;
    }
    switch (cMonth) {
      case 1:
        cMonth = "Jan";
        break;
      case 2:
        cMonth = "Feb";
        break;
      case 3:
        cMonth = "March";
        break;
      case 4:
        cMonth = "Apr";
        break;
      case 5:
        cMonth = "Jun";
        break;
      case 6:
        cMonth = "July";
        break;
      case 8:
        cMonth = "Aug";
        break;
      case 9:
        cMonth = "Sep";
        break;
      case 10:
        cMonth = "Oct";
        break;

      case 11:
        cMonth = "Nov";
        break;
      case 12:
        cMonth = "Dec";
        break;
      default:
        cMonth = "No";
    }

    setDate(`${cDay}/${cMonth}/${cYear}`);
  }, []);

  setInterval(() => {
    let current = new Date();
    let current_hours = current.getHours();
    let current_minutes = current.getMinutes();
    let current_seconds = current.getSeconds();
    if (current_hours < 10) {
      current_hours = `0${current_hours}`;
    } else if (current_minutes < 10) {
      current_minutes = `0${current_minutes}`;
    } else if (current_seconds < 10) {
      current_seconds = `0${current_seconds}`;
    }

    let cTime = current_hours + ":" + current_minutes + ":" + current_seconds;
    setTime(`${cTime}`);
  }, 1000);

  return (
    <header
      className="header"
      style={{
        background: "white",
        boxShadow: "0 2px 2px -2px rgba(0,0,0,.5)",
      }}
    >
      {/* <Link to="/" style={{ textDecoration: "none" }}> */}
      <div
        style={{ background: "white", position: "absolute", margin: "5px 5px" }}
      >
        <img
          src="https://www.tigeranalytics.com/wp-content/uploads/logo.png"
          width={100}
          height={50}
          alt=""
        />
      </div>
      {/* </Link> */}
      <div
        className="wrapper"
        style={{ display: "flex", alignItems: "center" }}
      >
        {/* <Link to="/" style={{ textDecoration: "none" }}> */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="backI"></div>
          <span>
            <strong
              style={{
                top: "16px",
                left: "220px",
                margin: "0 auto 0 90px",
                height: "19px",
                textAlign: "left",
                paddingRight: "60px",
                letterSpacing: "0.13px",
                color: "white",
                // textTransform: "uppercase",
                opacity: "1",
                fontSize: "19px",
                fontWeight: "1000",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: "#1C1C1C" }}>Snowflake Data Fabric </span>
              {/* <span style={{ color: "orange" }}>D</span>ata{" "}
              <span style={{ color: "orange" }}>F</span>abric */}
            </strong>
          </span>
        </div>
        {/* </Link> */}

        {/* <div className="items">
          <div className="item">
            <p onClick={(e) => navigate("/home")}> Home</p>
          </div>
          <div className="item">
            <p onClick={(e) => navigate("/connections")}>Connections</p>
          </div>
          <div className="item">
            <p onClick={(e) => navigate("/projects")}> Projects</p>
          </div>
          <div className="item">
            <p onClick={(e) => navigate("/datasets")}> DataSets</p>
            
          </div>

          <div className="item">
            <p onClick={(e) => navigate("/profiling")}> Profiling</p>
          </div>

          <div className="item">
            <p onClick={(e) => navigate("/validate")}>Validation</p>
          </div>
          <div className="itemC">
            <div className="mainM">
              <p>Dashboard <i class="fa-solid fa-chevron-down"></i></p>
            </div>
            <div className="subitem">
              <span onClick={(e) => navigate("/profiling")}> Profiling</span>

              <span onClick={(e) => navigate("/validate")}>Validation</span>
            </div>
          </div>
          <div className="itemC">
            <div className="mainM">
              <p>MetaData <i class="fa-solid fa-chevron-down"></i></p>
            </div>
            <div className="subitem">
              <span onClick={(e) => navigate("/testcases")}>Testcases</span>

              <span onClick={(e) => navigate("/config")}>config</span>
            </div>
          </div>
          <div className="itemC">
            <div className="mainM">
              <p>Administration <i class="fa-solid fa-chevron-down"></i></p>
            </div>
            <div className="subitem">
              <span onClick={(e) => navigate("/users")}> Users</span>

              <span onClick={(e) => navigate("/role")}>Role</span>
              
            </div>
          </div>
        </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <div className="time">
            <span> {date}</span>
          </div>
          <div className="time">
            <span> {time}</span>
          </div> */}
          <div
            style={{
              color: "#1C1C1",
              letterSpacing: "0.13px",
              opacity: "0.7",
              fontWeight: "1000",
            }}
          >
            {props.user.displayName}
          </div>

          <div className="bottom" style={{ display: "flex" }}>
            <div className="item profile">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </div>

            {/* <div className="item noti">
              <NotificationsNoneOutlinedIcon className="icon" />
              <div className="counter">1</div>
            </div> */}

            <div
              className="item help"
              style={{
                fontSize: "20px",
                color: "#1C1C1C",
                // backgroundColor: "#1C1C1C",
                borderRadius: "50%",
              }}
            >
              <i
                class="fa-solid fa-power-off"
                onClick={() => {
                  auth.signOut();
                  window.location.reload();
                }}
              ></i>
            </div>
          </div>
          {/* <div
          style={{
            float: "right",
            marginRight: "20px",
            color: "white",
            cursor: "pointer",
            position: "relative",
          }}
          className="add"
        >
          <i
            class="fa-solid fa-plus"
            onClick={(e) => {
              document.querySelector(".sub").classList.toggle("dis");
            }}
          ></i>
          <div
            style={{
              position: "absolute",
              top: "20px",
              background: "white",
              right: "5px",
            }}
            className="sub"
          >
            <div className="pC">
              <span
                onClick={() => {
                  navigate("/create-project");
                  document.querySelector(".sub").classList.toggle("dis");
                }}
              >
                Create Projects
              </span>
              <span
                onClick={() => {
                  navigate("datasets/create-dataset");
                  document.querySelector(".sub").classList.toggle("dis");
                }}
              >
                Create Dataset
              </span>
              <span
                onClick={() => {
                  navigate("/create-connection");
                  document.querySelector(".sub").classList.toggle("dis");
                }}
              >
                Create Connections
              </span>
              <span
                onClick={() => {
                  navigate("/create-user");
                  document.querySelector(".sub").classList.toggle("dis");
                }}
              >
                Create User
              </span>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
