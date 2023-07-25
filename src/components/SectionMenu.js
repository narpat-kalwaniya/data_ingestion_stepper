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
import { useState } from "react";
import "../App.css";

const sections = [
  "Data Connection",
  "Source Entity Selection",
  "Target Schema",
  "Data Validation",
  "Source Extract Criteria",
  "Target Load Details",
  "Masking",
  "Meta Data",
  "Review",
  // "Scheduling",
  // "Review",
];

const SectionMenu = (props) => {
  const handleHover = () => {
    // Handle hover event
  };
  const reviewHandler = () => {
    props.setIsReview(!props.isReview);
  };

  const stepChangeHandler = (index) => {
    console.log("section clicked", index);
    if (index <= props.step - 1) {
      props.setStep(index);
      props.setIsReview(false);
    }
  };
  return (
    <div style={{ width: "250px" }}>
      <Col>
        <ListGroup>
          {sections.map((item, index) => (
            <ListGroup.Item
              key={index}
              style={{
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
                  {index > 0 && index < 9 && (
                    <div
                      className="vertical-line"
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
                  {/* {index > 0 && (
                    <div
                      className="vertical-line"
                      style={{ backgroundColor: "darkgray" }}
                    />
                  )} */}
                </div>
                <span
                  onClick={(e) => stepChangeHandler(index + 1)}
                  style={{ cursor: "pointer" }}
                >
                  {item}
                </span>
              </div>
            </ListGroup.Item>
          ))}
          {/* <ListGroup.Item
          style={{
            borderColor: "#18749C",
            color: "#18749C",
            borderWidth: "1px",
            borderRadius: "5px",
            ":hover": {
              backgroundColor: "red",
              color: "black",
            },
          }}
          onMouseEnter={handleHover}
        >
          <button
            style={{
              backgroundColor: "transparent",
              fontWeight: "400",
              fontSize: "16px",
            }}
            onClick={reviewHandler}
          >
            Review
          </button>
        </ListGroup.Item> */}
        </ListGroup>
      </Col>
    </div>
  );
};

export default SectionMenu;
