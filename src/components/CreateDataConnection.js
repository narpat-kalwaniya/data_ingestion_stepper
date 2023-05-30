import React, { useState, useRef } from "react";
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

// import "./Page1.css";

const DefineDataConnection = () => {
  // const [dataSourceType, setDataSourceType] = useState("");

  // const selectChangeHandler = (event) => {
  //   const { value } = event.target;
  //   setDataSourceType(value);
  //   // console.log(value);
  // };

  const [dataSourceConnection, setDataSourceConnection] = useState(null);

  // const [showPopoverDTC, setShowPopoverDTC] = useState(false);

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
                  <Row>
                    <Form.Label>Data Source Connection</Form.Label>

                    <Col>
                      <Form.Select
                        value={dataSourceConnection}
                        onChange={(e) =>
                          setDataSourceConnection(e.target.value)
                        }
                        isInvalid={dataSourceConnection === ""}
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
                      <Button variant="primary" onClick={handleShowModalDSC}>
                        <Icon.CloudPlusFill size={40} className="icon" />
                      </Button>
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
                          >
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            onClick={handleCloseModalDSC}
                          >
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Form.Label>Data Target Connection</Form.Label>
                    <Col>
                      <Form.Select>
                        <option>{""}</option>
                        <option>dtc1</option>
                        <option>dtc2</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Button variant="primary" onClick={handleShowModalDTC}>
                        <Icon.PatchPlusFill size={40} className="icon" />
                      </Button>
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
                          >
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            onClick={handleCloseModalDTC}
                          >
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row>
                    <Form.Label>Application</Form.Label>
                    <Col>
                      <Form.Select>
                        <option>{""}</option>
                        <option>dtc1</option>
                        <option>dtc2</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Button variant="primary" onClick={handleShowModalApp}>
                        <Icon.WindowPlus className="icon" size={40} />
                      </Button>
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
                          >
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            onClick={handleCloseModalApp}
                          >
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      {/* <Button
                        ref={targetApp}
                        onClick={createApplicationHandler}
                      >
                        <Overlay
                          show={showPopoverApp}
                          target={targetApp.current}
                          placement="bottom"
                          onHide={() => setShowPopoverApp(false)}
                          rootClose
                        >
                          <Popover id="popover">
                            <Popover.Body>Create Application</Popover.Body>
                          </Popover>
                        </Overlay>
                        <Icon.WindowPlus className="icon" size={40} />
                      </Button> */}
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
