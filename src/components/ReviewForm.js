import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Success from "./Success";
import { PencilSquare } from "react-bootstrap-icons";
import CreateDataConnection from "./CreateDataConnection";

const ReviewFrom = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState({});

  const editHandler = () => {
    props.setStep((step) => 1);
    props.setIsReview(false);
  };

  const submitHandler = () => {
    setIsSubmitted(true);
  };
  const d = props.pageAnswers;

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem(2));
    setData(data);
    // console.log(data);
    // alert(data);
    // console.log("object is not available");
  }, [props.step]);
  // const items = Object.entries(data).map((key, value) => {
  //   return (
  //     <div>
  //       {key}
  //       {value}
  //     </div>
  //   );
  // });

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
                <Card.Body>
                  {Object.entries(props.pageAnswers).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}: </strong> {value}
                    </div>
                  ))}
                </Card.Body>
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
