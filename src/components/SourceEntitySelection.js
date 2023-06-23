import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";
import { DataContext } from "./DataContext";

const SourceEntitySelection = ({ step, formData, updateFormData, errors2 }) => {
  const [dataSourceType, setDataSourceType] = useState(
    formData.sourceEntity.data_source_type
  );
  const [databases, setDatabases] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState(
    formData.sourceEntity.db_name
  );
  const [selectedSchema, setSelectedSchema] = useState(
    formData.sourceEntity.schema_name
  );
  const [selectedTable, setSelectedTable] = useState("");

  const [bucketName, setBucketName] = useState("");
  const [fullFileName, setFullFileName] = useState("");

  const [disableElement, setDisableElement] = useState({
    query: true,
    db_name: true,
    schema_name: true,
    table_name: true,
    bucket_name: true,
    full_file_name: true,
  });

  const { ingestionData, updateIngestionData } = useContext(DataContext);
  const [updatedQuery, setUpdatedQuery] = useState("");

  const selectChangeHandler = (event) => {
    const { value } = event.target;
    setDataSourceType(value);
    const updatedSourceEntity = {
      ...formData.sourceEntity,
      data_source_type: value,
    };
    const updatedFormData = {
      ...formData,
      sourceEntity: updatedSourceEntity,
    };
    updateFormData(updatedFormData);

    const updatedData = {
      data_source_type: value,
    };
    updateIngestionData(updatedData);
  };

  const handleDatabaseChange = (event) => {
    const { value } = event.target;
    setSelectedDatabase(value);
    setSelectedSchema(""); // Reset selected schema when database changes
    setSelectedTable(""); // Reset selected table when database changes
    const updatedSourceEntity = {
      ...formData.sourceEntity,
      db_name: value,
    };
    const updatedFormData = {
      ...formData,
      sourceEntity: updatedSourceEntity,
    };
    updateFormData(updatedFormData);

    const updatedData = {
      db_name: value,
    };
    updateIngestionData(updatedData);
  };

  const handleSchemaChange = (event) => {
    const { value } = event.target;
    setSelectedSchema(value);
    setSelectedTable(""); // Reset selected table when schema changes
    const updatedSourceEntity = {
      ...formData.sourceEntity,
      schema_name: value,
    };
    const updatedFormData = {
      ...formData,
      sourceEntity: updatedSourceEntity,
    };
    updateFormData(updatedFormData);
    const updatedData = {
      schema_name: value,
    };
    updateIngestionData(updatedData);
  };

  const handleTableChange = (event) => {
    const { value } = event.target;
    setSelectedTable(value);
    const updatedSourceEntity = {
      ...formData.sourceEntity,
      table_name: value,
    };
    const updatedFormData = {
      ...formData,
      sourceEntity: updatedSourceEntity,
    };
    updateFormData(updatedFormData);

    const updatedData = {
      table_name: value,
    };
    updateIngestionData(updatedData);
  };

  const queryChangeHandler = (event) => {
    const { value } = event.target;
    setUpdatedQuery(value);
    const updatedSourceEntity = {
      ...formData.sourceEntity,
      query: value,
    };
    const updatedFormData = {
      ...formData,
      sourceEntity: updatedSourceEntity,
    };
    updateFormData(updatedFormData);

    const updatedData = {
      query: value,
    };
    updateIngestionData(updatedData);
  };

  // const handleKeyPress = (event, updatedQuery) => {
  //   if (event.key === "Enter" && !event.shiftKey) {
  //     event.preventDefault();
  //     saveData(updatedQuery);
  //   }
  // };

  // const saveData = (updatedQuery) => {
  //   const updatedSourceEntity = {
  //     ...formData.sourceEntity,
  //     query: updatedQuery,
  //   };
  //   const updatedFormData = {
  //     ...formData,
  //     sourceEntity: updatedSourceEntity,
  //   };
  //   updateFormData(updatedFormData);

  //   const updatedData = {
  //     query: updatedQuery,
  //   };
  //   updateIngestionData(updatedData);
  // };

  // Event listener for Bucket Name and Full File Name Change Handler
  const bucket_fileNameChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "BucketName") {
      setBucketName(value);
      const updatedSourceEntity = {
        ...formData.sourceEntity,
        bucket_name: value,
      };
      const updatedFormData = {
        ...formData,
        sourceEntity: updatedSourceEntity,
      };
      updateFormData(updatedFormData);
      const updatedData = {
        bucket_name: value,
      };
      updateIngestionData(updatedData);
    } else if (name === "FullFileName") {
      setFullFileName(value);
      const updatedSourceEntity = {
        ...formData.sourceEntity,
        full_file_name: value,
      };
      const updatedFormData = {
        ...formData,
        sourceEntity: updatedSourceEntity,
      };
      updateFormData(updatedFormData);
      const updatedData = {
        full_file_name: value,
      };
      updateIngestionData(updatedData);
    }
  };

  // Fetch databases, schemas, and tables from API or data source
  // and populate the corresponding dropdowns

  const connectionId = formData.sourceEntity.connection_id;
  const fetchDatabaseSchemaTableData = async () => {
    try {
      // Perform API call or fetch data from the data source
      const response = await fetch(
        `http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/getschematable/${connectionId}`
      );
      const data = await response.json();

      // Extract databases, schemas, and tables from the data
      const uniqueDatabases = [...new Set(data.map((item) => item.database))];
      setDatabases(uniqueDatabases);

      // Filter schemas based on selected database
      const filteredSchemas = [
        ...new Set(
          data
            .filter((item) => item.database === selectedDatabase)
            .map((item) => item.schema)
        ),
      ];
      setSchemas(filteredSchemas);

      // Filter tables based on selected database and schema
      const filteredTables = [
        ...new Set(
          data
            .filter(
              (item) =>
                item.database === selectedDatabase &&
                item.schema === selectedSchema
            )
            .map((item) => item.table_name)
        ),
      ];
      setTables(filteredTables);
    } catch (error) {
      console.error("Error fetching database, schema, and table data:", error);
    }
  };

  useEffect(() => {
    // Fetch the initial database, schema, and table data on component mount
    fetchDatabaseSchemaTableData();
  }, []);

  useEffect(() => {
    // Fetch filtered schemas whenever the selected database changes
    fetchDatabaseSchemaTableData();
  }, [selectedDatabase]);

  useEffect(() => {
    // Fetch filtered tables whenever the selected database or schema changes
    fetchDatabaseSchemaTableData();
  }, [selectedDatabase, selectedSchema]);

  const disable_enable = () => {
    if (dataSourceType === "RDBMS-TABLE") {
      const newDisable = { ...disableElement };
      newDisable.query = true;
      newDisable.db_name = false;
      newDisable.schema_name = false;
      newDisable.table_name = false;
      newDisable.full_file_name = true;
      newDisable.bucket_name = true;
      setDisableElement(newDisable);
    } else if (dataSourceType === "RDBMS-QUERY") {
      const newDisable2 = { ...disableElement };
      newDisable2.query = false;
      newDisable2.db_name = true;
      newDisable2.schema_name = true;
      newDisable2.table_name = true;
      newDisable2.bucket_name = true;
      newDisable2.full_file_name = true;
      setDisableElement(newDisable2);
    } else if (dataSourceType === "Flat File") {
      const newDisable3 = { ...disableElement };
      newDisable3.query = true;
      newDisable3.db_name = true;
      newDisable3.schema_name = true;
      newDisable3.table_name = true;
      newDisable3.bucket_name = false;
      newDisable3.full_file_name = false;
      setDisableElement(newDisable3);
    }
  };

  useEffect(() => {
    if (step === 2) {
      disable_enable();
    }
  }, [dataSourceType]);

  console.log("source entity ingestion data", ingestionData);

  return (
    <Card.Body className="custom-card-body">
      <div className="text-left">
        <Form>
          <Row className="mb-4">
            <Col>
              <Form.Label>
                Data Source Type <span className="text-danger">*</span>
              </Form.Label>
              {/* <Form.Select
                aria-label=""
                value={formData.sourceEntity.data_source_type}
                onChange={selectChangeHandler}
                disabled={false}
                isInvalid={errors2.data_source_type}
                required
                className="custom-select custom-style"
              >
                <option value="">-- Select --</option>
                <option value={"RDBMS-TABLE"}>RDBMS-TABLE</option>
                <option value={"RDBMS-QUERY"}>RDBMS-QUERY</option>
                <option value={"Flat File"}>Flat File</option>
              </Form.Select> */}
              <div className="radio-group">
                <Form.Check
                  inline
                  type="radio"
                  label="RDBMS-TABLE"
                  name="options"
                  value="RDBMS-TABLE"
                  checked={dataSourceType === "RDBMS-TABLE"}
                  onChange={selectChangeHandler}
                  className="custom-radio"
                />

                <Form.Check
                  inline
                  type="radio"
                  label="RDBMS-QUERY"
                  name="options"
                  value="RDBMS-QUERY"
                  checked={dataSourceType === "RDBMS-QUERY"}
                  onChange={selectChangeHandler}
                  className="custom-radio"
                />

                <Form.Check
                  inline
                  type="radio"
                  label="Flat File"
                  name="options"
                  value="Flat File"
                  checked={dataSourceType === "Flat File"}
                  onChange={selectChangeHandler}
                  className="custom-radio"
                />
              </div>

              {errors2.data_source_type && (
                <div className="error">{errors2.data_source_type}</div>
              )}
            </Col>
          </Row>
          {!disableElement.query && (
            <Row className="mb-4">
              <div>
                <Form.Label>
                  Query <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  className="custom-select custom-style"
                  // disabled={dataSourceType !== "RDBMS-QUERY"}
                  disabled={disableElement.query}
                  value={formData.sourceEntity.query || ""}
                  onChange={queryChangeHandler}
                  isInvalid={errors2.query}
                  // onKeyPress={handleKeyPress}
                />
                {errors2.query && <div className="error">{errors2.query}</div>}
              </div>
            </Row>
          )}

          <Row className="mb-4">
            <Col>
              <div className="form-group">
                <Form.Label>
                  Database Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={formData.sourceEntity.db_name}
                  onChange={handleDatabaseChange}
                  // disabled={dataSourceType !== "RDBMS-TABLE"}
                  disabled={disableElement.db_name}
                  isInvalid={errors2.db_name}
                  className="custom-select custom-style"
                >
                  <option value="">Select Database</option>
                  {databases.map((database) => (
                    <option key={database} value={database}>
                      {database}
                    </option>
                  ))}
                </Form.Select>
                {errors2.db_name && (
                  <div className="error">{errors2.db_name}</div>
                )}
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <Form.Label>
                  Schema Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={formData.sourceEntity.schema_name}
                  onChange={handleSchemaChange}
                  // disabled={
                  //   dataSourceType !== "RDBMS-TABLE" || !selectedDatabase
                  // }
                  disabled={disableElement.schema_name || !selectedDatabase}
                  isInvalid={errors2.schema_name}
                  className="custom-select custom-style"
                >
                  <option value="">Select Schema</option>
                  {schemas.map((schema) => (
                    <option key={schema} value={schema}>
                      {schema}
                    </option>
                  ))}
                </Form.Select>
                {errors2.schema_name && (
                  <div className="error">{errors2.schema_name}</div>
                )}
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <Form.Label>
                  Table Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={formData.sourceEntity.table_name}
                  onChange={handleTableChange}
                  // disabled={
                  //   dataSourceType !== "RDBMS-TABLE" ||
                  //   !selectedDatabase ||
                  //   !selectedSchema
                  // }
                  disabled={disableElement.table_name || !selectedSchema}
                  isInvalid={errors2.table_name}
                  className="custom-select custom-style"
                >
                  <option value="">Select Table</option>
                  {tables.map((table) => (
                    <option key={table} value={table}>
                      {table}
                    </option>
                  ))}
                </Form.Select>
                {errors2.table_name && (
                  <div className="error">{errors2.table_name}</div>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-group">
                <Form.Label>
                  Bucket Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="BucketName"
                  className="custom-select custom-style"
                  onChange={bucket_fileNameChangeHandler}
                  value={formData.sourceEntity.bucket_name}
                  // disabled={dataSourceType !== "Flat File"}
                  disabled={disableElement.bucket_name}
                  isInvalid={errors2.bucket_name}
                />
                {errors2.bucket_name && (
                  <div className="error">{errors2.bucket_name}</div>
                )}
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <Form.Label>
                  Full File Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="FullFileName"
                  className="custom-select custom-style"
                  onChange={bucket_fileNameChangeHandler}
                  value={formData.sourceEntity.full_file_name}
                  // disabled={dataSourceType !== "Flat File"}
                  disabled={disableElement.full_file_name}
                  isInvalid={errors2.full_file_name}
                />
                {errors2.full_file_name && (
                  <div className="error">{errors2.full_file_name}</div>
                )}
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Form>
      </div>
    </Card.Body>
  );
};

export default SourceEntitySelection;
