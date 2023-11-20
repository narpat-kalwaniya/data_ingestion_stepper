import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const Bar = (props) => {
  const [attributes, setAttributes] = useState({
    Attributes: [],
    Datatypes: [],
  });

  const DSchangeHandler = (e) => {
    props.setSelectedDS(e.target.value);
    setAttributes(props.data[e.target.value]);
  };

  const attributeHandler = (e) => {
    props.setSelectedAttribute(e.target.value);
  };

  console.log(attributes);
  return (
    <Row
      style={{
        marginTop: "10px",
        // marginBottom: "15px",
        marginLeft: "20px",
        alignItems: "center",
        paddingBottom: "15px",
        // borderBottom: "1px solid rgb(230,230,230)",
      }}
    >
      <Col xs={6}>
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
              Data Source
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
              Attribute
            </Form.Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Select
                className="custom-select custom-style"
                type="text"
                placeholder=""
                style={{ width: "90%", padding: "5px" }}
                onChange={DSchangeHandler}
                value={props.selectedDS}
              >
                <option>--Select--</option>
                {Object.keys(props.data).map((o) => (
                  <option>{o}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Select
                className="custom-select custom-style"
                type="text"
                placeholder=""
                style={{ width: "90%", padding: "5px" }}
                onChange={(event) => attributeHandler(event)}
              >
                <option>--Select--</option>
                {attributes.Attributes.map((o) => (
                  <option>{o}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Bar;
