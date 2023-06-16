import React, { useState, useContext } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import "../styles/main.css";
import { DataContext } from "./DataContext";

const GatherMetaData = ({ formData, updateFormData }) => {
  const [additionalFields, setAdditionalFields] = useState([]);
  const { ingestionData, updateIngestionData } = useContext(DataContext);

  const changeHandler = (e) => {
    const updatedFormData = {
      ...formData,
      GatherMetaData: {
        ...formData.GatherMetaData,
        [e.target.name]: e.target.value,
      },
    };
    updateFormData(updatedFormData);
    const updatedData = { ...ingestionData[0] };
    updatedData.additional_metadata = {
      ...updatedData.additional_metadata,
      [e.target.name]: e.target.value,
    };
    updateIngestionData(updatedData);
  };

  const addHandler = () => {
    setAdditionalFields([...additionalFields, { id: Date.now() }]);
  };

  const removeHandler = (id) => {
    const updatedFields = additionalFields.filter((field) => field.id !== id);
    setAdditionalFields(updatedFields);
  };

  console.log("MetaformData:", formData);
  console.log("ingestion Data", ingestionData);

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
                    <Form.Control
                      className="mb-3"
                      name="business_tags"
                      value={formData.GatherMetaData.business_tags}
                      onChange={changeHandler}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Description</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control
                      className="mb-3"
                      name="description"
                      value={formData.GatherMetaData.description}
                      onChange={changeHandler}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Owner</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control
                      className="mb-3"
                      name="owner"
                      value={formData.GatherMetaData.owner}
                      onChange={changeHandler}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Owner Email</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control
                      className="mb-3"
                      name="email"
                      value={formData.GatherMetaData.email}
                      onChange={changeHandler}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Success Email Distribution List</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control
                      className="mb-3"
                      name="success_email_list"
                      value={formData.GatherMetaData.success_email_list}
                      onChange={changeHandler}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col sm={4}>
                    <Form.Label>Failure Email Distribution List</Form.Label>
                  </Col>
                  <Col sm={6}>
                    <Form.Control
                      className="mb-3"
                      name="failure_email_list"
                      value={formData.GatherMetaData.failure_email_list}
                      onChange={changeHandler}
                    ></Form.Control>
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
                        <XCircle size={18} color="red" />
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Row>
              <div style={{ float: "right" }}>
                <Button className="btn-s-1" onClick={addHandler}>
                  Add
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Row>
    </div>
  );
};

export default GatherMetaData;
