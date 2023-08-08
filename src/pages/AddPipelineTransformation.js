import TransformationPipeline from "../components/Transformation/TransformationPipeline";
import { useState, useEffect, useRef, useContext } from "react";
import { Container, Card, Row, Col, Modal } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/main.css";
import Backend_url from "../config";
import SectionMenuTrans from "../components/Transformation/SectionMenuTrans";
import StepperTrans from "../components/Transformation/StepperTrans";

function AddPipelineTransformation() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const createNewPipelineHandler = () => {
    setStep(1);
  };

  const previousHandler = () => {
    setStep((step) => step - 1);
  };

  const nextHandler = () => {
    setStep((step) => step + 1);
    console.log("Current Step:", step);
  };

  const closeHandler = () => {
    setStep((step) => 1);
  };

  const updateFormData = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  return (
    <Container
      className="h-100"
      style={{ marginTop: "30px", backgroundColor: "white" }}
    >
      <Card className="Card-outer custom-card-body ">
        <Row className="m-2">
          <div className="back-button" onClick={createNewPipelineHandler}>
            <div className="back-icon">
              <FiArrowLeft />
            </div>
            <span className="back-text">New Query</span>
            <div className="horizontal-line"></div>
          </div>
        </Row>
        <Row className="m-2">
          <SectionMenuTrans step={step} />
          <Col>
            <Card className="custom-card" style={{ border: "none" }}>
              <div>
                <div>
                  <Container>
                    <Card.Body
                      style={{
                        minHeight: "60vh",
                        maxHeight: "60vh",
                        overflowY: "scroll",
                      }}
                      className="overflow-auto"
                    >
                      <StepperTrans
                        step={step}
                        formData={formData}
                        updateFormData={updateFormData}
                      />
                    </Card.Body>
                  </Container>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Card.Footer className="d-flex justify-content-between float-right custom-footer">
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
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default AddPipelineTransformation;
