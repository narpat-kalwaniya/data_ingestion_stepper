import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Counter from "./Counter";

const SearchBarsRow = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    props.filterData(searchTerm);
  }, [searchTerm]);

  const searchPipeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  console.log(props.filteredPipeLogs);

  return (
    <div
    // style={{
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "space-between",
    //   marginRight: "20px",
    //   marginBottom: "10px",
    //   borderBottom: "1px solid rgb(230,230,230)",
    // }}
    >
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
        <Col xs={2}>
          <Counter filteredPipeLogs={props.filteredPipeLogs} />
        </Col>
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
                Search
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
                Projects
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
                Show
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                className="custom-select custom-style"
                type="text"
                placeholder="Search Pipelines . . ."
                style={{
                  width: "90%",
                  padding: "5px",
                  "::placeholder": { color: "#4f4f4f", opacity: "0.3" },
                }}
                value={searchTerm}
                onChange={searchPipeHandler}
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
                  <option>Project1</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Control
                className="custom-select custom-style"
                type="text"
                placeholder=""
                style={{ width: "90%", padding: "5px" }}
              />
            </Col>
            {/* <Form.Control
        className="custom-select custom-style"
        type="text"
        placeholder=""
        style={{ width: "25%", padding: "5px", margin: "10px" }}
      /> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SearchBarsRow;
