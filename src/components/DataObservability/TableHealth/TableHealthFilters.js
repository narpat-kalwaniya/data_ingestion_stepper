import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BsInfoCircle } from "react-icons/bs";

const TableHealthFilters = (props) => {
  const options = props.data.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ));

  return (
    <div>
      <Row
        style={{
          marginTop: "10px",
          // marginBottom: "15px",
          alignItems: "center",
          paddingBottom: "15px",
          // borderBottom: "1px solid rgb(230,230,230)",
        }}
      >
        <Col>
          <Row style={{ height: "23px" }}>
            <Col>
              <Form.Label
                style={{
                  color: "#4f4f4f",
                  fontSize: "12px",
                  opacity: "0.8",
                  marginLeft: "5px",
                }}
              >
                Tags
              </Form.Label>
            </Col>
            <Col>
              <Form.Label
                style={{
                  color: "#4f4f4f",
                  fontSize: "12px",
                  opacity: "0.8",
                  marginLeft: "5px",
                }}
              >
                Table
              </Form.Label>
            </Col>
            <Col>
              {/* <Form.Label
                style={{
                  color: "#4f4f4f",
                  fontSize: "12px",
                  opacity: "0.8",
                  marginLeft: "5px",
                }}
              >
                Incident Status
              </Form.Label> */}
            </Col>
            <Col>
              {/* <Form.Label
                style={{
                  color: "#4f4f4f",
                  fontSize: "12px",
                  opacity: "0.8",
                  marginLeft: "5px",
                }}
              >
                Incident Severity
              </Form.Label> */}
            </Col>
          </Row>
          <Row className="mb-1">
            <Col>
              <Form.Control
                className="custom-select custom-style"
                type="text"
                placeholder="Search Tags . . ."
                style={{
                  width: "90%",
                  padding: "5px",
                  "::placeholder": { color: "#4f4f4f", opacity: "0.3" },
                }}
              />
            </Col>
            <Col>
              <Form.Group>
                <Form.Select
                  className="custom-select custom-style"
                  type="text"
                  placeholder=""
                  style={{ width: "90%", padding: "5px" }}
                >
                  <option>--Select--</option>
                  {options}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              {/* <Form.Select
                className="custom-select custom-style"
                type="text"
                placeholder=""
                style={{ width: "90%", padding: "5px" }}
              >
                <option>--Select--</option>
                <option>Project1</option>
              </Form.Select> */}
            </Col>
            <Col>
              {/* <Form.Select
                className="custom-select custom-style"
                type="text"
                placeholder=""
                style={{ width: "90%", padding: "5px" }}
              >
                <option>--Select--</option>
                <option>Project1</option>
              </Form.Select> */}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check
                label="Key assets only"
                style={{ color: "#4f4f4f", fontSize: "12px" }}
              />
            </Col>
            <Col>
              <div style={{ display: "flex" }}>
                <Form.Check
                  label="Include normalized"
                  style={{
                    color: "#4f4f4f",
                    fontSize: "12px",
                    marginRight: "5px",
                  }}
                />
                <BsInfoCircle />
              </div>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TableHealthFilters;
