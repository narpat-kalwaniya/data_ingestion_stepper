import React from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import Select from "react-select";

const SaveDetailsModal = ({ show, onHide }) => {
  const orderByOptions = [
    { value: "table", label: "Table" },
    { value: "view", label: "View" },
  ];
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Save</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-4">
            <Form.Label>Enter Query Name</Form.Label>

            <Form.Control
              type="text"
              disabled={false}
              className="custom-select custom-style"
            />
          </Row>

          <Row className="mb-4">
            <Form.Label> Enter Dependent Query Name</Form.Label>

            <Col style={{ padding: "0px" }}>
              <Select
                isMulti
                // options={orderByOptions}
                // value={formData.DefineSourceExtractCriteria.order_by}
                // onChange={(options) => orderByChangeHandler(options)}
                className="custom-select custom-style"
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Form.Label> Materilize type</Form.Label>

            <Col style={{ padding: "0px" }}>
              <Select
                // isMulti
                options={orderByOptions}
                // value={formData.DefineSourceExtractCriteria.order_by}
                // onChange={(options) => orderByChangeHandler(options)}
                className="custom-select custom-style"
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-c " onClick={onHide}>
          Close
        </button>
        <button className="btn-s ">Save</button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaveDetailsModal;
