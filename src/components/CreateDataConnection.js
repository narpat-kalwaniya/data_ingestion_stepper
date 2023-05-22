import React, { useState } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

// import "./Page1.css";

const DefineDataConnection = () => {
  const [dataSourceType, setDataSourceType] = useState("");

  const selectChangeHandler = (event) => {
    const { value } = event.target;
    setDataSourceType(value);
    // console.log(value);
  };
  return (
    <div className="page1">
      <Row>
        <Card.Body>
          <div className="text-left">
            <Form>
              <Row>
                <div className="form-group">
                  <Form.Label>Data Source Type</Form.Label>
                  <Form.Select
                    aria-label=""
                    value={dataSourceType}
                    onChange={selectChangeHandler}
                    disabled={false}
                  >
                    <option>{""}</option>
                    <option value={"RDBMS"}>RDBMS</option>
                    <option value={"FILE"}>FILE</option>
                  </Form.Select>
                </div>
                <div>
                  <Row>
                    <Form.Label>Data Source Connection</Form.Label>

                    <Col>
                      <Form.Select disabled={dataSourceType !== "RDBMS"}>
                        <option>{""}</option>
                        <option>dsc1</option>
                        <option>dsc2</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Icon.CloudPlusFill size={40} className="icon" />
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Form.Label>Data Target Connection</Form.Label>
                    <Col>
                      <Form.Select disabled={dataSourceType !== "RDBMS"}>
                        <option>{""}</option>
                        <option>dtc1</option>
                        <option>dtc2</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Icon.PatchPlusFill size={40} className="icon" />
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Form.Label>Application</Form.Label>
                    <Col>
                      <Form.Select disabled={dataSourceType !== "RDBMS"}>
                        <option>{""}</option>
                        <option>dtc1</option>
                        <option>dtc2</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Icon.WindowPlus className="icon" size={40} />
                    </Col>
                  </Row>
                </div>
                <Col></Col>
              </Row>
            </Form>
          </div>
        </Card.Body>
      </Row>
    </div>
  );
};

export default DefineDataConnection;
