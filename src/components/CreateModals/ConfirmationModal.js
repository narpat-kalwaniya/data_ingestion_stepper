import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({ show, onClose, onDelete }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      style={{ fontSize: "14px", color: "#4F4F4F" }}
    >
      <Modal.Header closeButton>
        {/* <Modal.Title>Modal heading</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this data?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          No, Cancel
        </Button>
        <Button variant="primary" onClick={onDelete}>
          Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
