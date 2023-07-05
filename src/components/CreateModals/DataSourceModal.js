// import React, { useState, useEffect, useContext } from "react";
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
// import "./DataSourceModal.css";

// const DataSourceModal = (props) => {
//   return (
//     <Modal
//       show={props.showModalDSC}
//       onHide={props.handleCloseModalDSC}
//       size="lg"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Create Data Scouce Connection</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Card.Body className="custom-card-body">
//           <Form>
//             <Row className="mb-4">
//               <Col xs={3}>
//                 <Form.Label>Connection Name</Form.Label>
//               </Col>
//               <Col>
//                 <Form.Control
//                   type="text"
//                   disabled={false}
//                   className="custom-select custom-style"
//                   name="connection_name"
//                 />
//               </Col>
//             </Row>
//             <Row className="mb-4">
//               <Col xs={3}>
//                 <Form.Label>Connection Type</Form.Label>
//               </Col>
//               <Col>
//                 <Form.Control
//                   type="text"
//                   disabled={false}
//                   className="custom-select custom-style"
//                   name="connection_type"
//                 />
//               </Col>
//             </Row>

//             <Row className="mb-4">
//               <Col xs={3}>
//                 <Form.Label>Data Source Name</Form.Label>
//               </Col>
//               <Col>
//                 <Form.Control
//                   type="text"
//                   disabled={false}
//                   className="custom-select custom-style"
//                   name="data_source_name"
//                 />
//               </Col>
//             </Row>
//             <Row className="mb-4">
//               <Col xs={3}>
//                 <Form.Label>Environment</Form.Label>
//               </Col>
//               <Col>
//                 <Form.Control
//                   type="text"
//                   disabled={false}
//                   className="custom-select custom-style"
//                   name="environment"
//                 />
//               </Col>
//             </Row>
//             <Row className="mb-4">
//               <Col xs={3}>
//                 <Form.Label>Connection String</Form.Label>
//               </Col>
//               <Col>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   disabled={false}
//                   className="custom-select custom-style"
//                   name="connection_string"
//                 />
//               </Col>
//             </Row>
//           </Form>
//         </Card.Body>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button
//           variant="secondary"
//           onClick={props.handleCloseModalDSC}
//           className="btn-cl"
//         >
//           Close
//         </Button>
//         <Button
//           variant="primary"
//           onClick={props.handleCloseModalDSC}
//           className="btn-save"
//         >
//           Save Changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default DataSourceModal;

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
    connect_string: "",
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
  // const sidebarData = [
  //   {
  //     connection_name: "Connection 1",
  //     connection_type: "Type 1",
  //     data_source_name: "Source 1",
  //     environment: "Environment 1",
  //     connection_string: "Connection String 1",
  //   },
  //   {
  //     connection_name: "Connection 2",
  //     connection_type: "Type 2",
  //     data_source_name: "Source 2",
  //     environment: "Environment 2",
  //     connection_string: "Connection String 2",
  //   },
  // ];

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
    handleCloseModalDSC();
  };

  const handleCloseModalDSC = () => {
    setSelectedItem(null);
    setFormData({
      connection_name: "",
      connection_type: "",
      data_source_name: "",
      connection_env: "",
      connect_string: "",
    });
    props.handleCloseModalDSC();
  };

  // const handleInputChange = (e) => {
  //   handleChange(e); // Call the handleChange function
  //   handleParseJson(e.target.value); // Call the handleParseJson function
  // };

  const filteredSourceConnections = connections.filter(
    (connection) => connection.connection_type !== "SNOWFLAKE"
  );

  return (
    <Modal show={props.showModalDSC} onHide={handleCloseModalDSC} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create Data Source Connection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col xs={4} className="sidebar-container">
              <div className="sidebar">
                <div className="sidebar-heading">Connection List</div>
                {filteredSourceConnections.map((item, index) => (
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
                      <Form.Label>Data Source Name</Form.Label>
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
                        value={formData.connection_env}
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
                        value={JSON.stringify(formData.connect_string)}
                        onChange={handleChange}
                        onBlur={(e) => handleParseJson(e.target.value)}
                      />
                      {parsedJson && (
                        <div className="json-view-container">
                          <ReactJson
                            src={parsedJson}
                            theme="ocean"
                            name={null}
                            enableClipboard={false}
                            displayDataTypes={false}
                            displayObjectSize={false}
                          />
                        </div>
                      )}
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
          onClick={handleCloseModalDSC}
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
