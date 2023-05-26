import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

// import "./Page1.css";

const DefineDataConnection = (props) => {
  const [connections, setConnections] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/conndetails/"
        );
        const data = await response.json();
        setConnections(data);
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/appdetails/"
        );
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchConnections();
    fetchApplications();
  }, []);

  const handleSelection = (event) => {
    const selectedConnectionName = event.target.value;
    // Handle the selected connection name here
    console.log(selectedConnectionName);
  };

  const filteredSourceConnections = connections.filter(
    (connection) => connection.connection_type === "POSTGRES"
  );

  const filteredTargetConnections = connections.filter(
    (connection) => connection.connection_type === "SNOWFLAKE"
  );
  console.log("data is", connections.connection_name);

  // const pageAnswers = useState({
  //   page: props.step,
  //   formdata: {
  //     "Data Source Connection": "",
  //     "Data Target Connection": "",
  //     Application: "",
  //   },
  // });

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
                    <Form.Label>Data Source Connection</Form.Label>

                    <Col>
                      <Form.Select onChange={handleSelection}>
                        {filteredSourceConnections.map((connection) => (
                          <option
                            key={connection.connection_id}
                            value={connection.connection_name}
                          >
                            {connection.connection_name}
                          </option>
                        ))}
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
                      <Form.Select>
                        {filteredTargetConnections.map((connection) => (
                          <option
                            key={connection.connection_id}
                            value={connection.connection_name}
                          >
                            {connection.connection_name}
                          </option>
                        ))}
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
                      <Form.Select>
                        {applications.map((application) => (
                          <option
                            key={application.app_id}
                            value={application.app_name}
                          >
                            {application.app_name}
                          </option>
                        ))}
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
