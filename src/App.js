import { useState, useEffect, useRef } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { DataValidation } from "./components/DefineDataValidation";
import "bootstrap/dist/css/bootstrap.css";
import Stepper from "./components/Stepper";
import Header from "./components/Header";
import { Progressbar } from "./components/ProgressBar";
import ReviewForm from "./components/ReviewForm";
import CreateDataConnection from "./components/CreateDataConnection";
import "./styles/main.css";

function App() {
  const [step, setStep] = useState(1);
  const [isReview, setIsReview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    CreateDataConnection: {
      dataSource: "",
      dataTarget: "",
      application: "",
    },
    sourceEntity: {
      data_source_type: "",
      query: null,
      db_name: "",
      schema_name: "",
      table_name: "",
      bucket_name: null,
      full_file_name: null,
      source_entity_name: "",
      connection_id: null,
    },
    TargetSchema: [],
  });

  const totalPagesCount = 9;

  const previousHandler = () => {
    setIsReview(false);
    setStep((step) => step - 1);
  };

  const nextHandler = () => {
    setStep((step) => step + 1);
  };

  const closeHandler = () => {
    setShowModal(true);
    setIsReview(false);
    setStep((step) => 1);
    setShowModal(false);
    // setFormData({});
    // window.localStorage.removeItem(1);
  };
  const handleShow = () => setShowModal(true);
  const handleContinue = () => {
    setShowModal(false);
  };

  const reviewHandler = () => {
    setIsReview(true);
  };

  const updateFormData = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const containerRef = useRef(null);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (container.scrollHeight > container.clientHeight) {
  //     container.style.overflowY = "scroll";
  //   } else {
  //     container.style.overflowY = "hidden";
  //   }
  // }, []);

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

  return (
    <div>
      <Container className="h-100">
        <Card className="Card-outer">
          <Row className="m-2">
            <Col>
              <Card className="Card-progressbar">
                <Progressbar step={step} />
              </Card>
            </Col>
          </Row>
          <Row className="m-2">
            <Col sm={2}>
              <ListGroup style={{ maxWidth: "200px" }}>
                {sections.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    style={{
                      backgroundColor: "#e9ecef",
                      color: index === 2 ? "#F7901D" : "darkgray",
                      border: "none",
                    }}
                  >
                    {index + 1}. {item}
                  </ListGroup.Item>
                ))}
                <ListGroup.Item
                  style={{
                    backgroundColor: "#e9ecef",
                    color: "darkgray",
                    border: "none",
                  }}
                >
                  Review
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <Card>
                {isReview ? (
                  <ReviewForm
                    step={step}
                    setStep={setStep}
                    isReview={isReview}
                    setIsReview={setIsReview}
                    cancel={closeHandler}
                    formData={formData}
                  ></ReviewForm>
                ) : (
                  <div>
                    <Card.Header className="header">
                      <Header step={step}></Header>
                    </Card.Header>
                    <div>
                      <Container
                        // ref={containerRef}
                        style={{
                          minHeight: "65vh",
                          maxHeight: "65vh",
                          overflowY: "scroll",
                        }}
                      >
                        <Card.Body>
                          <Stepper
                            step={step}
                            formData={formData}
                            updateFormData={updateFormData}
                          />
                        </Card.Body>
                      </Container>
                    </div>
                    <Card.Footer className="d-flex justify-content-between float-right">
                      <Col>
                        <button
                          className="btn-c"
                          onClick={handleShow}
                          disabled={step === 1}
                        >
                          Close
                        </button>
                        <Modal show={showModal} onHide={closeHandler}>
                          <Modal.Header closeButton>
                            {/* <Modal.Title>Modal heading</Modal.Title> */}
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you want to close? Any unsaved data
                            will be lost.
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              className="btn-c"
                              variant="secondary"
                              onClick={closeHandler}
                            >
                              Yes, Close
                            </button>
                            <button
                              className="btn-s-1"
                              variant="primary"
                              onClick={handleContinue}
                            >
                              No, Continue
                            </button>
                          </Modal.Footer>
                        </Modal>
                      </Col>
                      <button
                        className="btn-c "
                        onClick={previousHandler}
                        disabled={step === 1}
                        style={{
                          borderTopRightRadius: "0px",
                          borderBottomRightRadius: "0px",
                        }}
                      >
                        Back
                      </button>
                      {step === totalPagesCount ? (
                        <button
                          className="btn-s-1 "
                          onClick={reviewHandler}
                          style={{
                            borderTopLeftRadius: "0px",
                            borderBottomLeftRadius: "0px",
                          }}
                        >
                          Review & Submit
                        </button>
                      ) : (
                        <button
                          className="btn-s "
                          onClick={nextHandler}
                          style={{
                            borderTopLeftRadius: "0px",
                            borderBottomLeftRadius: "0px",
                          }}
                        >
                          Next
                        </button>
                      )}
                    </Card.Footer>
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default App;
