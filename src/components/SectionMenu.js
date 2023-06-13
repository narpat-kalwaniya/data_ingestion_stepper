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

const sections = [
  "Data Connection",
  "Source Entity Selection",
  "Target Schema",
  "Data Validation",
  "Source Extract Criteria",
  "Target Load Details",
  "Masking",
  "Meta Data",
  // "Scheduling",
  // "Review",
];

const SectionMenu = (props) => {
  const reviewHandler = () => {
    props.setIsReview(!props.isReview);
  };
  return (
    <Col sm={2}>
      <ListGroup style={{ maxWidth: "200px" }}>
        {sections.map((item, index) => (
          <ListGroup.Item
            key={index}
            style={{
              backgroundColor: index === props.step - 1 ? "#F7901D" : "#e9ecef",
              color: index === props.step - 1 ? "white" : "darkgray",
              border: "none",
              borderRadius: "2px",
              transition: "ease-in-out 0.03s",
            }}
          >
            {index + 1}. {item}
          </ListGroup.Item>
        ))}
        <ListGroup.Item
          style={{
            backgroundColor: "#18749C",
            color: "white",
            border: "none",
            borderRadius: "2px",
          }}
        >
          <button
            style={{
              backgroundColor: "transparent",
              color: "white",
              fontWeight: "400",
              fontSize: "16px",
            }}
            onClick={reviewHandler}
          >
            Review
          </button>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default SectionMenu;
