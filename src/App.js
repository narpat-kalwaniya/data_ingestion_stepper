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
import { DataProvider } from "./components/DataContext";
import "./styles/main.css";
import SectionMenu from "./components/SectionMenu";
// import DummyNavbar from './components/Navbar'
// import Sidebar from './components/Sidebar'
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";

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
    tableData: [],
  });

  // Error state- Page 1 - by Rajesh
  const [errors, setErrors] = useState({
    dataSource: "",
    dataTarget: "",
    application: "",
  });

  const [errors2, setErrors2] = useState({
    data_source_type: "",
    query: null,
    db_name: "",
    schema_name: "",
    table_name: "",
    bucket_name: null,
    full_file_name: null,
    source_entity_name: "",
  });

  // Input validation-1
  const validateInputs = () => {
    const newErrors = {};

    if (
      !formData.CreateDataConnection.dataSource ||
      formData.CreateDataConnection.dataSource === ""
    ) {
      newErrors.dataSource = "This field is required";
    }
    if (
      !formData.CreateDataConnection.dataTarget ||
      formData.CreateDataConnection.dataTarget === ""
    ) {
      newErrors.dataTarget = "This field is required";
    }
    if (
      !formData.CreateDataConnection.application ||
      formData.CreateDataConnection.application === ""
    ) {
      newErrors.application = "This field is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Input validation-2
  const validateInputs2 = () => {
    const newErrors2 = {};

    if (
      formData.sourceEntity.data_source_type ||
      formData.sourceEntity.data_source_type !== ""
    ) {
      if (formData.sourceEntity.data_source_type === "RDBMS-TABLE") {
        if (
          !formData.sourceEntity.db_name ||
          formData.sourceEntity.db_name === ""
        ) {
          newErrors2.db_name = "This field is required";
        }
        if (
          !formData.sourceEntity.schema_name ||
          formData.sourceEntity.schema_name === ""
        ) {
          newErrors2.schema_name = "This field is required";
        }
        if (
          !formData.sourceEntity.table_name ||
          formData.sourceEntity.table_name === ""
        ) {
          newErrors2.table_name = "This field is required";
        }
      }
      if (formData.sourceEntity.data_source_type === "RDBMS-QUERY") {
        if (
          !formData.sourceEntity.query ||
          formData.sourceEntity.query === null
        ) {
          newErrors2.query = "This field is required";
        }
      }
      if (formData.sourceEntity.data_source_type === "Flat File") {
        if (
          !formData.sourceEntity.bucket_name ||
          formData.sourceEntity.bucket_name === null
        ) {
          newErrors2.bucket_name = "This field is required";
        }
        if (
          !formData.sourceEntity.full_file_name ||
          formData.sourceEntity.full_file_name === null
        ) {
          newErrors2.full_file_name = "This field is required";
        }
      }
    } else {
      {
        console.log("hello");
        newErrors2.data_source_type = "This field is required";
      }
    }

    setErrors2(newErrors2);

    return Object.keys(newErrors2).length === 0;
  };

  const totalPagesCount = 9;

  const previousHandler = () => {
    setIsReview(false);
    setStep((step) => step - 1);
  };

  // const nextHandler = () => {
  //   setStep((step) => step + 1);
  // };

  const nextHandler = () => {
    if (step === 1) {
      if (validateInputs()) {
        setStep((step) => step + 1);
      } else {
        setStep((step) => step);
      }
    } else if (step === 2) {
      if (validateInputs2()) {
        setStep((step) => step + 1);
      } else {
        setStep((step) => step);
      }
    } else {
      setStep((step) => step + 1);
    }
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
    setStep((step) => step + 1);
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

  return (
    <div>
      <div className="d-flex">
        <Sidebar />
        <div className="w-100">
          <Navbar />
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
                <SectionMenu step={step} />
                <Col>
                  <Card>
                    {isReview ? (
                      <DataProvider>
                        <ReviewForm
                          step={step}
                          setStep={setStep}
                          isReview={isReview}
                          setIsReview={setIsReview}
                          cancel={closeHandler}
                          formData={formData}
                        ></ReviewForm>
                      </DataProvider>
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
                                errors={errors}
                                errors2={errors2}
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
      </div>
    </div>
  );
}

export default App;
