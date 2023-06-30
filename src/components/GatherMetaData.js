import React, { useState, useContext } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import "../styles/main.css";
import { DataContext } from "./DataContext";
import Scheduling from "./Scheduling";
import "./GatherMetaData.css";

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

  // console.log("MetaformData:", formData);
  console.log("meta ingestion Data", ingestionData);

  return (
    <Card.Body>
      <div className="text-left">
        <Form>
          <Row className="mb-4">
            <Col>
              <Form.Label>Business Tags</Form.Label>

              <Col xs={10}>
                <Form.Control
                  name="business_tags"
                  value={formData.GatherMetaData.business_tags}
                  onChange={changeHandler}
                  className="custom-select custom-style"
                />
              </Col>
            </Col>
            <Col>
              <Col>
                <Form.Label>Description</Form.Label>
              </Col>
              <Col xs={10}>
                <Form.Control
                  className="custom-select custom-style"
                  name="description"
                  value={formData.GatherMetaData.description}
                  onChange={changeHandler}
                />
              </Col>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Col>
                <Form.Label>Owner</Form.Label>
              </Col>
              <Col xs={10}>
                <Form.Control
                  className="custom-select custom-style"
                  name="owner"
                  value={formData.GatherMetaData.owner}
                  onChange={changeHandler}
                ></Form.Control>
              </Col>
            </Col>
            <Col>
              <Col>
                <Form.Label>Owner Email</Form.Label>
              </Col>
              <Col xs={10}>
                <Form.Control
                  className="custom-select custom-style"
                  name="email"
                  value={formData.GatherMetaData.email}
                  onChange={changeHandler}
                ></Form.Control>
              </Col>
            </Col>
          </Row>
          <Row className="mb-4">
            <Form.Label>Success Email Distribution List</Form.Label>

            <Col xs={8}>
              <Form.Control
                className="custom-select custom-style"
                name="success_email_list"
                value={formData.GatherMetaData.success_email_list}
                onChange={changeHandler}
              ></Form.Control>
            </Col>
          </Row>
          <Row className="mb-4">
            <Form.Label>Failure Email Distribution List</Form.Label>

            <Col xs={8}>
              <Form.Control
                className="custom-select custom-style"
                name="failure_email_list"
                value={formData.GatherMetaData.failure_email_list}
                onChange={changeHandler}
              ></Form.Control>
            </Col>
          </Row>
          <hr className="line-separator" /> {/* Line for separation */}
          {additionalFields.map((field) => (
            <Row key={field.id} className="mb-4">
              <Col>
                <Form.Control
                  plaintext
                  className="custom-select custom-style"
                  placeholder="Enter Title"
                />
                <Row>
                  <Col xs={8}>
                    <Form.Control
                      className="custom-select custom-style"
                      placeholder="Enter Details"
                    />
                  </Col>
                  <Col xs={1}>
                    <Button
                      variant="link"
                      className="close-button"
                      onClick={() => removeHandler(field.id)}
                    >
                      <XCircle size={18} color="red" />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
          <div style={{ float: "right" }}>
            <Row className="mb-4">
              <Button className="addBtn" onClick={addHandler}>
                Add
              </Button>
            </Row>
          </div>
          <br />
        </Form>
      </div>
      {/* <Scheduling /> */}
    </Card.Body>
  );
};

export default GatherMetaData;
