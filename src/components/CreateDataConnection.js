import React, { useEffect, useState } from "react";
// import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  Overlay,
  Popover,
  Modal,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "../styles/main.css";
import "./CreateDataConnection.css";

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

  const [dataSourceConnection, setDataSourceConnection] = useState(null);

  const [showModalDSC, setShowModalDSC] = useState(false);
  const handleShowModalDSC = () => {
    setShowModalDSC(true);
  };
  const handleCloseModalDSC = () => {
    setShowModalDSC(false);
  };

  const [showModalDTC, setShowModalDTC] = useState(false);
  const handleShowModalDTC = () => {
    setShowModalDTC(true);
  };
  const handleCloseModalDTC = () => {
    setShowModalDTC(false);
  };

  const [showModalApp, setShowModalApp] = useState(false);
  const handleShowModalApp = () => {
    setShowModalApp(true);
  };
  const handleCloseModalApp = () => {
    setShowModalApp(false);
  };

  // useEffect(() => {
  //   onData(dataSourceConnection);
  // }, [dataSourceConnection]);

  return (
    <div className="page1">
      <Row>
        <Card.Body>
          <div className="text-left">
            <Form>
              <Row>
                {/* <div className="form-group">
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
                </div> */}
                <div>
                  <Row className="mb-3">
                    {/* <Form.Control
                      value={props.pageAnswers.Application}
                    ></Form.Control> */}
                    <Form.Label>Data Source Connection</Form.Label>

                    <Col>
                      <Form.Select
                        name="DataSourceConnection"
                        onChange={changeHandler}
                        value={answer1.DataSourceConnection}
                        isInvalid={answer1.DataSourceConnection === ""}
                      >
                        <option value={""}>Select..</option>
                        <option value="dsc1">dsc1</option>
                        <option value="dsc2">dsc2</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select an option.
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Icon.CloudPlusFill
                        size={40}
                        className="icon"
                        onClick={handleShowModalDSC}
                      />

                      <Modal
                        show={showModalDSC}
                        onHide={handleCloseModalDSC}
                        size="xl"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            Create Data Scouce Connection
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {/* Add content for the large popup here */}
                          <p>Some Content</p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={handleCloseModalDSC}
                            className="btn-cl"
                          >
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            onClick={handleCloseModalDSC}
                            className="btn-save"
                          >
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row className="mb-3">
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
                      <Icon.PatchPlusFill
                        size={40}
                        className="icon"
                        onClick={handleShowModalDTC}
                      />

                      <Modal
                        show={showModalDTC}
                        onHide={handleCloseModalDTC}
                        size="xl"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            Create Data Target Connection
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>Some Content</p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={handleCloseModalDTC}
                            className="btn-cl"
                          >
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            onClick={handleCloseModalDTC}
                            className="btn-save"
                          >
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row className="mb-3">
                    <Form.Label>Application</Form.Label>
                    <Col>
                      <Form.Select
                        name="Application"
                        onChange={changeHandler}
                        value={answer1.Application}
                      >
                        <option>{""}</option>
                        <option>App1</option>
                        <option>App2</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Icon.WindowPlus
                        className="icon"
                        size={40}
                        onClick={handleShowModalApp}
                      />

                      <Modal
                        show={showModalApp}
                        onHide={handleCloseModalApp}
                        size="xl"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Create Application</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <p>Some Content</p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={handleCloseModalApp}
                            className="btn-cl"
                          >
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            onClick={handleCloseModalApp}
                            className="btn-save"
                          >
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
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
