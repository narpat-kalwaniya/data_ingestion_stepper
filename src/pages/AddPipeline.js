import { useState, useEffect, useRef, useContext } from "react";
import { Container, Card, Row, Col, Modal } from "react-bootstrap";
import Stepper from "../components/Stepper";
import ReviewForm from "../components/ReviewForm";
import SectionMenu from "../components/SectionMenu";
import { FiArrowLeft } from "react-icons/fi";
import { DataContext } from "../components/DataContext";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.css";
import { FaCheck } from "react-icons/fa";
import { formContext } from "../components/formContext";
import { stepContext } from "../components/stepContext";
import Backend_url from "../config";

function AddPipeline(props) {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { updateIngestionData } = useContext(DataContext);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callRevalidationfunction, setcallRevalidationfunction] =
    useState(false);
  const [currentlySubmittedForm, setcurrentlySubmittedForm] = useState(0);

  const { formData, setFormData } = useContext(formContext);
  const { step, setStep } = useContext(stepContext);

  // onData(formData);

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
  const [errors5, setErrors5] = useState({
    source_entity_type: "",
  });
  const [errors6, setErrors6] = useState({
    target_entity_name: "",
    target_load_type: "",
    selectedTableSchema: "",
    target_table: "",
    target_database: "",
  });

  // useEffect(() => {
  //   // Check if selected key is false
  //   const updatedTableData = formData.tableData.filter(
  //     (row) => row.selected !== false
  //   );

  //   // Update formData with the modified tableData
  //   const updatedFormData = {
  //     ...formData,
  //     tableData: updatedTableData,
  //   };

  const [errorEmail8, setErrorEmail8] = useState({
    email: "",
    success_email_list: "",
    failure_email_list: "",
  });

  //   updateFormData(updatedFormData);
  // }, [step > 3]);

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
      // setIsLoading(true);
      try {
        const response = await fetch(`${Backend_url}/getcolumns/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          const responseData = await response.json();
          if (Array.isArray(responseData) && responseData[1] !== 400) {
            responseData.forEach((object) => {});
            // setTableData(responseData);

            const updatedFormData = {
              ...formData,
              tableData: responseData,
              targetLoadDetails: {
                ...formData.targetLoadDetails,
                target_entity_name: responseData[0].target_entity_name,
              },
            };
            updateFormData(updatedFormData);
            // setFormData(updatedFormData);

            const updatedData = {
              attributes: [
                responseData, // Add new attribute object
              ],
            };
            updateIngestionData(updatedData);
            setIsLoading(false);
            props.setIsTableLoad(false);
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

  const createNewPipelineHandler = () => {
    setStep(1);
    props.setIsReview(false);
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
        newErrors2.data_source_type = "This field is required";
      }
    }

    setErrors2(newErrors2);

    return Object.keys(newErrors2).length === 0;
  };

  const validateInputs5 = () => {
    const isIncrementalSelected =
      formData.DefineSourceExtractCriteria.source_entity_type === "incremental";
    const isDate =
      formData.DefineSourceExtractCriteria.incremental_by === "Date";
    const isSequence =
      formData.DefineSourceExtractCriteria.incremental_by === "Sequence";
    const newErrors5 = {};
    if (isIncrementalSelected) {
      if (
        !formData.DefineSourceExtractCriteria.incremental_by ||
        !formData.DefineSourceExtractCriteria.source_entity_type === ""
      ) {
        newErrors5.incremental_by = "This field is required";
      }
      if (
        !formData.DefineSourceExtractCriteria.source_incremental_column ||
        !formData.DefineSourceExtractCriteria.source_incremental_column?.length
      ) {
        newErrors5.source_incremental_column = "This field is required";
      }
      if (
        (!formData.DefineSourceExtractCriteria.incremental_start_time ||
          !formData.DefineSourceExtractCriteria.incremental_start_time ===
            "") &&
        isDate
      ) {
        newErrors5.incremental_start_time = "This field is required";
      }
      if (
        (!formData.DefineSourceExtractCriteria.incremental_end_time ||
          !formData.DefineSourceExtractCriteria.incremental_end_time === "") &&
        isDate
      ) {
        newErrors5.incremental_end_time = "This field is required";
      }
      if (
        (!formData.DefineSourceExtractCriteria.default_start_date ||
          !formData.DefineSourceExtractCriteria.default_start_date === "") &&
        isDate
      ) {
        newErrors5.default_start_date = "This field is required";
      }
      if (
        (!formData.DefineSourceExtractCriteria.incremental_start_sequence ||
          !formData.DefineSourceExtractCriteria.incremental_start_sequence ===
            "") &&
        isSequence
      ) {
        newErrors5.incremental_start_sequence = "This field is required";
      }
      if (
        (!formData.DefineSourceExtractCriteria.incremental_end_sequence ||
          !formData.DefineSourceExtractCriteria.incremental_end_sequence ===
            "") &&
        isSequence
      ) {
        newErrors5.incremental_end_sequence = "This field is required";
      }
      if (
        (!formData.DefineSourceExtractCriteria.default_start_seq ||
          !formData.DefineSourceExtractCriteria.default_start_seq === "") &&
        isSequence
      ) {
        newErrors5.default_start_seq = "This field is required";
      }
    }

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

    if (
      !formData.tableData[0]?.selectedTableSchema ||
      formData.tableData[0]?.selectedTableSchema === ""
    ) {
      newErrors6.selectedTableSchema = "This field is required";
    }

    // if (
    //   !formData.tableData[0]?.target_table ||
    //   formData.tableData[0]?.target_table === ""
    // ) {
    //   newErrors6.target_table = "This field is required";
    // }

    // if (
    //   !formData.tableData[0]?.target_database ||
    //   formData.tableData[0]?.target_database === ""
    // ) {
    //   newErrors6.target_database = "This field is required";
    // }

    setErrors6(newErrors6);

    return Object.keys(newErrors6).length === 0;
  };

  const totalPagesCount = 8;

  const previousHandler = () => {
    props.setIsReview(false);
    setStep((step) => step - 1);
  };

  // const nextHandler = () => {
  //   setStep((step) => step + 1);
  // };

  const nextHandler = () => {
    setIsDraftSaved(false);
    setcurrentlySubmittedForm(step);
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
    } else {
      setStep((step) => step + 1);
    }

    setFormData({ ...formData, current_step: step + 1 });
  };

  const closeHandler = () => {
    setShowModal(true);
    props.setIsReview(false);
    setStep((step) => 1);
    setShowModal(false);
    // const clearedObject = Object.keys(formData).reduce(
    //   (acc, key) => ({ ...acc, [key]: "" }),
    //   {}
    // );

    // setFormData(clearedObject);
    // setFormData({});
    // window.localStorage.removeItem(1);
  };
  const handleShow = () => setShowModal(true);
  const handleContinue = () => {
    setShowModal(false);
  };

  const reviewHandler = () => {
    let validationSuccess = errorEmailHandler();
    if (validationSuccess) {
      props.setIsReview(true);
      setStep((step) => step + 1);
    }
  };

  const errorEmailHandler = () => {
    const newEmailError = {};
    const emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      formData.GatherMetaData.email &&
      !emailRegx.test(formData.GatherMetaData.email)
    ) {
      newEmailError.email = "This is not valid email format";
      setErrorEmail8(newEmailError);
      return false;
    } else {
      newEmailError.email = "";
    }
    if (
      formData.GatherMetaData.success_email_list &&
      !emailRegx.test(formData.GatherMetaData.success_email_list)
    ) {
      newEmailError.success_email_list = "This is not valid email format";
      setErrorEmail8(newEmailError);
      return false;
    } else {
      newEmailError.success_email_list = "";
    }

    if (
      formData.GatherMetaData.failure_email_list &&
      !emailRegx.test(formData.GatherMetaData.failure_email_list)
    ) {
      newEmailError.failure_email_list = "This is not valid email format";
      setErrorEmail8(newEmailError);
      return false;
    } else {
      newEmailError.failure_email_list = "";
    }
    setErrorEmail8(newEmailError);
    return true;
  };

  useEffect(() => {
    console.log("updation", "succeeded");
    updateIngestionData(formData);
  }, [props.isReview]);

  // const showDraftsHandler = () => { };
  const saveDraftsHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${Backend_url}/draftentity/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful response

        setIsDraftSaved(true);
        setIsLoading(false);

        // handleCloseModalApp();
      } else {
        // Handle error response
        console.error("Error sending Form Data:", response.status);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error sending Form Data:", error);
    }
  };

  const updateFormData = (data, reValidate) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
    if (reValidate) {
      setcallRevalidationfunction(reValidate);
    }
  };

  useEffect(() => {
    if (callRevalidationfunction) {
      if (callRevalidationfunction == 5) {
        validateInputs5();
      }
      if (callRevalidationfunction == 1) {
        validateInputs();
      }
      if (callRevalidationfunction == 2) {
        validateInputs2();
      }
      if (callRevalidationfunction == 6) {
        validateInputs6();
      }
      setTimeout(() => {
        setcallRevalidationfunction(0);
      });
    }
  }, [callRevalidationfunction, callRevalidationfunction]);

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
    <Container style={{ marginTop: "30px", backgroundColor: "white" }}>
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
            <SectionMenu
              step={step}
              setStep={setStep}
              isReview={props.isReview}
              setIsReview={props.setIsReview}
            />
          ) : null}
          <Col>
            {props.isReview ? (
              <ReviewForm
                step={step}
                setStep={setStep}
                isReview={props.isReview}
                setIsReview={props.setIsReview}
                cancel={closeHandler}
                formData={formData}
                setFormData={setFormData}
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
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
                        <Stepper
                          step={step}
                          formData={formData}
                          updateFormData={updateFormData}
                          errors={errors}
                          errors2={errors2}
                          errors5={errors5}
                          errors6={errors6}
                          errorEmail8={errorEmail8}
                          isReview={props.isReview}
                          setIsReview={props.setIsReview}
                          isLoading={isLoading}
                          setIsLoading={setIsLoading}
                          currentlySubmittedForm={currentlySubmittedForm}
                          setIsDraftSaved={setIsDraftSaved}
                          isTableLoad={props.isTableLoad}
                          setIsTableLoad={props.setIsTableLoad}
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
                      <Modal show={showModal} onHide={closeHandler}>
                        <Modal.Header closeButton>
                          {/* <Modal.Title>Modal heading</Modal.Title> */}
                        </Modal.Header>
                        <Modal.Body>
                          Are you sure you want to close? Any unsaved data will
                          be lost.
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
                    {step >= 3 &&
                      (!isDraftSaved ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "20px",
                          }}
                        >
                          <p
                            style={{
                              color: "rgb(53, 143, 182)",
                              cursor: "pointer",
                              marginBottom: "0px",
                              transition: "font-size 0.2s",
                            }}
                            onClick={saveDraftsHandler}
                            onMouseEnter={(e) =>
                              (e.target.style.color = "rgb(123, 162, 179)")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.color = "rgb(53, 143, 182)")
                            }
                          >
                            Save as Draft
                          </p>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "20px",
                          }}
                        >
                          <p
                            style={{
                              color: "rgb(53, 143, 182)",
                              cursor: "pointer",
                              marginBottom: "0px",
                              transition: "font-size 0.2s",
                            }}
                            onClick={saveDraftsHandler}
                            onMouseEnter={(e) =>
                              (e.target.style.color = "rgb(123, 162, 179)")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.color = "rgb(53, 143, 182)")
                            }
                          >
                            <FaCheck style={{ marginRight: "5px" }} />
                            Saved as Draft
                          </p>
                        </div>
                      ))}
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
  );
}

export default AddPipeline;
