import { useState, useEffect, useRef, useContext } from "react";
import { Container, Card, Row, Col, Modal } from "react-bootstrap";
import ReviewForm from "../components/ReviewForm";
import { FiArrowLeft } from "react-icons/fi";
import { DataContext } from "../components/DataContext";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.css";
import SectionMenuMig from "../components/SectionMenuMig";
import StepperMig from "../components/StepperMig";
import SuccessMig from "../components/SuccessMig";

function AddPipelineMig() {
  const [step, setStep] = useState(1);
  const [isReview, setIsReview] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ingestionData, updateIngestionData } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({});

  const [formData, setFormData] = useState({
    CreateDataConnection: {
      dataSource: "",
      dataTarget: "",
      application: "",
    },
    sourceEntity: {
      data_source_type: "",
      query: null,
      db_name: "datacopy",
      schema_name: "",
      table_name: [],
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
      source_incremental_column: [],
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
    table_name: [],
    bucket_name: null,
    full_file_name: null,
    source_entity_name: "",
  });
  const [errors5, setErrors5] = useState({
    source_entity_type: "",
  });
  const [errors6, setErrors6] = useState({
    target_entity_name: "",
    target_load_type: "",
  });

  useEffect(() => {
    // Check if selected key is false
    const updatedTableData = formData.tableData.filter(
      (row) => row.selected !== false
    );

    // Update formData with the modified tableData
    const updatedFormData = {
      ...formData,
      tableData: updatedTableData,
    };

    updateFormData(updatedFormData);
  }, [step === 3]);

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
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/gettableattrs/",
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
          if (Array.isArray(responseData) && responseData[1] !== 400) {
            responseData.forEach((object) => {});
            // setTableData(responseData);

            const updatedFormData = {
              ...formData,
              tableData: responseData,
            };
            updateFormData(updatedFormData);
            // setFormData(updatedFormData);

            const updatedData = {
              attributes: [
                responseData, // Add new attribute object
              ],
            };
            updateIngestionData(updatedData);
          }
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [step === 2]);

  // useEffect(() => {
  //   const sendData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/migingeststore/",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(ingestionData[0]),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Error sending data");
  //       }

  //       // Handle the response if needed
  //       const responseData = await response.json();
  //       console.log("Response:", responseData);
  //       setResponse({ ...responseData });
  //     } catch (error) {
  //       console.error("Error:", error.message);
  //     }
  //     setIsLoading(false);
  //   };
  //   sendData();
  //   console.log("migration data", ingestionData[0]);
  // }, [step === 3]);

  useEffect(() => {
    if (step === 4) {
      const sendData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/migingeststore/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(ingestionData[0]),
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
        setIsLoading(false);
        setIsSubmitted(true);
      };
      sendData();
      console.log("migration data", ingestionData[0]);
      console.log("resoonse", response);
    }
  }, [step]);

  const createNewPipelineHandler = () => {
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

  const validateInputs5 = () => {
    const newErrors5 = {};

    if (
      !formData.DefineSourceExtractCriteria.source_entity_type ||
      !formData.DefineSourceExtractCriteria.source_entity_type === ""
    ) {
      newErrors5.source_entity_type = "This field is required";
    }

    setErrors5(newErrors5);

    return Object.keys(newErrors5).length === 0;
  };

  const validateInputs6 = () => {
    const newErrors6 = {};

    if (
      !formData.targetLoadDetails.target_entity_name ||
      formData.targetLoadDetails.target_entity_name === ""
    ) {
      newErrors6.target_entity_name = "This field is required";
    }
    if (
      !formData.targetLoadDetails.target_load_type ||
      formData.targetLoadDetails.target_load_type === ""
    ) {
      newErrors6.target_load_type = "This field is required";
    }

    setErrors6(newErrors6);

    return Object.keys(newErrors6).length === 0;
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
    } else if (step === 5) {
      if (validateInputs5()) {
        setStep((step) => step + 1);
      } else {
        setStep((step) => step);
      }
    } else if (step === 6) {
      if (validateInputs6()) {
        setStep((step) => step + 1);
      } else {
        setStep((step) => step);
      }
    } else if (step !== 4) {
      // Add this condition to skip increasing step when it is equal to 3
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

  const BodyRef = useRef(null);

  useEffect(() => {
    const cardBodyNode = BodyRef.current;
    if (cardBodyNode) {
      const shouldOverflow =
        cardBodyNode.scrollHeight > cardBodyNode.clientHeight;
      cardBodyNode.classList.toggle("overflow-auto", shouldOverflow);
    }
  }, []);

  return (
    <Container
      className="h-100"
      style={{ marginTop: "30px", backgroundColor: "white" }}
    >
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}

      <Card className="Card-outer custom-card-body ">
        {!isSubmitted ? (
          <Row className="m-2">
            <div className="back-button" onClick={createNewPipelineHandler}>
              <div className="back-icon">
                <FiArrowLeft />
              </div>
              <span className="back-text">Create New Pipeline</span>

              <div className="horizontal-line"></div>
            </div>

            {/* <Card className="Card-progressbar custom-card">
                              <Progressbar step={step} />
                            </Card> */}
          </Row>
        ) : null}
        <Row className="m-2">
          {!isSubmitted ? (
            <SectionMenuMig
              step={step}
              isReview={isReview}
              setIsReview={setIsReview}
            />
          ) : null}
          <Col>
            {isSubmitted ? <SuccessMig response={response} /> : null}
            {isReview ? (
              <ReviewForm
                step={step}
                setStep={setStep}
                isReview={isReview}
                setIsReview={setIsReview}
                cancel={closeHandler}
                formData={formData}
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
              />
            ) : (
              <Card className="custom-card" style={{ border: "none" }}>
                <div>
                  {/* <Card.Header className="header">
                                  <Header step={step}></Header>
                                </Card.Header> */}
                  <div>
                    <Container
                    // ref={containerRef}
                    >
                      <Card.Body
                        // ref={BodyRef}
                        style={{
                          minHeight: "60vh",
                          maxHeight: "60vh",
                          overflowY: "scroll",
                        }}
                        className="overflow-auto"
                      >
                        <StepperMig
                          step={step}
                          formData={formData}
                          updateFormData={updateFormData}
                          errors={errors}
                          errors2={errors2}
                          errors5={errors5}
                          errors6={errors6}
                          isReview={isReview}
                          setIsReview={setIsReview}
                          response={response}
                          isLoading={isLoading}
                        />
                      </Card.Body>
                    </Container>
                  </div>
                  {step <= 3 && (
                    <Card.Footer className="d-flex justify-content-between float-right custom-footer">
                      <Col>
                        <button
                          className="btn-c"
                          onClick={handleShow}
                          disabled={step === 1}
                        >
                          Close
                        </button>
                        <Modal show={showModal} onHide={closeHandler}>
                          <Modal.Header closeButton></Modal.Header>
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
                        Prev
                      </button>
                      {step === 3 ? (
                        <button
                          className="btn-s-1 "
                          onClick={nextHandler}
                          style={{
                            borderTopLeftRadius: "0px",
                            borderBottomLeftRadius: "0px",
                          }}
                        >
                          Submit
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
                  )}
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default AddPipelineMig;
