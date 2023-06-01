import { useState } from "react";
import { Container, Card, Row, Col, Form } from "react-bootstrap";
import { DataValidation } from "./components/DefineDataValidation";
import "bootstrap/dist/css/bootstrap.css";
import Stepper from "./components/Stepper";
import Header from "./components/Header";
import { Progressbar } from "./components/ProgressBar";
import ReviewForm from "./components/ReviewForm";
import CreateDataConnection from "./components/CreateDataConnection";

function App() {
  const [step, setStep] = useState(1);
  const [isReview, setIsReview] = useState(false);
  const [formData, setFormData] = useState({
    dataSource: "",
    dataTarget: "",
    application: "",
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

  const totalPagesCount = 9;

  const previousHandler = () => {
    setIsReview(false);
    setStep((step) => step - 1);
  };

  const nextHandler = () => {
    setStep((step) => step + 1);
  };

  const cancelHandler = () => {
    setIsReview(false);
    setStep((step) => 1);
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

  return (
    <div className="App">
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
            <Col>
              <Card>
                {isReview ? (
                  <ReviewForm step={step} cancel={cancelHandler}></ReviewForm>
                ) : (
                  <div>
                    <Card.Header className="header">
                      <Header step={step}></Header>
                    </Card.Header>
                    <Card.Body>
                      <Stepper
                        step={step}
                        formData={formData}
                        updateFormData={updateFormData}
                      />
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between float-right">
                      <Col>
                        <button
                          className="btn-c"
                          onClick={cancelHandler}
                          disabled={step === 1}
                        >
                          Cancel
                        </button>
                      </Col>
                      <button
                        className="btn-c "
                        onClick={previousHandler}
                        disabled={step === 1}
                      >
                        Back
                      </button>
                      {step === totalPagesCount ? (
                        <button className="btn-s-1 " onClick={reviewHandler}>
                          Review & Submit
                        </button>
                      ) : (
                        <button className="btn-s " onClick={nextHandler}>
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
