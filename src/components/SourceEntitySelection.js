// import React, { useState } from "react";
// import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";

// const SourceEntitySelection = () => {
//   return (
//     <div className="page1">
//       <Row>
//         <Card.Body>
//           <div className="text-left">
//             <Form>
//               <Row>
//                 <Col sm={6}>
//                   <div className="form-group">
//                     <Form.Label>Source Type</Form.Label>
//                     <Form.Select aria-label="" disabled={false}>
//                       <option>{""}</option>
//                       <option>Query</option>
//                       <option>Table</option>
//                     </Form.Select>
//                   </div>
//                   <div>
//                     <Form.Label>Query</Form.Label>
//                     <Form.Control></Form.Control>
//                   </div>
//                 </Col>
//                 <Col>
//                   <div>
//                     <Form.Label>Database Name</Form.Label>
//                     <Form.Control></Form.Control>
//                   </div>
//                   <div>
//                     <Form.Label>Schema Name</Form.Label>
//                     <Form.Control></Form.Control>
//                   </div>
//                   <div>
//                     <Form.Label>Table Name</Form.Label>
//                     <Form.Control></Form.Control>
//                   </div>
//                   <div>
//                     <Form.Label>Bucket Name</Form.Label>
//                     <Form.Control></Form.Control>
//                   </div>
//                   <div>
//                     <Form.Label>Full File Name</Form.Label>
//                     <Form.Control></Form.Control>
//                   </div>
//                 </Col>
//               </Row>
//             </Form>
//           </div>
//         </Card.Body>
//       </Row>
//     </div>
//   );
// };

// export default SourceEntitySelection;

import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";

// import "./SourceEntitySelection.css";

const SourceEntitySelection = (props) => {
  // const [sourceType, setSourceType] = useState("");

  // const selectChangeHandler = (event) => {
  //   const { value } = event.target;
  //   setSourceType(value);
  // };

  const [answer2, setAnswer2] = useState({
    DataSourceType: "",
    Query: "",
    DatabaseName: "",
    SchemaName: "",
    TableName: "",
    BucketName: "",
    FullFileName: "",
  });

  const [dataSourceType, setDataSourceType] = useState("");

  const selectChangeHandler = (e) => {
    const { value } = e.target;
    setDataSourceType(value);
    props.setPageAnswers({
      ...props.pageAnswers,
      [e.target.name]: e.target.value,
    });
    setAnswer2({ ...answer2, [e.target.name]: e.target.value });
  };

  console.log(props.pageAnswers);

  const changeHandler = (e) => {
    props.setPageAnswers({
      ...props.pageAnswers,
      [e.target.name]: e.target.value,
    });
    setAnswer2({ ...answer2, [e.target.name]: e.target.value });
    setDataSourceType(answer2.DataSourceType);
  };

  // useEffect(() => {
  //   const data = JSON.parse(window.localStorage.getItem(props.step));
  //   // props.setPageAnswers({ ...props.pageAnswers, data });
  //   setAnswer2(data);
  //   // setDataSourceType(answer2.DataSourceType);
  //   console.log(answer2.DataSourceType);
  //   // console.log("object is not available");
  // }, [props.step]);
  // useEffect(() => {
  //   delete props.pageAnswers.data;
  //   window.localStorage.setItem(props.step, JSON.stringify(props.pageAnswers));
  // }, [props.step]);

  return (
    <div className="page1">
      <Row>
        <Card.Body>
          <div className="text-left">
            <Form>
              <Row className="mb-3">
                <Col sm={6}>
                  {/* <div className="form-group">
                    <Form.Label>Source Type</Form.Label>
                    <Form.Select
                      aria-label=""
                      onChange={selectChangeHandler}
                      value={sourceType}
                      disabled={false}
                    >
                      <option>{"Select"}</option>
                      <option value={"Query"}>Query</option>
                      <option value={"Table"}>Table</option>
                    </Form.Select>
                  </div> */}
                  <div className="form-group">
                    <Form.Label>Data Source Type</Form.Label>
                    <Form.Select
                      aria-label=""
                      // value={dataSourceType}
                      onChange={selectChangeHandler}
                      disabled={false}
                      name="DataSourceType"
                      value={props.pageAnswers.DataSourceType}
                    >
                      <option>{""}</option>
                      <option value={"RDBMS- Query"}>RDBMS- Query</option>
                      <option value={"RDBMS- Table"}>RDBMS- Table</option>
                      <option value={"Flat File"}>Flat File</option>
                    </Form.Select>
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <div>
                  <Form.Label>Query</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="textbox1"
                    disabled={dataSourceType !== "RDBMS- Query"}
                    name="Query"
                    onChange={changeHandler}
                    value={props.pageAnswers.Query}
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <Col>
                  <div className="form-group">
                    <Form.Label>Database Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="textbox1"
                      disabled={dataSourceType !== "RDBMS- Table"}
                      name="DatabseName"
                      onChange={changeHandler}
                      value={answer2.DatabseName}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <Form.Label>Schema Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="textbox1"
                      disabled={dataSourceType !== "RDBMS- Table"}
                      name="SchemaName"
                      onChange={changeHandler}
                      value={answer2.SchemaName}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <Form.Label>Table Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="textbox1"
                      disabled={dataSourceType !== "RDBMS- Table"}
                      name="TableName"
                      onChange={changeHandler}
                      value={answer2.TableName}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="form-group">
                    <Form.Label>Bucket Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="textbox1"
                      disabled={dataSourceType !== "Flat File"}
                      name="BucketName"
                      onChange={changeHandler}
                      value={answer2.BucketName}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <Form.Label>Full File Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="textbox1"
                      disabled={dataSourceType !== "Flat File"}
                      name="FullFileName"
                      onChange={changeHandler}
                      value={answer2.FullFileName}
                    />
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </Form>
          </div>
        </Card.Body>
      </Row>
    </div>
  );
};

export default SourceEntitySelection;
