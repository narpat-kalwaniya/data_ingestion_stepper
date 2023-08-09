import React from "react";
import { Modal, Form } from "react-bootstrap";

const AddDetailsModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>{/* Your form content goes here */}</Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-c " onClick={onHide}>
          Close
        </button>
        <button className="btn-s ">Add</button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDetailsModal;
