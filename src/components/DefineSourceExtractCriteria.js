import React, { useState } from "react";
import {
  Button,
  Container,
  Card,
  Form,
  Row,
  Col,
  Badge,
  ListGroup,
} from "react-bootstrap";
import "../App.css";

const DefineSourceExtractCriteria = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [selectedValues, setSelectedValues] = useState([]);

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDropdownChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedValues(selectedOptions);
  };
  return (
    <div className="App">
      <Container className="h-100">
          <Card.Body>
            <Form>
              <Form.Group as={Row} className="align-items-center">
                <Form.Label column sm={2}>
                  Incremental
                </Form.Label>
                <Col sm={4}>
                  <Form.Check
                    type="radio"
                    label=""
                    name="radioGroup"
                    value="incremental"
                    checked={selectedOption === "incremental"}
                    onChange={handleRadioChange}
                  />
                </Col>
                <Col sm={6}>
                  <Form.Check
                    type="checkbox"
                    label="Select Distinct"
                    id="checkbox"
                    className="mb-0"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="align-items-center">
                <Form.Label column sm={2}>
                  Full Extract
                </Form.Label>
                <Col sm={4}>
                  <Form.Check
                    type="radio"
                    label=""
                    name="radioGroup"
                    value="fullextract"
                    checked={selectedOption === "fullextract"}
                    onChange={handleRadioChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Selected Option
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    value={selectedOption}
                    readOnly
                    className="mb-3"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="dropdown">
                <Form.Label column sm={2}>
                  Incremental column
                </Form.Label>
                <Col sm={10}>
                  <Form.Select
                    multiple
                    value={selectedValues}
                    onChange={handleDropdownChange}
                    className="mb-3"
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                  </Form.Select>
                  <ListGroup>
                    {selectedValues.map((value) => (
                      <ListGroup.Item key={value} className="mb-3">
                        <Badge bg="secondary">{value}</Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                {/* <Form.Label column sm={2}>
              Input Fields
            </Form.Label> */}
                <Col sm={10}>
                  <Row>
                    <Col sm={6}>
                      <Form.Group as={Row} controlId="input1">
                        <Form.Label column sm={6}>
                          Incremental start_datetime
                        </Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="text"
                            placeholder="Input 1"
                            className="mb-3"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group as={Row} controlId="input2">
                        <Form.Label column sm={6}>
                          Incremental End_datetime
                        </Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="text"
                            placeholder="Input 2"
                            className="mb-3"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6}>
                      <Form.Group as={Row} controlId="input3">
                        <Form.Label column sm={6}>
                          Incremental start_seq
                        </Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="text"
                            placeholder="Input 3"
                            className="mb-3"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group as={Row} controlId="input4">
                        <Form.Label column sm={6}>
                          Incremental end_seq
                        </Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="text"
                            placeholder="Input 4"
                            className="mb-3"
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Default StartValue
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Input 1"
                    className="mb-3"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Filter to be applied
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Input 1"
                    className="mb-3"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Order by
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Input 1"
                    className="mb-3"
                  />
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
      </Container>
    </div>
  );
};

export default DefineSourceExtractCriteria;
