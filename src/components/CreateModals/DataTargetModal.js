import React from "react";
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
import "./DataTargetModal.css";

const DataTargetModal = (props) => {
  return (
    <Modal
      show={props.showModalDTC}
      onHide={props.handleCloseModalDTC}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Data Target Connection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Some Content</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.handleCloseModalDTC}
          className="btn-cl"
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={props.handleCloseModalDTC}
          className="btn-save"
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DataTargetModal;
