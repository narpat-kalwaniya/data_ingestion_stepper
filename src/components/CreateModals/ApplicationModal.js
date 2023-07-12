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
// import "./ApplicationModal.css";

// const ApplicationModal = (props) => {
//   return (
//     <Modal
//       show={props.showModalApp}
//       onHide={props.handleCloseModalApp}
//       size="lg"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Create Application</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Card.Body className="custom-card-body">
//           <Form>
//             <Row className="mb-4">
//               <Col xs={3}>
//                 <Form.Label>Application Name</Form.Label>
//               </Col>
//               <Col>
//                 <Form.Control
//                   type="text"
//                   disabled={false}
//                   className="custom-select custom-style"
//                 />
//               </Col>
//             </Row>
//             <Row className="mb-4">
//               <Col xs={3}>
//                 <Form.Label>Application Type</Form.Label>
//               </Col>
//               <Col>
//                 <Form.Control
//                   type="text"
//                   disabled={false}
//                   className="custom-select custom-style"
//                 />
//               </Col>
//             </Row>
//             <Row className="mb-4">
//               <Col xs={3}>
//                 <Form.Label> Failure Recipients</Form.Label>
//               </Col>
//               <Col>
//                 <Form.Control
//                   type="text"
//                   disabled={false}
//                   className="custom-select custom-style"
//                 />
//               </Col>
//             </Row>

//             <Row className="mb-4">
//               <Col xs={3}>
//                 <Form.Label>Success Recipients</Form.Label>
//               </Col>
//               <Col>
//                 <Form.Control
//                   type="text"
//                   disabled={false}
//                   className="custom-select custom-style"
//                 />
//               </Col>
//             </Row>
//           </Form>
//         </Card.Body>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button
//           variant="secondary"
//           onClick={props.handleCloseModalApp}
//           className="btn-cl"
//         >
//           Close
//         </Button>
//         <Button
//           variant="primary"
//           onClick={props.handleCloseModalApp}
//           className="btn-save"
//         >
//           Save Changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ApplicationModal;

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

const ApplicationModal = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [connections, setConnections] = useState([]);

  const [formData, setFormData] = useState({
    app_name: "",
    app_type: "",
    failure_recipients: null,
    success_recipients: null,
  });

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/appdetails/"
        );
        const data = await response.json();
        setConnections(data);
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    fetchConnections();
  }, []);

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

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/apps/",
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
        console.log("App Data sent successfully!");
        console.log("App data sending", formData);
        handleCloseModalApp();
      } else {
        // Handle error response
        console.error("Error sending Form Data:", response.status);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error sending Form Data:", error);
    }
    console.log("Form app Data:", formData);
  };

  const handleCloseModalApp = () => {
    setSelectedItem(null);
    setFormData({
      app_name: "",
      app_type: "",
      failure_recipients: null,
      success_recipients: null,
    });
    props.handleCloseModalApp();
  };

  return (
    <Modal show={props.showModalApp} onHide={handleCloseModalApp} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create Application</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col xs={4} className="sidebar-container">
              <div className="sidebar">
                <div className="sidebar-heading">Connection List</div>
                {connections.map((item, index) => (
                  <div
                    key={index}
                    className={`sidebar-item ${
                      selectedItem === item ? "active" : ""
                    }`}
                    onClick={() => handleSidebarItemClick(item)}
                  >
                    <span className="sidebar-item-serial">{index + 1}.</span>{" "}
                    {item.app_name}
                  </div>
                ))}
              </div>
            </Col>
            <Col>
              <Card.Body className="custom-card-body">
                <Form>
                  <Row className="mb-4">
                    <Col xs={3}>
                      <Form.Label>Application Name</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        className="custom-select custom-style"
                        name="app_name"
                        value={formData.app_name}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col xs={3}>
                      <Form.Label>Application Type</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        className="custom-select custom-style"
                        name="app_type"
                        value={formData.app_type}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-4">
                    <Col xs={3}>
                      <Form.Label>Failure Recipients</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        className="custom-select custom-style"
                        name="failure_recipients"
                        value={formData.failure_recipients}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col xs={3}>
                      <Form.Label>Success Recipients</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        className="custom-select custom-style"
                        name="success_recipients"
                        value={formData.success_recipients}
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
          onClick={handleCloseModalApp}
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

export default ApplicationModal;
