import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import "./ValidateQuery.css";
import SaveDetailsModal from "./SaveDetailsModal";
import AceEditor from "react-ace";
import CustomTable from "./CustomTable";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import "./TransformationPipeline.css";
import Typography from "@mui/material/Typography";

import "ace-builds/src-noconflict/theme-xcode";

const ValidateQuery = ({ connectionName, applicationName, variableGroup }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [queryResult, setQueryResult] = useState("");
  const [displayContent, setDisplayContent] = useState("result");

  const [table, setTable] = useState([]);
  const [databases, setDatabases] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [schemaName, setSchemaName] = useState([]);
  const [tables, setTables] = useState([]);
  const [queryColumns, setQueryColumns] = useState([]);
  const [showCustomTableModal, setShowCustomTableModal] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgb(243, 243, 243)",
      fontSize: "12px",
      letterSpacing: "0px",
      color: "#4F4F4F",
      opacity: 1,
      paddingTop: "9px !important",
      paddingBottom: "9px !important",
      fontWeight: "700",
      textAlign: "left",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: "12px",
      paddingTop: "9px !important",
      paddingBottom: "9px !important",
      textAlign: "left",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      // backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleButtonClick = (content) => {
    setDisplayContent(content);
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const makeApiCall = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  };
  const handleRunButtonClick = async () => {
    const apiUrl =
      "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/queryresult/";

    const requestData = {
      load_query: selectedFileContent,
      connection: connectionName,
      application: applicationName,
      query_name: "GroupedQueries",
      material_type: "View",
      dependent_query_name: null,
      variable_group_name: variableGroup,
    };

    try {
      const response = await makeApiCall(apiUrl, requestData);
      console.log("resonse", JSON.stringify(response));
      setQueryResult(response);
    } catch (error) {
      console.error("API Error:", error);
    }
    console.log("Run button clicked");
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileContentClick = (content) => {
    setSelectedFileContent(content);
  };

  const handleFiles = (files) => {
    const textFiles = Array.from(files).filter(
      (file) => file.type === "text/plain"
    );

    if (textFiles.length > 0) {
      textFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target.result;
          setUploadedFiles((prevFiles) => [
            ...prevFiles,
            { name: file.name, content: content },
          ]);
        };
        reader.readAsText(file);
      });
    } else {
      console.log("Please upload a text file.");
    }
  };

  const handleUploadButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleDeleteFile = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const toggleDatabase = (database) => {
    if (databases.includes(database)) {
      setDatabases(databases.filter((db) => db !== database));
    } else {
      setDatabases([...databases, database]);
    }
  };

  const toggleSchema = (database, schema) => {
    setSchemaName([schema]);
    const databaseKey = `${database}-${schema}`;
    if (schemas.includes(databaseKey)) {
      setSchemas(schemas.filter((sch) => sch !== databaseKey));
    } else {
      setSchemas([...schemas, databaseKey]);
    }
  };

  const handleCloseCustomTableModal = () => {
    setShowCustomTableModal(false);
  };

  const handleTableClick = async (tableName) => {
    setTables([tableName]); // Set the selected table
    // await fetchTableData(); // Fetch data for the selected table
    setShowCustomTableModal(true);
  };

  useEffect(() => {
    if (tables.length > 0) {
      // Fetch data only if there are selected tables
      fetchTableData();
    }
  }, [tables]);

  const fetchTableData = async () => {
    const apiUrl =
      "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/querycolumns/";

    const requestData = {
      database: databases[0],
      schema: schemaName[0],
      table: tables[0],
      query: null,
    };

    try {
      const response = await makeApiCall(apiUrl, requestData);
      console.log("resonse", JSON.stringify(response));
      setQueryColumns(response);
    } catch (error) {
      console.error("API Error:", error);
    }
    console.log("Table selected ");
  };

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/sfwmetadata/"
        );
        const data = await response.json();
        setTable(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the async function to fetch data
    fetchData();
  }, []);
  console.log("table data", table);

  return (
    <div
      className={` file-uploader-container ${
        isDragging ? "dragging" : ""
      } w-100`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Row className="w-100">
        <Col md={2} className="full-height">
          <h7>Uploaded Query</h7>
          <div className={`vertical-box ${isDragging ? "dragging" : ""} w-100`}>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="file-container">
                <div className="file-header">
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteFile(file.name)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <h7 className="file_heading_filename">{file.name}</h7>
                </div>
                <div
                  className="file-content"
                  onClick={() => handleFileContentClick(file.content)}
                >
                  <pre>{file.content}</pre>
                </div>
              </div>
            ))}

            <input
              type="file"
              id="fileInput"
              accept=".txt"
              style={{ display: "none" }}
              onChange={handleFileInputChange}
            />
            <a className="file-input-link" onClick={handleUploadButtonClick}>
              Browse or Drag and Drop your file
            </a>
          </div>
          <div style={{ height: "250px", width: "100%", overflowX: "auto" }}>
            <div style={{ padding: "16px", minWidth: "100%" }}>
              <Typography variant="h6" style={{ marginBottom: "8px" }}>
                Table
              </Typography>
              <ul
                style={{
                  listStyle: "none",
                  paddingInlineStart: "0",
                  whiteSpace: "nowrap",
                  overflowX: "auto",
                }}
              >
                {table.map((db) => (
                  <li key={db.database}>
                    <button onClick={() => toggleDatabase(db.database)}>
                      {databases.includes(db.database) ? "-" : "+"}
                    </button>
                    <span>{db.database}</span>
                    {databases.includes(db.database) && (
                      <ul style={{ listStyle: "none" }}>
                        {db.schemata.map((schema) => (
                          <li key={schema.schema}>
                            <button
                              onClick={() =>
                                toggleSchema(db.database, schema.schema)
                              }
                            >
                              {schemas.includes(
                                `${db.database}-${schema.schema}`
                              )
                                ? "-"
                                : "+"}
                            </button>
                            <span>{schema.schema}</span>
                            {schemas.includes(
                              `${db.database}-${schema.schema}`
                            ) && (
                              <ul>
                                {schema.tables.map((table) => (
                                  <li
                                    key={table}
                                    onClick={async () =>
                                      await handleTableClick(table)
                                    }
                                  >
                                    <span style={{ cursor: "pointer" }}>
                                      {table}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Col>
        <Col md={10} className="EnterQueryBox">
          <div className="box-heading w-100">
            <div style={{ textAlign: "left" }}>Enter Query</div>
            <div style={{ textAlign: "right" }}>
              <a
                href="#"
                className="run-link"
                onClick={async (e) => {
                  e.preventDefault();
                  await handleRunButtonClick();
                }}
              >
                Run&raquo;&raquo;
              </a>
            </div>
          </div>
          {/* <h7>Enter Query</h7> */}
          <div
            className={`horizontal-box ${isDragging ? "dragging" : ""} w-100`}
          >
            {/* <textarea
              value={selectedFileContent}
              onChange={(e) => setSelectedFileContent(e.target.value)}
            /> */}
            <AceEditor
              mode="sql"
              theme="xcode"
              value={selectedFileContent}
              onChange={(newValue) => setSelectedFileContent(newValue)}
              name="sql-editor"
              editorProps={{ $blockScrolling: true }}
              fontSize={14}
              width="100%"
              height="100%"
            />
          </div>

          <div className="box-heading w-100 ">
            <div style={{ textAlign: "left" }}>
              {" "}
              <button
                className={`btn custom-btn-small ${
                  displayContent === "result" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("result")}
              >
                Result
              </button>
              <button
                className={`btn custom-btn-small ${
                  displayContent === "message" ? "active" : ""
                }`}
                onClick={() => handleButtonClick("message")}
              >
                Message
              </button>
            </div>
            <div style={{ textAlign: "right" }}>
              <a
                href="#"
                className="run-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleShowModal();
                }}
              >
                Save&raquo;&raquo;
              </a>
            </div>
          </div>
          <div
            className={`horizontal-box ${
              isDragging ? "dragging" : ""
            } w-100 horizontalBoxSIze`}
          >
            {displayContent === "message" && queryResult.length > 0 ? (
              queryResult.map((obj, index) => (
                <div key={index}>
                  <p>
                    Message:{" "}
                    {typeof obj.message === "string"
                      ? obj.message
                      : obj.message.code}
                  </p>
                  <p>
                    Records Message:{" "}
                    {typeof obj.records_message === "string"
                      ? obj.records_message
                      : "null"}
                  </p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No message available</p>
            )}
          </div>
          {showCustomTableModal && (
            <CustomTable
              queryColumns={queryColumns} // Pass your data to the CustomTable component
              // columnDetailsHandleShowModal={handleShowModal}
              showModal={showCustomTableModal}
              handleCloseModal={handleCloseCustomTableModal}
            />
          )}
        </Col>
      </Row>

      <SaveDetailsModal show={showModal} onHide={handleCloseModal} />
    </div>
  );
};

export default ValidateQuery;
