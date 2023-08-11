import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Modal,
  ListGroup,
} from "react-bootstrap";

import "../Migration/AppMig.css";

const sections = [
  "Validate Query",
  "Pre Data Validation",
  "Post Data Validation",
];

const SectionMenuTrans = (props) => {
  const handleHover = () => {
    // Handle hover event
  };
  return (
    <div style={{ width: "214px", padding: "0px" }}>
      <Col>
        <ListGroup>
          {sections.map((item, index) => (
            <ListGroup.Item
              key={index}
              style={{
                height: "100px",
                backgroundColor: "#FCFCFC",
                color: index <= props.step - 1 ? "#EA943D" : "darkgray",
                fontSize: index === props.step - 1 ? "14px" : "13px",
                fontWeight: index <= props.step - 1 ? 500 : 400,
                border: "none",
                borderRadius: "none",
                transition: "ease-in-out 0.03s",
              }}
            >
              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center"
                  // style={{ position: "relative" }}
                >
                  {index > 0 && index < 2 && (
                    <div
                      className="mig-vertical-line"
                      style={{
                        backgroundColor:
                          index <= props.step - 1 ? "#EA943D" : "darkgray",
                        transition: "ease-in-out 0.03s",
                      }}
                    />
                  )}
                  <div
                    className="circle"
                    style={{
                      borderColor:
                        index <= props.step - 1 ? "#EA943D" : "darkgray",
                      backgroundColor:
                        index < props.step - 1 ? "#EA943D" : "white",
                      transition: "ease-in-out 0.03s",
                    }}
                  ></div>
                </div>
                {item}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </div>
  );
};

export default SectionMenuTrans;
