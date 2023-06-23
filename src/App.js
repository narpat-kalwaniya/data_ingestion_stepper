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
import Slider, { Progressbar } from "./components/ProgressBar";
import ReviewForm from "./components/ReviewForm";
import CreateDataConnection from "./components/CreateDataConnection";
import { DataProvider } from "./components/DataContext";
import "./styles/main.css";
import SectionMenu from "./components/SectionMenu";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import ListingPage from "./components/listing/SearchNavbar";
import SimpleDialogDemo from "./components/buttons/ButtonPages";
import LoginPage from "./components/auth/login/Login";
import firebase from "./services/firebase";
import { FiArrowLeft } from "react-icons/fi";
import { ProgressBar } from "react-bootstrap";
import Scheduling from "./components/Scheduling";
import Home from "./components/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const [step, setStep] = useState(1);
  const [isReview, setIsReview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateTargetLoad, setUpdateTargetLoad] = useState(false);
  const [showMainPage, setshowMainPage] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isHome, setIsHome] = useState(true);

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
    DefineSourceExtractCriteria: {
      source_entity_type: "",
      is_select_distinct: false,
      incremental_by: "",
      incremental_start_time: "",
      incremental_end_time: "",
      incremental_start_sequence: "",
      incremental_end_sequence: "",
      default_start_date: "",
      default_start_seq: "",
      filter: "",
      order_by: "",
    },
    targetLoadDetails: {
      target_entity_name: "",
      target_load_type: "",
      DataQualityMoniter: {
        alert: "",
        abort: "",
      },
      RecordCountChangesMoniter: {
        alert: "",
        abort: "",
      },
      is_mantain_a_copy_in_datalake: false,
      datalake_connection: "",
      datalake_file_format: "",
      datalake_target_template: "",
    },
    GatherMetaData: {
      business_tags: "",
      description: "",
      owner: "",
      email: "",
      success_email_list: "",
      failure_email_list: "",
    },
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

  useEffect(() => {
    const requestData = {
      data_source_type: formData.sourceEntity.data_source_type,
      query: formData.sourceEntity.query,
      db_name: formData.sourceEntity.db_name,
      schema_name: formData.sourceEntity.schema_name,
      table_name: formData.sourceEntity.table_name,
      bucket_name: formData.sourceEntity.bucket_name,
      full_file_name: formData.sourceEntity.full_file_name,
      source_entity_name: `${formData.sourceEntity.db_name}.${formData.sourceEntity.schema_name}.${formData.sourceEntity.table_name}`,
      connection_id: formData.sourceEntity.connection_id,
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/getcolumns/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          if (Array.isArray(responseData)) {
            responseData.forEach((object) => {});
            console.log("response data", responseData);
            // setTableData(responseData);

            const updatedFormData = {
              ...formData,
              tableData: responseData,
            };
            updateFormData(updatedFormData);
            // console.log("table data", tableData);
          }
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    console.log("useeffect running");

    fetchData();
  }, [formData.sourceEntity.table_name]);

  const createNewPipelineHandler = () => {
    setshowMainPage(false);
    setStep(1);
  };

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

  const totalPagesCount = 8;

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
    console.log("Current Step:", step);
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

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setloading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <p> loading </p>
      ) : user ? (
        <div user={user}>
          <div className="d-flex">
            <Sidebar
              isScheduling={isScheduling}
              setIsScheduling={setIsScheduling}
              setshowMainPage={setshowMainPage}
              step={step}
              setStep={setStep}
              isHome={isHome}
              setIsHome={setIsHome}
            />
            <div className="w-100">
              <Navbar user={user} />
              {isHome ? (
                <Home
                  setIsHome={setIsHome}
                  setIsScheduling={setIsScheduling}
                  setStep={setStep}
                />
              ) : isScheduling ? (
                <Scheduling />
              ) : showMainPage ? (
                <DataProvider>
                  <Container
                    className="h-100"
                    style={{ marginTop: "30px", backgroundColor: "white" }}
                  >
                    <Card className="Card-outer custom-card-body ">
                      <Row className="m-2">
                        <div className="back-button">
                          <div
                            className="back-icon"
                            onClick={createNewPipelineHandler}
                          >
                            <FiArrowLeft />
                          </div>
                          <span className="back-text">Create New Pipeline</span>

                          <div className="horizontal-line"></div>
                        </div>

                        {/* <Card className="Card-progressbar custom-card">
                              <Progressbar step={step} />
                            </Card> */}
                      </Row>
                      <Row className="m-2">
                        <SectionMenu
                          step={step}
                          isReview={isReview}
                          setIsReview={setIsReview}
                        />
                        <Col>
                          {isReview ? (
                            <ReviewForm
                              step={step}
                              setStep={setStep}
                              isReview={isReview}
                              setIsReview={setIsReview}
                              cancel={closeHandler}
                              formData={formData}
                              setshowMainPage={setshowMainPage}
                            />
                          ) : (
                            <Card className="custom-card">
                              <div>
                                {/* <Card.Header className="header">
                                  <Header step={step}></Header>
                                </Card.Header> */}
                                <div>
                                  <Container
                                    // ref={containerRef}
                                    style={{
                                      minHeight: "60vh",
                                      maxHeight: "60vh",
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
                                        isReview={isReview}
                                        setIsReview={setIsReview}
                                      />
                                    </Card.Body>
                                  </Container>
                                </div>
                                <Card.Footer className="d-flex justify-content-between float-right custom-footer">
                                  <Col>
                                    <button
                                      className="btn-c"
                                      onClick={handleShow}
                                      disabled={step === 1}
                                    >
                                      Close
                                    </button>
                                    <Modal
                                      show={showModal}
                                      onHide={closeHandler}
                                    >
                                      <Modal.Header closeButton>
                                        {/* <Modal.Title>Modal heading</Modal.Title> */}
                                      </Modal.Header>
                                      <Modal.Body>
                                        Are you sure you want to close? Any
                                        unsaved data will be lost.
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
                                    Prev
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
                            </Card>
                          )}
                        </Col>
                      </Row>
                    </Card>
                  </Container>
                </DataProvider>
              ) : (
                <ListingPage setshowMainPage={setshowMainPage} />
              )}
            </div>
          </div>
          <SimpleDialogDemo />
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
