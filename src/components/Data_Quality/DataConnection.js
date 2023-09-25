import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import Select from "react-select";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-xcode";
import "../CreateDataConnection.css";
import "../../styles/main.css";
import DataSourceConnectionModal from "./DataSourceConnectionModal";
import ApplicationModal from "./ApplicationModal";

const DataConnection = () => {
  const [dataSourceType, setDataSourceType] = useState("");
  const [dataSourceConnectionModal, setdataSourceConnectionModal] =
    useState(false);
  const [applicationModal, setApplicationModal] = useState(false);

  const dataSourceConnectionShowModal = () => {
    setdataSourceConnectionModal(true);
  };

  const dataSourceConnectionCloseModal = () => {
    setdataSourceConnectionModal(false);
  };

  const applicationShowModal = () => {
    setApplicationModal(true);
  };

  const applicationCloseModal = () => {
    setApplicationModal(false);
  };

  const onSelection = (e) => {
    setDataSourceType(e.target.value);
  };

  return (
    <div>
      <Card.Body className="custom-card-body">
        <div className="text-left">
          <Form>
            <Row className="mb-4">
              <Col xs={6}>
                <Form.Label>
                  Data Source Connection <span className="text-danger">*</span>
                </Form.Label>
                <Row>
                  <Col xs={8}>
                    <Form.Select
                      // onChange={handleSelection}
                      // value={formData.CreateDataConnection.dataSource}
                      // isInvalid={currentlySubmittedForm == 1 && errors.dataSource}
                      required
                      style={{
                        fontSize: "13px",
                        color: "#4F4F4F",
                        fontWeight: "400",
                      }}
                    >
                      <option value="">-- Select --</option>{" "}
                      {/* {filteredSourceConnections.map((connection) => ( */}
                      <option
                      // key={connection.connection_id}
                      // value={connection.connection_name}
                      >
                        {/* {connection.connection_name} */}
                      </option>
                      {/* ))} */}
                    </Form.Select>
                    {/* {currentlySubmittedForm == 1 && errors.dataSource && (
                    <div className="error">{errors.dataSource}</div>
                  )} */}
                  </Col>
                  <Col style={{ marginTop: "4px" }}>
                    <Icon.CloudPlusFill
                      size={25}
                      className="icon"
                      onClick={dataSourceConnectionShowModal}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={6}>
                <Form.Label>
                  Application <span className="text-danger">*</span>
                </Form.Label>
                <Row>
                  <Col xs={8}>
                    <Form.Select
                      // onChange={handleApplicationSelection}
                      // value={formData.CreateDataConnection.application}
                      // isInvalid={
                      //   currentlySubmittedForm == 1 && errors.application
                      // }
                      // required
                      style={{
                        fontSize: "13px",
                        color: "#4F4F4F",
                        fontWeight: "400",
                        // border: "1px solid #4F4F4F",
                      }}
                    >
                      <option value="">-- Select --</option>{" "}
                      {/* {applications.map((application) => ( */}
                      <option
                      // key={application.app_id}
                      // value={application.app_name}
                      >
                        {/* {application.app_name} */}
                      </option>
                      {/* ))} */}
                    </Form.Select>
                    {/* {currentlySubmittedForm == 1 && errors.application && (
                    <div className="error">{errors.application}</div>
                  )} */}
                  </Col>
                  <Col style={{ marginTop: "4px" }}>
                    <Icon.WindowPlus
                      className="icon"
                      size={25}
                      onClick={applicationShowModal}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col>
                <Form.Label>
                  Data Source Type <span className="text-danger">*</span>
                </Form.Label>

                <div className="radio-group">
                  <Form.Check
                    inline
                    type="radio"
                    label="RDBMS-TABLE"
                    name="options"
                    value="RDBMS-TABLE"
                    checked={dataSourceType === "RDBMS-TABLE"}
                    onChange={onSelection}
                    className="custom-radio"
                    // disabled={!isVisibleOption}
                  />

                  <Form.Check
                    inline
                    type="radio"
                    label="RDBMS-QUERY"
                    name="options"
                    value="RDBMS-QUERY"
                    checked={dataSourceType === "RDBMS-QUERY"}
                    onChange={onSelection}
                    className="custom-radio"
                    // disabled={!isVisibleOption}
                  />

                  <Form.Check
                    inline
                    type="radio"
                    label="Flat File"
                    name="options"
                    value="Flat File"
                    checked={dataSourceType === "Flat File"}
                    onChange={onSelection}
                    className="custom-radio"
                  />
                </div>

                {/* {currentlySubmittedForm == 2 && errors2.data_source_type && (
                  <div className="error">{errors2.data_source_type}</div>
                )} */}
              </Col>
            </Row>

            {/* {!disableElement.query && ( */}
            {dataSourceType === "RDBMS-QUERY" && (
              <Row className="mb-4">
                <div>
                  <Form.Label>
                    Query <span className="text-danger">*</span>
                  </Form.Label>

                  <AceEditor
                    mode="sql"
                    theme="xcode"
                    name="sql-editor"
                    fontSize="12px"
                    // editorProps={{ $blockScrolling: true }}
                    style={{ width: "100%", height: "100px" }}
                    // value={formData.sourceEntity.query || ""}
                    // onChange={queryChangeHandler}
                  />
                  {/* {currentlySubmittedForm == 2 && errors2.query && (
                    <div className="error">{errors2.query}</div>
                  )} */}
                </div>
              </Row>
            )}
            {/* )} */}
            {/* {["Flat File", "RDBMS-QUERY"].includes(
              formData.sourceEntity.data_source_type
            ) ? null : ( */}

            {dataSourceType === "RDBMS-TABLE" && (
              <Row className="mb-4">
                <Col>
                  <div className="form-group">
                    <Form.Label>
                      Database Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      // value={formData.sourceEntity.db_name}
                      // onChange={handleDatabaseChange}

                      // disabled={disableElement.db_name}
                      // isInvalid={currentlySubmittedForm == 2 && errors2.db_name}
                      className="custom-select custom-style"
                    >
                      <option value="">Select Database</option>
                      {/* {databases.map((database) => (
                        <option key={database} value={database}>
                          {database}
                        </option>
                      ))} */}
                    </Form.Select>
                    {/* {currentlySubmittedForm == 2 && errors2.db_name && (
                      <div className="error">{errors2.db_name}</div>
                    )} */}
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <Form.Label>
                      Schema Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      // value={formData.sourceEntity.schema_name}
                      // onChange={handleSchemaChange}

                      // disabled={disableElement.schema_name || !selectedDatabase}
                      // isInvalid={
                      //   currentlySubmittedForm == 2 && errors2.schema_name
                      // }
                      className="custom-select custom-style"
                    >
                      <option value="">Select Schema</option>
                      {/* {schemas.map((schema) => ( */}
                      {/* <option key={schema} value={schema}> */}
                      {/* {schema} */}
                      {/* </option> */}
                      {/* ))} */}
                    </Form.Select>
                    {/* {currentlySubmittedForm == 2 && errors2.schema_name && (
                      <div className="error">{errors2.schema_name}</div>
                    )} */}
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <Form.Label>
                      Table Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      // value={formData.sourceEntity.table_name}
                      // onChange={handleTableChange}

                      // disabled={disableElement.table_name || !selectedSchema}
                      // isInvalid={
                      //   currentlySubmittedForm == 2 && errors2.table_name
                      // }
                      className="custom-select custom-style"
                    >
                      <option value="">Select Table</option>
                      {/* {tables.map((table) => ( */}
                      {/* <option key={table} value={table}> */}
                      {/* {table} */}
                      {/* </option> */}
                      {/* ))} */}
                    </Form.Select>
                    {/* {currentlySubmittedForm == 2 && errors2.table_name && (
                      <div className="error">{errors2.table_name}</div>
                    )} */}
                  </div>
                </Col>
              </Row>
            )}

            {dataSourceType === "Flat File" && (
              <Row className="mb-4">
                <Col>
                  <div className="form-group">
                    <Form.Label>
                      Bucket Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      className="custom-select custom-style"
                      // onChange={bucketNameChangeHandler}
                      // value={formData.sourceEntity.bucket_name}
                      name="BucketName"

                      // disabled={disableElement.bucket_name}
                      // isInvalid={
                      //   currentlySubmittedForm == 2 && errors2.bucket_name
                      // }
                    >
                      <option value="">--Select--</option>
                      {/* {formData.CreateDataConnection.dataSource ===
                      "datalake_s3"
                        ? connections
                            .filter((item) => item.connection_type == "S3")
                            .map((option) => (
                              <option>
                                {option.connect_string.bucket_name}
                              </option>
                            ))
                        : formData.CreateDataConnection.dataSource ===
                          "datalake_azure_blob"
                        ? connections
                            .filter(
                              (item) =>
                                item.connection_type == "AZURE_STORAGE_ACCOUNT"
                            )
                            .map((option) => (
                              <option>
                                {option.connect_string.container_name}
                              </option>
                            ))
                        : null} */}
                    </Form.Select>
                    {/* {currentlySubmittedForm == 2 && errors2.bucket_name && (
                      <div className="error">{errors2.bucket_name}</div>
                    )} */}
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <Form.Label>
                      Directory Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Select
                      className="custom-select custom-style"
                      placeholder="--Select--"
                      // options={Object.keys(s3Directories).map((item) => ({
                      //   value: item,
                      //   label: item,
                      // }))}
                      // onChange={(option) => directoryHandler(option)}
                      // value={formData.sourceEntity.directory_name}
                    />
                  </div>
                </Col>

                <Col>
                  {/* {formData.sourceEntity.directory_name.value != null ? ( */}
                  <div className="form-group">
                    <Form.Label>
                      File Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Select
                      className="custom-select custom-style"
                      placeholder="--Select--"
                      // options={s3Directories[
                      //   formData.sourceEntity.directory_name.value
                      // ].map((item) => ({
                      //   value: item,
                      //   label: item,
                      // }))}
                      // onChange={(option) => fileNameHandler(option)}
                      // value={formData.sourceEntity.full_file_name}
                    />

                    {/* {currentlySubmittedForm == 2 &&
                        errors2.full_file_name && (
                          <div className="error">{errors2.full_file_name}</div>
                        )} */}
                  </div>
                  {/* ) : null} */}
                </Col>
              </Row>
            )}
            {/* ) : null} */}
          </Form>
        </div>
      </Card.Body>

      {dataSourceConnectionModal && (
        <DataSourceConnectionModal
          show={dataSourceConnectionShowModal}
          onHide={dataSourceConnectionCloseModal}
        />
      )}

      {applicationModal && (
        <ApplicationModal
          show={applicationShowModal}
          onHide={applicationCloseModal}
        />
      )}
    </div>
  );
};

export default DataConnection;
