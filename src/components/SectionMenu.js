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
  "Create Data Connection",
  "Source Entity Selection",
  "Target Schema",
  "Define Data Validation",
  "Define Source Extract Criteria",
  "Target Load Details",
  "Apply Masking",
  "Gather Meta Data",
  "Scheduling",
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
