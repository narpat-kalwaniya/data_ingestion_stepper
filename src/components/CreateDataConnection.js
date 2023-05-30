import React, { useEffect, useState } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "../styles/main.css";
// import "./Page1.css";

const DefineDataConnection = (props) => {
  const [answer1, setAnswer1] = useState({
    DataSourceConnection: "",
    DataTargetConnection: "",
    Application: "",
  });
  const changeHandler = (e) => {
    props.setPageAnswers({
      ...props.pageAnswers,
      [e.target.name]: e.target.value,
    });
    setAnswer1({ ...answer1, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem(props.step));
    props.setPageAnswers(data);
    setAnswer1(data);
    console.log(props.pageAnswers);
    // console.log("object is not available");
  }, [props.step]);

  // console.log(props.pageAnswers.Application);

  useEffect(() => {
    delete props.pageAnswers["data"];
    window.localStorage.setItem(props.step, JSON.stringify(props.pageAnswers));
  }, [props.step]);

  // localStorage.clear();

  return (
    <div className="page1">
      <Row>
        <Card.Body>
          <div className="text-left">
            <Form>
              <Row>
                {/* <div className="form-group">
                  <Form.Label>Data Source Type</Form.Label>
                  <Form.Select aria-label="" disabled={false}>
                    <option>{""}</option>
                    <option value={"RDBMS"}>RDBMS</option>
                    <option value={"FILE"}>FILE</option>
                  </Form.Select>
                </div> */}
                <div>
                  <Row>
                    {/* <Form.Control
                      value={props.pageAnswers.Application}
                    ></Form.Control> */}
                    <Form.Label>Data Source Connection</Form.Label>

                    <Col>
                      <Form.Select
                        name="DataSourceConnection"
                        onChange={changeHandler}
                        value={answer1.DataSourceConnection}
                      >
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
                      <Form.Select
                        name="DataTargetConnection"
                        onChange={changeHandler}
                        value={answer1.DataTargetConnection}
                      >
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
                      <Form.Select
                        name="Application"
                        onChange={changeHandler}
                        value={answer1.Application}
                      >
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
