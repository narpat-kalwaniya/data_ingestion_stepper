import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { DataContext } from "./DataContext";
import "../styles/main.css";
import "./CreateDataConnection.css";
import ApplicationModal from "./CreateModals/ApplicationModal";
import DataSourceModal from "./CreateModals/DataSourceModal";
import DataTargetModal from "./CreateModals/DataTargetModal";
import Backend_url from "../config";
// import DataSourceModalForm from "./CreateModalsForms/DataSourceModalForm";

const CreateDataConnection = ({
  formData,
  updateFormData,
  step,
  errors,
  setisVisibleOption,
  currentlySubmittedForm,
}) => {
  const [connections, setConnections] = useState([]);
  const [applications, setApplications] = useState([]);
  const { ingestionData, updateIngestionData } = useContext(DataContext);

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

  const handleSelection = (event) => {
    const selectedConnectionName = event.target.value;

    if (event.target.value == "datacopy-s3") {
      setisVisibleOption(false);
    } else {
      setisVisibleOption(true);
    }

    const selectedConnection = connections.find(
      (connection) => connection.connection_name === selectedConnectionName
    );
    const selectedConnectionId = selectedConnection
      ? selectedConnection.connection_id
      : null;

    const updatedFormData = {
      ...formData,
      CreateDataConnection: {
        ...formData.CreateDataConnection,
        dataSource: selectedConnectionName,
      },
      sourceEntity: {
        ...formData.sourceEntity,
        connection_id: selectedConnectionId,
      },
    };
    updateFormData(updatedFormData, 1);

    const updatedData = { source_connection_id: selectedConnectionId };
    // updateIngestionData(updatedData);
  };

  const handleTargetSelection = (event) => {
    const selectedConnectionName = event.target.value;

    const selectedConnection = connections.find(
      (connection) => connection.connection_name === selectedConnectionName
    );
    const selectedConnectionId = selectedConnection
      ? selectedConnection.connection_id
      : null;

    const updatedFormData = {
      ...formData,
      CreateDataConnection: {
        ...formData.CreateDataConnection,
        dataTarget: selectedConnectionName,
      },
    };
    updateFormData(updatedFormData, 1);

    const updatedData = {
      target_connection_id: selectedConnectionId,
    };
    // updateIngestionData(updatedData);
  };

  const handleApplicationSelection = (event) => {
    const selectedApplicationName = event.target.value;

    const selectedConnection = applications.find(
      (applications) => applications.app_name === selectedApplicationName
    );
    const selectedConnectionId = selectedConnection
      ? selectedConnection.app_id
      : null;

    const updatedFormData = {
      ...formData,
      CreateDataConnection: {
        ...formData.CreateDataConnection,
        application: selectedApplicationName,
      },
    };
    updateFormData(updatedFormData, 1);

    const updatedData = {
      app_id: selectedConnectionId,
    };
    // updateIngestionData(updatedData);
  };

  const filteredSourceConnections = connections.filter(
    (connection) => connection.connection_type !== "SNOWFLAKE"
  );
  const filteredTargetConnections = connections.filter(
    (connection) => connection.connection_type === "SNOWFLAKE"
  );

  //Modal
  const [showModalDSC, setShowModalDSC] = useState(false);
  const handleShowModalDSC = () => {
    setShowModalDSC(true);
  };
  const handleCloseModalDSC = () => {
    setShowModalDSC(false);
  };

  const [showModalDTC, setShowModalDTC] = useState(false);
  const handleShowModalDTC = () => {
    setShowModalDTC(true);
  };
  const handleCloseModalDTC = () => {
    setShowModalDTC(false);
  };

  const [showModalApp, setShowModalApp] = useState(false);
  const handleShowModalApp = () => {
    setShowModalApp(true);
  };
  const handleCloseModalApp = () => {
    setShowModalApp(false);
  };

  // const dataSourceSelection = () => {
  //   setdisabledDataSourceCollection(false)
  // }

  console.log("form data", formData);

  console.log("connection ingestion data", ingestionData);

  return (
    <Card.Body className="custom-card-body">
      <div className="text-left">
        <Form>
          <Row className="mb-4">
            <Col xs={6}>
              <Form.Label>
                Data Source Connection <span className="text-danger">*</span>
              </Form.Label>
              <Row>
                <Col xs={8}>
                  <Form.Select
                    onChange={handleSelection}
                    value={formData.CreateDataConnection.dataSource}
                    isInvalid={currentlySubmittedForm == 1 && errors.dataSource}
                    required
                    // className="dropdown-item"
                    style={{
                      fontSize: "13px",
                      color: "#4F4F4F",
                      fontWeight: "400",
                      // border: "1px solid #4F4F4F",
                    }}
                  >
                    <option value="">-- Select --</option>{" "}
                    {filteredSourceConnections.map((connection) => (
                      <option
                        key={connection.connection_id}
                        value={connection.connection_name}
                      >
                        {connection.connection_name}
                      </option>
                    ))}
                  </Form.Select>
                  {currentlySubmittedForm == 1 && errors.dataSource && (
                    <div className="error">{errors.dataSource}</div>
                  )}
                </Col>
                <Col style={{ marginTop: "4px" }}>
                  <Icon.CloudPlusFill
                    size={25}
                    className="icon"
                    onClick={handleShowModalDSC}
                  />
                  <DataSourceModal
                    showModalDSC={showModalDSC}
                    handleShowModalDSC={handleShowModalDSC}
                    handleCloseModalDSC={handleCloseModalDSC}
                  ></DataSourceModal>
                </Col>
              </Row>
            </Col>
            <Col xs={6}>
              <Form.Label>
                Data Target Connection <span className="text-danger">*</span>
              </Form.Label>
              <Row>
                <Col xs={8}>
                  <Form.Select
                    onChange={handleTargetSelection}
                    value={formData.CreateDataConnection.dataTarget}
                    isInvalid={currentlySubmittedForm == 1 && errors.dataTarget}
                    required
                    style={{
                      fontSize: "13px",
                      color: "rgb(141 139 139);",
                      fontWeight: "100",
                      // border: "1px solid #4F4F4F",
                    }}
                  >
                    <option value="">-- Select --</option>{" "}
                    {filteredTargetConnections.map((connection) => (
                      <option
                        key={connection.connection_id}
                        value={connection.connection_name}
                      >
                        {connection.connection_name}
                      </option>
                    ))}
                  </Form.Select>
                  {currentlySubmittedForm == 1 && errors.dataTarget && (
                    <div className="error">{errors.dataTarget}</div>
                  )}
                </Col>
                <Col style={{ marginTop: "4px" }}>
                  <Icon.PatchPlusFill
                    size={25}
                    className="icon"
                    onClick={handleShowModalDTC}
                  />
                  <DataTargetModal
                    showModalDTC={showModalDTC}
                    handleShowModalDTC={handleShowModalDTC}
                    handleCloseModalDTC={handleCloseModalDTC}
                  ></DataTargetModal>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={6}>
              <Form.Label>
                Application <span className="text-danger">*</span>
              </Form.Label>
              <Row>
                <Col xs={8}>
                  <Form.Select
                    onChange={handleApplicationSelection}
                    value={formData.CreateDataConnection.application}
                    isInvalid={
                      currentlySubmittedForm == 1 && errors.application
                    }
                    required
                    style={{
                      fontSize: "13px",
                      color: "#4F4F4F",
                      fontWeight: "400",
                      // border: "1px solid #4F4F4F",
                    }}
                  >
                    <option value="">-- Select --</option>{" "}
                    {applications.map((application) => (
                      <option
                        key={application.app_id}
                        value={application.app_name}
                      >
                        {application.app_name}
                      </option>
                    ))}
                  </Form.Select>
                  {currentlySubmittedForm == 1 && errors.application && (
                    <div className="error">{errors.application}</div>
                  )}
                </Col>
                <Col style={{ marginTop: "4px" }}>
                  <Icon.WindowPlus
                    className="icon"
                    size={25}
                    onClick={handleShowModalApp}
                  />
                  <ApplicationModal
                    showModalApp={showModalApp}
                    handleShowModalApp={handleShowModalApp}
                    handleCloseModalApp={handleCloseModalApp}
                  ></ApplicationModal>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </Card.Body>
  );
};

export default CreateDataConnection;
