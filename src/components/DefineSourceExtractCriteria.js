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
  FormGroup,
} from "react-bootstrap";
import "../App.css";

const DefineSourceExtractCriteria = () => {
  const [selectedOption, setSelectedOption] = useState("incremental");
  const [selectedValues, setSelectedValues] = useState([]);

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSelect = (e) => {
    const selectedOption = e.target.value;
    if (!selectedValues.includes(selectedOption)) {
      setSelectedValues((prevSelectedValues) => [...prevSelectedValues, selectedOption]);
    }
  };

  const handleBadgeClose = (value) => {
    setSelectedValues((prevSelectedValues) => prevSelectedValues.filter((v) => v !== value));
  };

  const isIncrementalSelected = selectedOption === "incremental";

  console.log("selected values",selectedValues)

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
              {/* <Form.Group as={Row}>
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
              </Form.Group> */}

              <FormGroup>
              <Form.Label>Incremental by</Form.Label>
                      <Form.Select aria-label="" disabled={!isIncrementalSelected}>
                        <option>{""}</option>
                        <option>Date</option>
                        <option>Sequence</option>
                      </Form.Select>
              </FormGroup>

              <Form.Group>
        <Form.Label> Select Incremental Columns</Form.Label>
        <Form.Control as="select" multiple onChange={handleSelect} disabled={!isIncrementalSelected}>
          <option value="FIRST_NAME">FIRST_NAME</option>
          <option value="LAST_NAME">LAST_NAME</option>
          <option value="PHONE1">PHONE1</option>
          <option value="WEBSITE">WEBSITE</option>
          <option value="EMAIL">EMAIL</option>
        </Form.Control>
      </Form.Group>
      <div className="mt-2">
        {selectedValues.map((value) => (
          <Badge key={value} variant="primary" className="mr-1 mb-3" style={{ marginRight: '5px' }}>
            {value}
            <span
              className="badge badge-secondary ml-1"
              style={{ cursor: 'pointer' }}
              onClick={() => handleBadgeClose(value)}
            >
              X
            </span>
          </Badge>
        ))}
      </div>

              <Form.Group as={Row}>
                {/* <Form.Label column sm={2}>
              Input Fields
            </Form.Label> */}
                <Col sm={10}>
                  <Row>
                    <Col sm={6}>
                      <Form.Group as={Row} controlId="input1">
                        <Form.Label column sm={6}>
                          Incremental Start Datetime
                        </Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="text"
                            placeholder=""
                            className="mb-3"
                            disabled={!isIncrementalSelected}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group as={Row} controlId="input2">
                        <Form.Label column sm={6}>
                          Incremental End Datetime
                        </Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="text"
                            placeholder=""
                            className="mb-3"
                            disabled={!isIncrementalSelected}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6}>
                      <Form.Group as={Row} controlId="input3">
                        <Form.Label column sm={6}>
                          Incremental Start Seq
                        </Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="text"
                            placeholder=""
                            className="mb-3"
                            disabled={!isIncrementalSelected}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group as={Row} controlId="input4">
                        <Form.Label column sm={6}>
                          Incremental End Seq
                        </Form.Label>
                        <Col sm={4}>
                          <Form.Control
                            type="text"
                            placeholder=""
                            className="mb-3"
                            disabled={!isIncrementalSelected}
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
                    placeholder=""
                    className="mb-3"
                    disabled={!isIncrementalSelected}
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
                    placeholder=""
                    className="mb-3"
                    disabled={isIncrementalSelected}
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
                    placeholder=""
                    className="mb-3"
                    disabled={isIncrementalSelected}
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
