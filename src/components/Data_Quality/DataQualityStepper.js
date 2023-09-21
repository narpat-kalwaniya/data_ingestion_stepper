import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { Container, Card, Row, Col, Modal } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.css";
import "../../styles/main.css";
import SectionMenuDataQuality from "./SectionMenuDataQuality";
import StepperDataQuality from "./StepperDataQuality";

import "../Transformation/TransformationPipeline.css";

function DataQualityStepper() {
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
      className="h-90 "
      style={{
        marginTop: "12px",
        backgroundColor: "white",
        maxWidth: "1320px",
      }}
    >
      <Card className="Card-outer custom-card-body ">
        <Row className="m-2">
          <div
            className="back-button back-button-style"
            onClick={createNewPipelineHandler}
          >
            <div className="back-icon">
              <FiArrowLeft />
              <span className="back-text">New Query</span>
            </div>
            <div className="horizontal-line-Upload"></div>
          </div>
        </Row>
        <Row className="m-2">
          <SectionMenuDataQuality step={step} />
          <Col className="p-0 ">
            <Card className="custom-card" style={{ border: "none" }}>
              <div>
                <div>
                  <Container className="p-0 maxWidthStyle ">
                    <Card.Body
                      style={{
                        minHeight: "72vh",
                        maxHeight: "67vh",
                        overflowY: "scroll",
                      }}
                      className="overflow-auto py-0"
                    >
                      <StepperDataQuality
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
        <Card.Footer className="d-flex justify-content-between float-right custom-footer footer-style">
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
          {step === 5 ? (
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
      </Card>
    </Container>
  );
}
export default DataQualityStepper;
