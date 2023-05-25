import React, { useState } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import "../styles/main.css";

const GatherMetaData = () => {
  const [additionalFields, setAdditionalFields] = useState([]);

  const addHandler = () => {
    setAdditionalFields([...additionalFields, { id: Date.now() }]);
  };

  const removeHandler = (id) => {
    const updatedFields = additionalFields.filter((field) => field.id !== id);
    setAdditionalFields(updatedFields);
  };

  return (
    <div>
      <Row>
        <Card.Body>
          <div className="text-left">
            <Form>
              <Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Business Tags</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control className="mb-3" />
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Description</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control className="mb-3" />
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Owner</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control className="mb-3"></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Owner Email</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control className="mb-3"></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Success Email Distribution List</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control className="mb-3"></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Failure Email Distribution List</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control className="mb-3"></Form.Control>
                  </Col>
                </Row>
                <hr className="line-separator" /> {/* Line for separation */}
                {additionalFields.map((field) => (
                  <Row key={field.id}>
                    <Col sm={4}>
                      <Form.Control
                        plaintext
                        className="mb-3"
                        placeholder="Enter Title"
                      />
                    </Col>
                    <Col sm={6}>
                      <Form.Control
                        className="mb-3"
                        placeholder="Enter Details"
                      />
                    </Col>
                    <Col sm={2}>
                      <Button
                        variant="link"
                        className="close-button"
                        onClick={() => removeHandler(field.id)}
                      >
                        <XCircle size={18} />
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Row>
              <div style={{ float: "right" }}>
                <button className="btn-s-1" onClick={addHandler} type="button">
                  Add
                </button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Row>
    </div>
  );
};

export default GatherMetaData;
