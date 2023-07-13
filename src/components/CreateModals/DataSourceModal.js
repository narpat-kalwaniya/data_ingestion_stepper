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

import "../../styles/main.css";
import "./DataSourceModal.css";
import ReactJson from "react-json-view";

const DataSourceModal = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [parsedJson, setParsedJson] = useState(null);
  const [connections, setConnections] = useState([]);

  const [formData, setFormData] = useState({
    connection_name: "",
    connection_type: "",
    data_source_name: "",
    connection_env: "",
    connect_string: null,
    process_flag: "insert",
  });

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/conndetails/"
        );
        const data = await response.json();
        setConnections(data);
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    fetchConnections();
  }, []);

  const handleParseJson = (value) => {
    try {
      const parsedObject = JSON.parse(value);
      setParsedJson(parsedObject);
    } catch (error) {
      setParsedJson(null);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setFormData(selectedItem);
      setFormData({
        ...selectedItem,
        process_flag: "update",
      });
    }
  }, [selectedItem]);

  const handleSidebarItemClick = (item) => {
    setSelectedItem(item);
    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   ...item,
    //   process_flag: "update",
    // }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "connection_type") {
      const selectedConnectionType = connectionType[value];
      setFormData((prevFormData) => ({
        ...prevFormData,
        connection_type: value,
        connect_string: selectedConnectionType.connection_string,
      }));
    } else if (name === "connection_string") {
      let parsedValue;
      try {
        parsedValue = JSON.parse(value);
      } catch (error) {
        parsedValue = parsedValue;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        connect_string: parsedValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/conn/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Handle successful response
        console.log("Form Data sent successfully!");
        console.log("connection data sending", formData);
        handleCloseModalDSC();
      } else {
        // Handle error response
        console.error("Error sending Form Data:", response.status);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error sending Form Data:", error);
    }
  };

  const handleCloseModalDSC = () => {
    setSelectedItem(null);
    setFormData({
      connection_name: "",
      connection_type: "",
      data_source_name: "",
      connection_env: "",
      connect_string: null,
      process_flag: "insert",
    });
    props.handleCloseModalDSC();
  };

  const connectionType = {
    POSTGRESQL: {
      label: "POSTGRESQL",
      connection_string: {
        host: "",
        user: "",
        password: "",
        database: "",
      },
    },
    SNOWFLAKE: {
      label: "SNOWFLAKE",
      connection_string: {
        host: "",
        user: "",
        password: "",
        database: "",
        warehouse: "",
        role: "",
      },
    },
    ORACLE: {
      label: "ORACLE",
      connection_string: {
        host: "",
        user: "",
        password: "",
        database: "",
        service: "",
      },
    },
    SQL_SERVER: {
      label: "SQL SERVER",
      connection_string: {
        host: "",
        user: "",
        password: "",
        database: "",
      },
    },
    MYSQL: {
      label: "MYSQL",
      connection_string: {
        host: "",
        user: "",
        password: "",
        database: "",
      },
    },
    S3: {
      label: "S3",
      connection_string: {
        bucket_name: "",
        access_key: "",
        secret_key: "",
      },
    },
    AZURE_STORAGE_ACCOUNT: {
      label: "AZURE STORAGE ACCOUNT",
      connection_string: {
        storage_account_name: "",
        container_name: "",
        access_key: "",
      },
    },
  };

  const handleAddConnection = () => {
    setFormData({
      connection_name: "",
      connection_type: "",
      data_source_name: "",
      connection_env: "",
      connect_string: null,
      process_flag: "insert",
    });
  };

  const handleJsonViewChange = (updatedJson) => {
    if (updatedJson.updated_src) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        connect_string: updatedJson.updated_src,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        connect_string: updatedJson,
      }));
    }
  };

  return (
    <Modal
      show={props.showModalDSC}
      onHide={handleCloseModalDSC}
      size="lg"
      style={{ fontSize: "14px" }}
    >
      <Modal.Header closeButton>
        {/* <p>Create Data Source Connection</p> */}
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col xs={3} className="sidebar-container">
            <div>
              <div className="sidebar-heading">Connection List</div>
              {connections.map((item, index) => (
                <div
                  key={index}
                  className={`sidebar-item ${
                    selectedItem === item ? "active" : ""
                  }`}
                  onClick={() => handleSidebarItemClick(item)}
                >
                  {/* <span className="sidebar-item-serial">{index + 1}.</span>{" "} */}
                  {item.connection_name}
                </div>
              ))}
            </div>
          </Col>
          <Col>
            <Card style={{ border: "none" }}>
              <Card.Body
                style={{
                  minHeight: "60vh",
                  maxHeight: "60vh",
                  width: "100%",
                  overflowY: "scroll",
                }}
                className="overflow-auto"
              >
                <Row className="mb-4">
                  <Col>
                    <Form.Label>Connection Name</Form.Label>

                    <Form.Control
                      type="text"
                      className="custom-select custom-style"
                      name="connection_name"
                      value={formData.connection_name}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <Form.Label>Connection Type</Form.Label>

                    <Form.Select
                      as="select"
                      className="custom-select custom-style"
                      name="connection_type"
                      value={formData.connection_type}
                      onChange={handleChange}
                    >
                      <option value="">-- Select --</option>{" "}
                      {Object.keys(connectionType).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col>
                    <Form.Label>Data Source Name</Form.Label>

                    <Form.Control
                      type="text"
                      className="custom-select custom-style"
                      name="data_source_name"
                      value={formData.data_source_name}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <Form.Label>Environment</Form.Label>

                    <Form.Control
                      type="text"
                      className="custom-select custom-style"
                      name="environment"
                      value={formData.connection_env}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <Form.Label>Connection String</Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="custom-select custom-style connection-string-textarea"
                      name="connection_string"
                      value={JSON.stringify(formData.connect_string)}
                      onChange={handleChange}
                      onBlur={(e) => handleParseJson(e.target.value)}
                    />
                    {parsedJson && formData.connect_string && (
                      <div className="json-view-container">
                        <ReactJson
                          src={formData.connect_string}
                          theme="ocean"
                          name={null}
                          enableClipboard={false}
                          displayDataTypes={false}
                          displayObjectSize={false}
                          onEdit={handleJsonViewChange}
                          onAdd={handleJsonViewChange}
                          onDelete={handleJsonViewChange}
                        />
                      </div>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        {/* <Col>
          <button className="btn-s-1" onClick={handleAddConnection}>
            Add Connection
          </button>
        </Col> */}

        <button
          variant="secondary"
          onClick={handleCloseModalDSC}
          className="btn-c"
        >
          Close
        </button>
        <button variant="primary" onClick={handleSaveChanges} className="btn-s">
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DataSourceModal;
