import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { Container, Card, Row, Col, Modal } from "react-bootstrap";
import { FiArrowLeft } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.css";
import "../../styles/main.css";
import SectionMenuTrans from "./SectionMenuTrans";
import StepperTrans from "./StepperTrans";
import QueryDetailsSlider from "./QueryDetailsSlider";
import "./TransformationPipeline.css";
import Backend_url from "../../config";

function TransformationStepper() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [sliderOpen, setsliderOpen] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [connections, setConnections] = useState([]);
  const [applications, setApplications] = useState([]);
  const [connectionName, setConnectionsName] = useState([]);
  const [applicationName, setApplicationName] = useState([]);

  const options = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
    { id: 4, label: "Option 4" },
  ];

  const handleSelect = (option) => {
    setSelectedValue(option);
  };

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

  const handleSelection = (event) => {
    const selectedConnectionName = event.target.value;

    const selectedConnection = connections.find(
      (connection) => connection.connection_name === selectedConnectionName
    );
    const selectedConnectionId = selectedConnection
      ? selectedConnection.connection_id
      : null;
  };

  const handleTargetSelection = (event) => {
    const selectedConnectionName = event.target.value;
    setConnectionsName(selectedConnectionName);

    const selectedConnection = connections.find(
      (connection) => connection.connection_name === selectedConnectionName
    );
    const selectedConnectionId = selectedConnection
      ? selectedConnection.connection_id
      : null;
  };

  const handleApplicationSelection = (event) => {
    const selectedApplicationName = event.target.value;
    setApplicationName(selectedApplicationName);

    const selectedConnection = applications.find(
      (applications) => applications.app_name === selectedApplicationName
    );
    const selectedConnectionId = selectedConnection
      ? selectedConnection.app_id
      : null;
  };

  const filteredTargetConnections = connections.filter(
    (connection) => connection.connection_type === "SNOWFLAKE"
  );

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(`${Backend_url}/conndetails/`);
        const data = await response.json();
        setConnections(data);
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await fetch(`${Backend_url}/appdetails/`);
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchConnections();
    fetchApplications();
  }, []);

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
        <Card.Footer className="d-flex justify-content-between float-right custom-footer footer-style">
          {step === 1 ? (
            <span> </span>
          ) : step === 2 ? (
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
          ) : step === 3 ? (
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
          ) : null}

          {step === 1 ? (
            <button
              className="btn-s "
              onClick={nextHandler}
              style={{
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
              }}
            >
              Pre Data Validation
            </button>
          ) : step === 2 ? (
            <button
              className="btn-s "
              onClick={nextHandler}
              style={{
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
              }}
            >
              Post Data Validation
            </button>
          ) : step === 3 ? (
            <button
              className="btn-s "
              onClick={nextHandler}
              style={{
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
              }}
            >
              Submit
            </button>
          ) : null}
        </Card.Footer>

        <Row className="m-2">
          <div
            className="back-button back-button-style"
            onClick={createNewPipelineHandler}
          >
            <div className="back-icon">
              <FiArrowLeft />
              <span className="back-text">New Query</span>
            </div>

            {step === 2 ? (
              <>
                <span className=" back-text-style">Table Rules </span>
                <span className=" back-text-style">Profiling</span>
                <span className=" back-text-style">Column Rules</span>
              </>
            ) : (
              <></>
            )}

            {step === 1 ? (
              <div style={{ display: "flex", gap: "10px" }}>
                <span style={{ flex: 1 }}>
                  <select onChange={handleTargetSelection}>
                    <option value="">Connection</option>{" "}
                    {filteredTargetConnections.map((connection) => (
                      <option
                        key={connection.connection_id}
                        value={connection.connection_name}
                      >
                        {connection.connection_name}
                      </option>
                    ))}
                  </select>
                </span>
                <span style={{ flex: 1 }}>
                  <select onChange={handleApplicationSelection}>
                    <option value="">Application</option>{" "}
                    {applications.map((application) => (
                      <option
                        key={application.app_id}
                        value={application.app_name}
                      >
                        {application.app_name}
                      </option>
                    ))}
                  </select>
                </span>
                <span style={{ flex: 1 }}>
                  <select onChange={(e) => handleSelect(e.target.value)}>
                    <option value="">Select variable</option>
                    {options.map((option) => (
                      <option key={option.id} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </span>
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
            <div className="horizontal-line-Upload"></div>
          </div>
        </Row>
        <Row className="m-2">
          {/* <SectionMenuTrans step={step} /> */}
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
                        padding: "0px",
                      }}
                      className="overflow-auto py-0"
                    >
                      <StepperTrans
                        step={step}
                        formData={formData}
                        updateFormData={updateFormData}
                        connectionName={connectionName}
                        applicationName={applicationName}
                      />
                    </Card.Body>
                  </Container>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
export default TransformationStepper;
