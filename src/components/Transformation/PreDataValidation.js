import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import "./TransformationPipeline.css";
import AddDetailsModal from "./AddDetailsModal";
import { FaPlus } from "react-icons/fa";
import ColumnRulesButtonList from "../Data_Quality/ColumnRulesButtonList";

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

const PreDataValidation = () => {
  const [showModal, setShowModal] = useState(false);
  const [leftDivCollapsed, setLeftDivCollapsed] = useState(false);
  const [queries, setQueries] = useState([]);
  const [table, setTable] = useState([]);
  const [databases, setDatabases] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [schemaName, setSchemaName] = useState([]);
  const [tables, setTables] = useState([]);
  const [queryColumns, setQueryColumns] = useState([]);
  const [columnDetailsShowModal, setColumnDetailsShowModal] = useState(false);

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

  const toggleTable = (table) => {
    if (tables.includes(table)) {
      setTables(tables.filter((tbl) => tbl !== table));
    } else {
      setTables([table]);
    }
  };
  console.log("database name", databases);
  console.log("schema name", schemaName);
  console.log("table name", tables);
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/querydetails"
        );
        const data = await response.json();
        setQueries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the async function to fetch data
    fetchData();
  }, []);

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
  const handleTableClick = async () => {
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
  console.log("api output", queryColumns);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const columnDetailsHandleShowModal = () => {
    setColumnDetailsShowModal(true);
  };

  const columnDetailshandleCloseModal = () => {
    setColumnDetailsShowModal(false);
  };

  const handleToggleLeftDiv = () => {
    setLeftDivCollapsed(!leftDivCollapsed);
  };
  return (
    <div style={{ display: "flex", border: "1px solid #ccc", height: "72vh" }}>
      <div
        style={{
          flex: leftDivCollapsed ? "0 0 25px" : "0 0 20%",
          transition: "flex 0.3s ease-in-out",
          borderRight: "1px solid #ccc",
          position: "relative",
        }}
      >
        {!leftDivCollapsed && (
          <div>
            {/* Search bar */}
            <div style={{ padding: "16px", borderBottom: "1px solid #ccc" }}>
              <SearchIcon />
              <InputBase
                placeholder="Search..."
                style={{ marginLeft: "8px", width: "80%" }}
              />
            </div>
            {/* List 1 */}
            <div
              style={{
                height: "250px",
                overflow: "auto",
                padding: "16px",
              }}
            >
              <Typography variant="h6" style={{ marginBottom: "8px" }}>
                Table
              </Typography>
              <ul>
                {table.map((db) => (
                  <li key={db.database}>
                    <button onClick={() => toggleDatabase(db.database)}>
                      {databases.includes(db.database) ? "-" : "+"}
                    </button>
                    {db.database}
                    {databases.includes(db.database) && (
                      <ul>
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
                            {schema.schema}
                            {schemas.includes(
                              `${db.database}-${schema.schema}`
                            ) && (
                              <ul>
                                {schema.tables.map((table) => (
                                  <li key={table}>
                                    <button
                                      onClick={async () => {
                                        toggleTable(table); // Toggle the table selection
                                        await handleTableClick(); // Call the handleTableClick function
                                      }}
                                    >
                                      {tables.includes(table) ? "-" : "+"}
                                    </button>
                                    {table}
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
            {/* List 2 */}
            <div style={{ height: "50%", overflow: "auto", padding: "16px" }}>
              <Typography variant="h6" style={{ marginBottom: "8px" }}>
                Quries
              </Typography>
              {/* Replace the following lines with your list items */}
              <ul>
                {queries.map((query, index) => (
                  <li key={index}>{query.query_name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* Collapse button */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "#f0f0f0",
          }}
        >
          <button onClick={handleToggleLeftDiv}>
            {leftDivCollapsed ? ">" : "<"}
          </button>
        </div>
      </div>
      <div
        style={{ flex: 2, borderLeft: "1px solid #ccc", paddingLeft: "5px" }}
      >
        {/* Content of the right div */}
        <div>
          {queryColumns &&
            queryColumns[0] &&
            queryColumns[0].columns &&
            queryColumns[0].columns.length > 0 && (
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead style={{ color: "#E0E0E0" }}>
                    <TableRow className="listOfPipelineNavbar">
                      <StyledTableCell>Column Name</StyledTableCell>
                      <StyledTableCell align="center">
                        Data Type
                      </StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {queryColumns[0].columns.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell className="idColumnStyle">
                          {row.column_name}
                        </StyledTableCell>
                        <StyledTableCell>{row.data_type} </StyledTableCell>
                        <StyledTableCell align="center">
                          {" "}
                          <FaPlus
                            className="add"
                            onClick={columnDetailsHandleShowModal}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          {columnDetailsShowModal && (
            <ColumnRulesButtonList
              show={columnDetailsShowModal}
              onHide={columnDetailshandleCloseModal}
            />
          )}
          <AddDetailsModal show={showModal} onHide={handleCloseModal} />
        </div>
      </div>
    </div>
  );
};

export default PreDataValidation;
