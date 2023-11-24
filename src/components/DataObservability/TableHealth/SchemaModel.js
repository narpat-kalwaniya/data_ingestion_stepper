import React, { useState } from "react";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";

const SchemaModal = ({ show, onClose }) => {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [checkbox4, setCheckbox4] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);
  const [checkbox6, setCheckbox6] = useState(false);
  const [checkbox7, setCheckbox7] = useState(false);
  const [checkbox8, setCheckbox8] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSave = () => {
    // Handle saving the selected values and checkboxes here
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Table Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row style={{ margin: "10px 0" }}>
            <Col xs={4}>
              <Form.Label>Table</Form.Label>
              <Form.Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                style={{ fontSize: "14px" }}
              >
                <option value="">Select an option</option>
                <option value="option1">table</option>
                <option value="option2">table2</option>
                <option value="option3">table3</option>
              </Form.Select>
            </Col>
          </Row>
          <Row style={{ margin: "10px 0" }}>
            <Col>
              <Form.Label>Table Changes</Form.Label>
              <div className="radio-group">
                <Form.Check
                  inline
                  type="checkbox"
                  label="New Tables"
                  name="options"
                  value="RDBMS-TABLE"
                  checked={checkbox1}
                  onChange={() => setCheckbox1(!checkbox1)}
                  className="custom-radio"
                />

                <Form.Check
                  inline
                  type="checkbox"
                  label="Deleted Tables"
                  name="options"
                  value="RDBMS-QUERY"
                  checked={checkbox2}
                  onChange={() => setCheckbox2(!checkbox2)}
                  className="custom-radio"
                />
              </div>
            </Col>
          </Row>
          <Row style={{ margin: "10px 0" }}>
            <Form.Label>Attribute Changes</Form.Label>
            <Col>
              <div className="radio-group">
                <Form.Check
                  inline
                  type="checkbox"
                  label="New"
                  name="options"
                  value="RDBMS-TABLE"
                  checked={checkbox3}
                  onChange={() => setCheckbox3(!checkbox3)}
                  className="custom-radio"
                />
              </div>
            </Col>
            <Col>
              <div className="radio-group">
                <Form.Check
                  inline
                  type="checkbox"
                  label="Modified"
                  name="options"
                  value="RDBMS-QUERY"
                  checked={checkbox4}
                  onChange={() => setCheckbox4(!checkbox4)}
                  className="custom-radio"
                />

                <Form.Check
                  inline
                  type="checkbox"
                  label="Data Type"
                  name="options"
                  value="RDBMS-QUERY"
                  checked={checkbox5}
                  onChange={() => setCheckbox5(!checkbox5)}
                  className="custom-radio"
                />

                <Form.Check
                  inline
                  type="checkbox"
                  label="Ordinal Position"
                  name="options"
                  value="RDBMS-QUERY"
                  checked={checkbox6}
                  onChange={() => setCheckbox6(!checkbox6)}
                  className="custom-radio"
                />

                <Form.Check
                  inline
                  type="checkbox"
                  label="Nullability"
                  name="options"
                  value="RDBMS-QUERY"
                  checked={checkbox7}
                  onChange={() => setCheckbox7(!checkbox7)}
                  className="custom-radio"
                />
              </div>
            </Col>
            <Col>
              <div className="radio-group">
                <Form.Check
                  inline
                  type="checkbox"
                  label="Deleted"
                  name="options"
                  value="RDBMS-QUERY"
                  checked={checkbox8}
                  onChange={() => setCheckbox8(!checkbox8)}
                  className="custom-radio"
                />
              </div>
              {/* <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox3}
                  onChange={() => setCheckbox3(!checkbox3)}
                />
                <Form.Check.Label>New</Form.Check.Label>
              </Form.Check>
            </Col>
            <Col>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox4}
                  onChange={() => setCheckbox4(!checkbox4)}
                />
                <Form.Check.Label>Modified</Form.Check.Label>
              </Form.Check>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox5}
                  onChange={() => setCheckbox5(!checkbox5)}
                />
                <Form.Check.Label>Data Type</Form.Check.Label>
              </Form.Check>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox6}
                  onChange={() => setCheckbox6(!checkbox6)}
                />
                <Form.Check.Label>Ordinal Position</Form.Check.Label>
              </Form.Check>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox7}
                  onChange={() => setCheckbox7(!checkbox7)}
                />
                <Form.Check.Label>Nullability</Form.Check.Label>
              </Form.Check>
            </Col>
            <Col>
              <Form.Check>
                <Form.Check.Input
                  type="checkbox"
                  checked={checkbox8}
                  onChange={() => setCheckbox8(!checkbox8)}
                />
                <Form.Check.Label>Deleted</Form.Check.Label>
              </Form.Check> */}
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SchemaModal;
