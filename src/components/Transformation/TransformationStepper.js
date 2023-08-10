import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { Container, Card, Row, Col, Modal } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.css";
import "../../styles/main.css";
import SectionMenuTrans from "./SectionMenuTrans";
import StepperTrans from "./StepperTrans";
import QueryDetailsSlider from "./QueryDetailsSlider";

function TransformationStepper() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [sliderOpen, setsliderOpen] = useState(null);

  const createNewPipelineHandler = () => {
    setStep(1);
  };

  const sliderHandler = (event) => {
    setsliderOpen("right");
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
      className="h-90"
      style={{ marginTop: "30px", backgroundColor: "white" }}
    >
      <Card className="Card-outer custom-card-body ">
        <Row className="m-2">
          <div className="back-button" onClick={createNewPipelineHandler}>
            <div className="back-icon">
              <FiArrowLeft />
              <span className="back-text">New Query</span>
            </div>
            {step === 1 ? (
              <div>
                <span className=" back-text-style" onClick={sliderHandler}>
                  Query Details
                </span>
                {sliderOpen && (
                  <QueryDetailsSlider
                    anchor={sliderOpen}
                    onClose={() => {
                      setsliderOpen(null);
                    }}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
            <div className="horizontal-line"></div>
          </div>
        </Row>
        <Row className="m-2">
          <SectionMenuTrans step={step} />
          <Col className="p-0">
            <Card className="custom-card" style={{ border: "none" }}>
              <div>
                <div>
                  <Container className="p-0">
                    <Card.Body
                      style={{
                        minHeight: "60vh",
                        maxHeight: "60vh",
                        overflowY: "scroll",
                      }}
                      className="overflow-auto py-0"
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
export default TransformationStepper;
