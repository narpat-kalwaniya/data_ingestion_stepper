import React, { useState, useContext } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import Success from "./Success";
import { PencilSquare } from "react-bootstrap-icons";
import { DataContext } from "./DataContext";
import safeStringify from "json-stringify-safe";
// import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.css";

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

  const editHandler3 = () => {
    props.setStep((step) => 3);
    props.setIsReview(false);
  };
  const editHandler4 = () => {
    props.setStep((step) => 4);
    props.setIsReview(false);
  };
  const editHandler5 = () => {
    props.setStep((step) => 5);
    props.setIsReview(false);
  };

  const editHandler6 = () => {
    props.setStep((step) => 6);
    props.setIsReview(false);
  };

  const editHandler7 = () => {
    props.setStep((step) => 7);
    props.setIsReview(false);
  };
  const editHandler8 = () => {
    props.setStep((step) => 8);
    props.setIsReview(false);
  };

  const editHandler9 = () => {
    props.setStep((step) => 9);
    props.setIsReview(false);
  };

  const submitHandler = async (event) => {
    setIsSubmitted(true);
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Call the sendData function to send the POST request
      await sendData();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // post request send the final ingestion data
  const { ingestionData } = useContext(DataContext);

  // Function to handle the POST request
  const sendData = async () => {
    try {
      const response = await fetch(
        "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/ingeststore/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: safeStringify(ingestionData[0]),
        }
      );

      if (!response.ok) {
        throw new Error("Error sending data");
      }

      // Handle the response if needed
      const responseData = await response.json();
      console.log("Response:", responseData);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  console.log("final ingestion data", safeStringify(ingestionData[0]));
  console.log("final ingestion data without stringy", ingestionData);
  console.log(props.formData);

  const renderTable = (data) => {
    return (
      <Table>
        {/* <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead> */}
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{typeof value === "object" ? renderTable(value) : value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  return (
    <div>
      <Container>
        <div style={{ marginTop: "7px" }}></div>
        <Card>
          <div
            style={{
              backgroundColor: "#F7901D",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <Card
              className="d-flex justify-content-between Card-progressbar"
              style={{
                backgroundColor: "#F7901D",
                alignItems: "Center",
                border: "none",
                color: "white",
                justifyContent: "center",
                padding: "1%",
                borderEndEndRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            >
              <h5>Review Details</h5>
            </Card>
          </div>
          <Container
            style={{
              minHeight: "70vh",
              maxHeight: "70vh",
              overflowY: "scroll",
            }}
          >
            <Card.Body>
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
                              {Object.entries(
                                props.formData.CreateDataConnection
                              ).map(([key, value]) => (
                                <tr key={key}>
                                  <td>{key}</td>
                                  <td>{value}</td>
                                </tr>
                              ))}
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
                            onClick={editHandler3}
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
                                  <td>{obj.target_datatype}</td> <td></td>{" "}
                                  <td></td> <td></td>{" "}
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Card.Body>
                        <Card.Header className="d-flex justify-content-between float-right">
                          <h5>Define Data Validation</h5>
                          <button
                            style={{ backgroundColor: "#49494A" }}
                            onClick={editHandler4}
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
                                <th>Validation Rule</th>
                                <th>Validation Input</th>
                              </tr>
                            </thead>
                            <tbody>
                              {props.formData.tableData.map((obj, index) => (
                                <tr key={index}>
                                  <td>{obj.column_name}</td>{" "}
                                  {/* Replace 'key' with the actual key from the object */}
                                  <td>{obj.data_type}</td>{" "}
                                  {/* Replace 'value' with the actual value from the object */}
                                  <td>{obj.target_datatype}</td> <td></td>{" "}
                                  <td></td> <td></td> <td></td>
                                  <td></td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Card.Body>
                        <Card.Header className="d-flex justify-content-between float-right">
                          <h5>Source Extract Criteria</h5>
                          <button
                            style={{ backgroundColor: "#49494A" }}
                            onClick={editHandler5}
                          >
                            <PencilSquare></PencilSquare>
                          </button>
                        </Card.Header>
                        <Card.Body></Card.Body>
                        <Card.Header className="d-flex justify-content-between float-right">
                          <h5>Target Load Details</h5>
                          <button
                            style={{ backgroundColor: "#49494A" }}
                            onClick={editHandler6}
                          >
                            <PencilSquare></PencilSquare>
                          </button>
                        </Card.Header>
                        <Card.Body>
                          <div>
                            {renderTable(props.formData.targetLoadDetails)}
                          </div>
                        </Card.Body>
                        <Card.Header className="d-flex justify-content-between float-right">
                          <h5>Masking</h5>
                          <button
                            style={{ backgroundColor: "#49494A" }}
                            onClick={editHandler7}
                          >
                            <PencilSquare></PencilSquare>
                          </button>
                        </Card.Header>
                        <Card.Body></Card.Body>
                        <Card.Header className="d-flex justify-content-between float-right">
                          <h5>Meta Data</h5>
                          <button
                            style={{ backgroundColor: "#49494A" }}
                            onClick={editHandler8}
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
                              {Object.entries(
                                props.formData.GatherMetaData
                              ).map(([key, value]) => (
                                <tr key={key}>
                                  <td>{key}</td>
                                  <td>{value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Card.Body>
                        {/* <Card.Header className="d-flex justify-content-between float-right">
                          <h5>Scheduling</h5>
                          <button
                            style={{ backgroundColor: "#49494A" }}
                            onClick={editHandler9}
                          >
                            <PencilSquare></PencilSquare>
                          </button>
                        </Card.Header>
                        <Card.Body></Card.Body> */}
                      </div>
                    </Card>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Container>
          <Card.Footer className="d-flex justify-content-between float-right">
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
        </Card>
      </Container>
    </div>
  );
};

export default ReviewFrom;
