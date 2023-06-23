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

const DataSourceModal = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleSidebarItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Modal
      show={props.showModalDSC}
      onHide={props.handleCloseModalDSC}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Data Source Connection</Modal.Title>
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
                        disabled={false}
                        className="custom-select custom-style"
                        name="connection_name"
                        value={selectedItem ? selectedItem.connection_name : ""}
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
                        disabled={false}
                        className="custom-select custom-style"
                        name="connection_type"
                        value={selectedItem ? selectedItem.connection_type : ""}
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
                        disabled={false}
                        className="custom-select custom-style"
                        name="data_source_name"
                        value={
                          selectedItem ? selectedItem.data_source_name : ""
                        }
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
                        disabled={false}
                        className="custom-select custom-style"
                        name="environment"
                        value={selectedItem ? selectedItem.environment : ""}
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
                        disabled={false}
                        className="custom-select custom-style"
                        name="connection_string"
                        value={
                          selectedItem ? selectedItem.connection_string : ""
                        }
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
          onClick={props.handleCloseModalDSC}
          className="btn-cl"
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={props.handleCloseModalDSC}
          className="btn-save"
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DataSourceModal;
