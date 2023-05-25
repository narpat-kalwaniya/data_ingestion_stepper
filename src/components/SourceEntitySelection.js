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

import React, { useState } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";

// import "./SourceEntitySelection.css";

const SourceEntitySelection = () => {
  // const [sourceType, setSourceType] = useState("");

  // const selectChangeHandler = (event) => {
  //   const { value } = event.target;
  //   setSourceType(value);
  // };

  const [pageAnswers, setPageAnswers] = useState({
  });

  const [dataSourceType, setDataSourceType] = useState("");

  const selectChangeHandler = (event) => {
    const { value } = event.target;
    setDataSourceType(value);

    setPageAnswers({[event.target.name]: event.target.value });
    console.log(event)
  };

  const changeHandler = (e) => {
    setPageAnswers({ ...pageAnswers, [e.target.name]: e.target.value });
  }

      console.log(pageAnswers);

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
