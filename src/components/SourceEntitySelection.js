import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Card, Button } from "react-bootstrap";

const SourceEntitySelection = ({ formData, updateFormData, errors2 }) => {
  const [dataSourceType, setDataSourceType] = useState("");
  const [databases, setDatabases] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [tables, setTables] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [selectedTable, setSelectedTable] = useState("");

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
  };

  const queryChangeHandler = (event) => {
    const { value } = event.target;
    const updatedSourceEntity = {
      ...formData.sourceEntity,
      query: value,
    };
    const updatedFormData = {
      ...formData,
      sourceEntity: updatedSourceEntity,
    };
    updateFormData(updatedFormData);
  };

  // Fetch databases, schemas, and tables from API or data source
  // and populate the corresponding dropdowns
  const fetchDatabaseSchemaTableData = async () => {
    try {
      // Perform API call or fetch data from the data source
      const response = await fetch(
        "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/getschematable/1"
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

  // console.log(formData);
  return (
    <div className="page1">
      <Row>
        <Card.Body>
          <div className="text-left">
            <Form>
              <Row className="mb-3">
                <Col sm={6}>
                  <div className="form-group">
                    <Form.Label>
                      Data Source Type <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      aria-label=""
                      value={formData.sourceEntity.data_source_type}
                      onChange={selectChangeHandler}
                      disabled={false}
                      isInvalid={errors2.data_source_type}
                      required
                    >
                      <option value="">-- Select --</option>
                      <option value={"RDBMS-TABLE"}>RDBMS-TABLE</option>
                      <option value={"RDBMS-QUERY"}>RDBMS-QUERY</option>
                      <option value={"Flat File"}>Flat File</option>
                    </Form.Select>
                    {errors2.data_source_type && (
                      <div className="error">{errors2.data_source_type}</div>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <div>
                  <Form.Label>
                    Query <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="textbox1"
                    disabled={dataSourceType !== "RDBMS-QUERY"}
                    value={formData.sourceEntity.query || ""}
                    onChange={queryChangeHandler}
                    isInvalid={errors2.query}
                  />
                  {errors2.query && (
                    <div className="error">{errors2.query}</div>
                  )}
                </div>
              </Row>
              <Row className="mb-3">
                <Col>
                  <div className="form-group">
                    <Form.Label>
                      Database Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      value={formData.sourceEntity.db_name}
                      onChange={handleDatabaseChange}
                      disabled={dataSourceType !== "RDBMS-TABLE"}
                      isInvalid={errors2.db_name}
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
                      disabled={
                        dataSourceType !== "RDBMS-TABLE" || !selectedDatabase
                      }
                      isInvalid={errors2.schema_name}
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
                      disabled={
                        dataSourceType !== "RDBMS-TABLE" ||
                        !selectedDatabase ||
                        !selectedSchema
                      }
                      isInvalid={errors2.table_name}
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
                      className="textbox1"
                      disabled={dataSourceType !== "Flat File"}
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
                      className="textbox1"
                      disabled={dataSourceType !== "Flat File"}
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
      </Row>
    </div>
  );
};

export default SourceEntitySelection;
