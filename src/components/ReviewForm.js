import React, { useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import Success from "./Success";
import { PencilSquare } from "react-bootstrap-icons";

const ReviewFrom = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const editHandler1 = () => {
    props.setStep((step) => 1);
    props.setIsReview(false);
  };
  const editHandler2 = () => {
    props.setStep((step) => 2);
    props.setIsReview(false);
  };

  const submitHandler = () => {
    setIsSubmitted(true);
  };

  console.log(props.formData);
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
                  <h5>Create Data Connection</h5>
                  <button
                    style={{ backgroundColor: "#49494A" }}
                    onClick={editHandler1}
                  >
                    <PencilSquare></PencilSquare>
                  </button>
                </Card.Header>
                <Card.Body>
                  <Table bordered>
                    {/* <thead>
                      <tr>
                        <th>Key</th>
                        <th>Value</th>
                      </tr>
                    </thead> */}
                    <tbody>
                      {Object.entries(props.formData.CreateDataConnection).map(
                        ([key, value]) => (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
                <Card.Header className="d-flex justify-content-between float-right">
                  <h5>Source Entity Selection</h5>
                  <button
                    style={{ backgroundColor: "#49494A" }}
                    onClick={editHandler2}
                  >
                    <PencilSquare></PencilSquare>
                  </button>
                </Card.Header>
                <Card.Body>
                  <Table striped bordered>
                    {/* <thead>
                      <tr>
                        <th>Key</th>
                        <th>Value</th>
                      </tr>
                    </thead> */}
                    <tbody>
                      {Object.entries(props.formData.sourceEntity).map(
                        ([key, value]) => (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
                <Card.Header className="d-flex justify-content-between float-right">
                  <h5>Target Schema</h5>
                  <button
                    style={{ backgroundColor: "#49494A" }}
                    onClick={editHandler2}
                  >
                    <PencilSquare></PencilSquare>
                  </button>
                </Card.Header>
                <Card.Body>
                  <Table>
                    <thead>
                      <tr>
                        <th>Column Name</th>
                        <th>Source Datatype</th>
                        <th>Target Datatype</th>
                        <th>Primary Key</th>
                        <th>Business Key</th>
                        <th>Transformation Logic</th>
                      </tr>
                    </thead>
                    <tbody>
                      {props.formData.tableData.map((obj, index) => (
                        <tr key={index}>
                          <td>{obj.column_name}</td>{" "}
                          {/* Replace 'key' with the actual key from the object */}
                          <td>{obj.data_type}</td>{" "}
                          {/* Replace 'value' with the actual value from the object */}
                          <td>{obj.target_datatype}</td> <td></td> <td></td>{" "}
                          <td></td>{" "}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>

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
