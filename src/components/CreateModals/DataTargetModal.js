// import React from "react";
// import {
//   Container,
//   Form,
//   Row,
//   Col,
//   Card,
//   Button,
//   Modal,
// } from "react-bootstrap";

// import "../../styles/main.css";
// import "./DataTargetModal.css";

// const DataTargetModal = (props) => {
//   return (
//     <Modal
//       show={props.showModalDTC}
//       onHide={props.handleCloseModalDTC}
//       size="lg"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Create Data Target Connection</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>Some Content</p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button
//           variant="secondary"
//           onClick={props.handleCloseModalDTC}
//           className="btn-cl"
//         >
//           Close
//         </Button>
//         <Button
//           variant="primary"
//           onClick={props.handleCloseModalDTC}
//           className="btn-save"
//         >
//           Save Changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default DataTargetModal;

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

const DataSourceModal = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    connection_name: "",
    connection_type: "",
    data_source_name: "",
    environment: "",
    connection_string: "",
  });

  const sidebarData = [
    {
      connection_name: "Connection 1",
      connection_type: "Type 1",
      data_source_name: "Source 1",
      environment: "Environment 1",
      connection_string: "Connection String 1",
    },
    {
      connection_name: "Connection 2",
      connection_type: "Type 2",
      data_source_name: "Source 2",
      environment: "Environment 2",
      connection_string: "Connection String 2",
    },
    // Add more items as needed
  ];

  useEffect(() => {
    if (selectedItem) {
      setFormData(selectedItem);
    }
  }, [selectedItem]);

  const handleSidebarItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Handle saving the changes (e.g., send the formData to backend)
    console.log("Form Data:", formData);
    handleCloseModalDTC();
  };

  const handleCloseModalDTC = () => {
    setSelectedItem(null);
    setFormData({
      connection_name: "",
      connection_type: "",
      data_source_name: "",
      environment: "",
      connection_string: "",
    });
    props.handleCloseModalDTC();
  };

  return (
    <Modal show={props.showModalDTC} onHide={handleCloseModalDTC} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create Data Target Connection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col xs={4} className="sidebar-container">
              <div className="sidebar">
                <div className="sidebar-heading">Sidebar Heading</div>
                {sidebarData.map((item, index) => (
                  <div
                    key={index}
                    className={`sidebar-item ${
                      selectedItem === item ? "active" : ""
                    }`}
                    onClick={() => handleSidebarItemClick(item)}
                  >
                    <span className="sidebar-item-serial">{index + 1}.</span>{" "}
                    {item.connection_name}
                  </div>
                ))}
              </div>
            </Col>
            <Col>
              <Card.Body className="custom-card-body">
                <Form>
                  <Row className="mb-4">
                    <Col xs={3}>
                      <Form.Label>Connection Name</Form.Label>
                    </Col>
                    <Col>
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
                    <Col xs={3}>
                      <Form.Label>Connection Type</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        className="custom-select custom-style"
                        name="connection_type"
                        value={formData.connection_type}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col xs={3}>
                      <Form.Label>Data Target Name</Form.Label>
                    </Col>
                    <Col>
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
                    <Col xs={3}>
                      <Form.Label>Environment</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        className="custom-select custom-style"
                        name="environment"
                        value={formData.environment}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col xs={3}>
                      <Form.Label>Connection String</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        className="custom-select custom-style connection-string-textarea"
                        name="connection_string"
                        value={formData.connection_string}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCloseModalDTC}
          className="btn-cl"
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveChanges}
          className="btn-save"
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DataSourceModal;
