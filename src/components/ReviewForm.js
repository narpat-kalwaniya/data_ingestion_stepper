import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  FormCheck,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import Success from "./Success";
// import { AiOutlineEdit } from "react-bootstrap-icons";
import { AiOutlineEdit } from "react-icons/ai";
import { DataContext } from "./DataContext";
import safeStringify from "json-stringify-safe";

// import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.css";

const ReviewFrom = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { ingestionData, updateIngestionData } = useContext(DataContext);
  // const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [isExecuteNow, setIsExecuteNow] = useState(false);

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

  const closeHandler = () => {
    // setShowModal(true);
    // setIsReview(true);
    // setStep((step) => 1);
    setShowModal(false);
    // setFormData({});
    // window.localStorage.removeItem(1);
  };
  const handleShow = () => {
    setIsExecuteNow(false);
    setShowModal(true);
  };
  const handleContinue = () => {
    setShowModal(false);
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Execute the pipeline now
      const updatedData = {
        run_now: true,
      };
      updateIngestionData(updatedData);
    } else {
      // Checkbox is unchecked
      const updatedData = {
        run_now: false,
      };
      updateIngestionData(updatedData);
    }
    setIsExecuteNow(!isExecuteNow);
    console.log("final ingestion data checkbox", ingestionData);
  };

  const pipelineNameHandler = (e) => {
    const updatedData = {
      pipeline_name: e.target.value,
    };
    updateIngestionData(updatedData);
  };

  const submitHandler = async (event) => {
    setIsExecuteNow(false);
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Call the sendData function to send the POST request
      await sendData();
    } catch (error) {
      console.error("Error:", error.message);
    }
    setShowModal(false);
  };

  // Function to handle the POST request
  const sendData = async () => {
    props.setIsLoading(true);
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
      setResponse({ ...responseData });
    } catch (error) {
      console.error("Error:", error.message);
    }
    props.setIsLoading(false);
    props.setIsSubmitted(true);
  };

  // console.log("final ingestion data", safeStringify(ingestionData[0]));
  console.log("final ingestion data without stringy", ingestionData);
  console.log("form data final", props.formData);

  const renderTable = (data) => {
    return (
      <Table responsive>
        {/* <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead> */}
        <tbody style={{ fontSize: "12px" }}>
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

  const renderObject = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        return (
          <div key={key}>
            <p style={{ fontWeight: "500" }}>{key}</p>
            {renderObject(value)}
          </div>
        );
      } else {
        return (
          <div key={key} style={{ display: "flex", marginBottom: "10px" }}>
            <span className="key">{key}</span>
            <span className="colon">:</span>
            <span className="value">{value}</span>
          </div>
        );
      }
    });
  };
  console.log("rule", props.formData.tableData[0].validation_rules);
  console.log("final ingestion data", ingestionData);

  const cardBodyRef = useRef(null);

  useEffect(() => {
    const cardBodyNode = cardBodyRef.current;
    if (cardBodyNode) {
      const shouldOverflow =
        cardBodyNode.scrollHeight > cardBodyNode.clientHeight;
      cardBodyNode.classList.toggle("overflow-auto", shouldOverflow);
    }
  }, []);

  return (
    <div>
      {props.isLoading ? null : (
        <Container>
          <div style={{ marginTop: "12px" }}></div>
          {props.isSubmitted ? (
            <Success response={response} />
          ) : (
            <div>
              {/* <div
              style={{
                backgroundColor: "#F7901D",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                display: "flex",
                alignItems: "Center",
                color: "white",
                justifyContent: "space-between",
                height: "50px",
              }}
            > */}
              {/* <Card
              style={
                {
                  // backgroundColor: "#F7901D",
                  // alignItems: "Center",
                  // border: "none",
                  // color: "white",
                  // // justifyContent: "center",
                  // padding: "1%",
                  // borderEndEndRadius: "0px",
                  // borderBottomRightRadius: "0px",
                }
              }
            > */}
              {/* <h5
                style={{
                  marginLeft: "1%",
                }}
              >
                Review Details
              </h5> */}
              {/* </Card> */}
              {/* <Form.Check
                label="Execute Now"
                style={{
                  backgroundColor: "#F7901D",
                  alignItems: "Center",
                  border: "none",
                  color: "white",
                  // justifyContent: "center",
                  marginRight: "1%",
                }}
              /> */}
              {/* </div> */}
              <Container>
                <Card.Body
                  ref={cardBodyRef}
                  style={{
                    minHeight: "60vh",
                    maxHeight: "60vh",
                  }}
                >
                  <Row>
                    <Col>
                      <div>
                        <div c>
                          <div
                            className="d-flex justify-content-between float-right"
                            style={{
                              color: "#000000",
                              alignItems: "flex-start",
                            }}
                          >
                            <p>Data Connection</p>

                            <AiOutlineEdit
                              onClick={editHandler1}
                              s
                            ></AiOutlineEdit>
                          </div>
                          {/* <div
                          style={{
                            position: "relative",
                            overflow: "auto",
                            height: "5px",
                          }}
                        > */}
                          <div className="horizontal-line-1"></div>
                          {/* </div> */}
                        </div>

                        <Card.Body
                        // style={{ justifyItems: "center", alignItems: "center" }}
                        >
                          {Object.entries(
                            props.formData.CreateDataConnection
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              style={{ display: "flex", marginBottom: "10px" }}
                            >
                              <span className="key">{key}</span>
                              <span className="colon">:</span>
                              <span className="value">{value}</span>
                            </div>
                          ))}
                        </Card.Body>
                        <div className="block">
                          <div
                            className="d-flex justify-content-between float-right"
                            style={{ color: "#000000" }}
                          >
                            <p>Source Entity</p>

                            <AiOutlineEdit onClick={editHandler2} />
                          </div>

                          <div className="horizontal-line-1"></div>
                        </div>
                        <Card.Body>
                          {Object.entries(props.formData.sourceEntity).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                <span className="key">{key}</span>
                                <span className="colon">:</span>
                                <span className="value">{value}</span>
                              </div>
                            )
                          )}
                        </Card.Body>
                        <div className="block">
                          <div
                            className="d-flex justify-content-between float-right"
                            style={{ color: "#000000" }}
                          >
                            <p>Target Schema</p>

                            <AiOutlineEdit onClick={editHandler3} />
                          </div>

                          <div className="horizontal-line-1"></div>
                        </div>
                        <Card.Body>
                          <Table responsive>
                            <thead
                              style={{
                                backgroundColor: "#F3F3F3",
                                fontSize: "12px",
                                height: "50px",
                                alignItems: "center",
                              }}
                            >
                              <tr>
                                <th>Column Name</th>
                                <th>Source Datatype</th>
                                <th>Target Datatype</th>
                                <th>Primary Key</th>
                                <th>Business Key</th>
                                <th>Transformation Logic</th>
                              </tr>
                            </thead>
                            <tbody style={{ fontSize: "12px" }}>
                              {props.formData.tableData.map((obj, index) => (
                                <tr
                                  key={index}
                                  style={{
                                    height: "20px",
                                  }}
                                >
                                  <td>{obj.column_name}</td>{" "}
                                  {/* Replace 'key' with the actual key from the object */}
                                  <td>{obj.data_type}</td>{" "}
                                  {/* Replace 'value' with the actual value from the object */}
                                  <td>{obj.target_datatype}</td>{" "}
                                  <td>
                                    <FormCheck
                                      checked={
                                        obj.is_target_primary_key === true
                                      }
                                      disabled={true}
                                    ></FormCheck>
                                  </td>{" "}
                                  <td>
                                    <FormCheck
                                      checked={obj.is_business_key === true}
                                      disabled={true}
                                    ></FormCheck>
                                  </td>{" "}
                                  <td>{obj.transformation_logic}</td>{" "}
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Card.Body>
                        <div className="block">
                          <div
                            className="d-flex justify-content-between float-right"
                            style={{ color: "#000000" }}
                          >
                            <p>Data Validation</p>

                            <AiOutlineEdit onClick={editHandler4} />
                          </div>

                          <div className="horizontal-line-1"></div>
                        </div>
                        <Card.Body>
                          <Table responsive>
                            <thead
                              style={{
                                backgroundColor: "#F3F3F3",
                                fontSize: "12px",
                                height: "50px",
                                alignItems: "center",
                              }}
                            >
                              <tr>
                                <th>Column Name</th>
                                <th>Source Datatype</th>
                                <th>Target Datatype</th>
                                <th>Validation Rule</th>
                                <th>Validation Input</th>
                                <th>Quality Score</th>
                              </tr>
                            </thead>
                            <tbody style={{ fontSize: "12px" }}>
                              {props.formData.tableData.map((obj, index) => (
                                <tr key={index}>
                                  <td>{obj.column_name}</td>{" "}
                                  {/* Replace 'key' with the actual key from the object */}
                                  <td>{obj.data_type}</td>{" "}
                                  {/* Replace 'value' with the actual value from the object */}
                                  <td>{obj.target_datatype}</td>
                                  <td>
                                    {obj.validation_rules.map((obj) => (
                                      <tr>
                                        <td>{obj}</td>
                                      </tr>
                                    ))}
                                  </td>{" "}
                                  <td>{obj.validation_input}</td>{" "}
                                  <td>{obj.quality_score}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Card.Body>
                        <div className="block">
                          <div
                            className="d-flex justify-content-between float-right"
                            style={{ color: "#000000" }}
                          >
                            <p>Source Extract Criteria</p>

                            <AiOutlineEdit onClick={editHandler5} />
                          </div>

                          <div className="horizontal-line-1"></div>
                        </div>
                        <Card.Body>
                          {Object.entries(
                            props.formData.DefineSourceExtractCriteria
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              style={{ display: "flex", marginBottom: "10px" }}
                            >
                              <span className="key">{key}</span>
                              <span className="colon">:</span>
                              <span className="value">{value}</span>
                            </div>
                          ))}
                        </Card.Body>
                        <div className="block">
                          <div
                            className="d-flex justify-content-between float-right"
                            style={{ color: "#000000" }}
                          >
                            <p>Target Load Details</p>

                            <AiOutlineEdit onClick={editHandler6} />
                          </div>

                          <div className="horizontal-line-1"></div>
                        </div>
                        <Card.Body>
                          <div>
                            {renderObject(props.formData.targetLoadDetails)}
                          </div>
                        </Card.Body>
                        <div className="block">
                          <div
                            className="d-flex justify-content-between float-right"
                            style={{ color: "#000000" }}
                          >
                            <p>Masking</p>

                            <AiOutlineEdit onClick={editHandler7} />
                          </div>

                          <div className="horizontal-line-1"></div>
                        </div>
                        <Card.Body>
                          <Table responsive>
                            <thead
                              style={{
                                backgroundColor: "#F3F3F3",
                                fontSize: "12px",
                                height: "50px",
                                alignItems: "center",
                              }}
                            >
                              <tr>
                                <th>Column Name</th>
                                <th>Mask/Tokenize</th>
                                <th>Masking Logic</th>
                              </tr>
                            </thead>
                            <tbody style={{ fontSize: "12px" }}>
                              {props.formData.tableData.map((obj, index) => (
                                <tr key={index}>
                                  <td>{obj.column_name}</td>{" "}
                                  {/* Replace 'key' with the actual key from the object */}
                                  <td>
                                    <FormCheck
                                      checked={obj.is_masking === true}
                                      disabled={true}
                                    ></FormCheck>
                                  </td>{" "}
                                  {/* Replace 'value' with the actual value from the object */}
                                  <td>{obj.masking_logic}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Card.Body>
                        <div className="block">
                          <div
                            className="d-flex justify-content-between float-right"
                            style={{ color: "#000000" }}
                          >
                            <p>Meta Data</p>

                            <AiOutlineEdit onClick={editHandler8} />
                          </div>

                          <div className="horizontal-line-1"></div>
                        </div>
                        <Card.Body>
                          {Object.entries(props.formData.GatherMetaData).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                style={{
                                  display: "flex",
                                  marginBottom: "10px",
                                }}
                              >
                                <span className="key">{key}</span>
                                <span className="colon">:</span>
                                <span className="value">{value}</span>
                              </div>
                            )
                          )}
                        </Card.Body>
                        {/* <Card.Header className="d-flex justify-content-between float-right">
                          <h5>Scheduling</h5>
                          <button
                            style={{ backgroundColor: "#49494A" }}
                            onClick={editHandler9}
                          >
                            <  AiOutlineEdit></  AiOutlineEdit>
                          </button>
                        </Card.Header>
                        <Card.Body></Card.Body> */}
                      </div>
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
                  onClick={handleShow}
                  // disabled={step == 1}
                >
                  Submit
                </button>
                <Modal
                  show={showModal}
                  onHide={closeHandler}
                  style={{ fontSize: "14px", color: "#4F4F4F" }}
                >
                  <Modal.Header closeButton>
                    {/* <Modal.Title>Modal heading</Modal.Title> */}
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to submit the pipeline?
                    <FormCheck
                      style={{ marginTop: "10px" }}
                      label="I also want to execute the pipeline now."
                      onChange={handleCheckboxChange}
                    ></FormCheck>
                    {isExecuteNow ? (
                      <div style={{ marginTop: "10px" }}>
                        <Row>
                          <Col xs={4}>
                            <Form.Label>Pipeline Name:</Form.Label>
                          </Col>
                          <Col xs={6}>
                            <Form.Control
                              name="business_tags"
                              // value={formData.GatherMetaData.business_tags}
                              onChange={pipelineNameHandler}
                              className="custom-select custom-style"
                            />
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      className="btn-c"
                      variant="secondary"
                      onClick={closeHandler}
                    >
                      {" "}
                      No, Cancel
                    </button>
                    <button
                      className="btn-s-1"
                      variant="primary"
                      onClick={submitHandler}
                    >
                      Yes, Submit
                    </button>
                  </Modal.Footer>
                </Modal>
              </Card.Footer>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default ReviewFrom;
