import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Success from "./Success";
import { PencilSquare } from "react-bootstrap-icons";

const ReviewFrom = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const editHandler = () => {
    props.step = 1
  }

  const submitHandler = () => {
    setIsSubmitted(true);
  };
  return (
    <div>
      <Row>
        <Col>
          {isSubmitted ? (
            <p>Thank you. This page can be closed now!</p>
          ) : (
            <Card>
              <div>
                <Card.Header className="d-flex justify-content-between float-right">
                  <h5>Section 1</h5>
                  <button
                    style={{ backgroundColor: "#49494A" }}
                    onClick={editHandler}
                  >
                    <PencilSquare></PencilSquare>
                  </button>
                </Card.Header>
                <Card.Body>Review Items</Card.Body>
                <Card.Header className="d-flex justify-content-between float-right">
                  <h5>Section 2</h5>
                  <button style={{ backgroundColor: "#49494A" }}>
                    <PencilSquare></PencilSquare>
                  </button>
                </Card.Header>
                <Card.Body>Review Items</Card.Body>

                <Card.Footer className="d-flex justify-content-between">
                  <button
                    className="btn-c"
                    onClick={() => props.cancel()}
                    // disabled={step == 1}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-s-1"
                    onClick={submitHandler}
                    // disabled={step == 1}
                  >
                    Submit
                  </button>
                </Card.Footer>
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ReviewFrom;
