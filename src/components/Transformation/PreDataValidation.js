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
  const [expandedDatabases, setExpandedDatabases] = useState([]);
  const [expandedSchemas, setExpandedSchemas] = useState({});

  const toggleDatabase = (database) => {
    if (expandedDatabases.includes(database)) {
      setExpandedDatabases(expandedDatabases.filter((db) => db !== database));
    } else {
      setExpandedDatabases([...expandedDatabases, database]);
    }
  };

  const toggleSchema = (database, schema) => {
    const databaseKey = `${database}-${schema}`;
    setExpandedSchemas((prevState) => ({
      ...prevState,
      [databaseKey]: !prevState[databaseKey],
    }));
  };

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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
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
                      {expandedDatabases.includes(db.database) ? "-" : "+"}
                    </button>
                    {db.database}
                    {expandedDatabases.includes(db.database) && (
                      <ul>
                        {db.schemata.map((schema) => (
                          <li key={schema.schema}>
                            <button
                              onClick={() =>
                                toggleSchema(db.database, schema.schema)
                              }
                            >
                              {expandedSchemas[
                                `${db.database}-${schema.schema}`
                              ]
                                ? "-"
                                : "+"}
                            </button>
                            {schema.schema}
                            {expandedSchemas[
                              `${db.database}-${schema.schema}`
                            ] && (
                              <ul>
                                {schema.tables.map((table) => (
                                  <li key={table}>{table}</li>
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
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead style={{ color: "#E0E0E0" }}>
                <TableRow className="listOfPipelineNavbar">
                  <StyledTableCell>City</StyledTableCell>
                  <StyledTableCell align="center">Country ID</StyledTableCell>
                  <StyledTableCell align="center">Last Update</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell className="idColumnStyle">
                    first{" "}
                  </StyledTableCell>
                  <StyledTableCell>first </StyledTableCell>
                  <StyledTableCell>first </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <AddDetailsModal show={showModal} onHide={handleCloseModal} />
        </div>
      </div>

      {/* <div className="col-lg-12 col-md-12 m-0 p-0">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            color="transparent"
            sx={{
              boxShadow: "none",
            }}
          >
            <Toolbar className="navbarStyle d-flex align-items-start mt-2">
              <Typography
                variant="h7"
                noWrap
                component="div"
                // sx={{
                //   display: { xs: "none", sm: "block", color: "#F7901D" },
                // }}
              >
                Data List
              </Typography>

              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  display: {
                    md: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                }}
              >
                <button
                  className="btn-s"
                  style={{ paddingLeft: "8px", paddingRight: "8px" }}
                  onClick={handleShowModal}
                >
                  <AddIcon className="AddOutlinedIcon" />
                  Add Details
                </button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </div> */}
      {/* <div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead style={{ color: "#E0E0E0" }}>
              <TableRow className="listOfPipelineNavbar">
                <StyledTableCell>City</StyledTableCell>
                <StyledTableCell align="center">Country ID</StyledTableCell>
                <StyledTableCell align="center">Last Update</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell className="idColumnStyle">
                  first{" "}
                </StyledTableCell>
                <StyledTableCell>first </StyledTableCell>
                <StyledTableCell>first </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <AddDetailsModal show={showModal} onHide={handleCloseModal} />
      </div> */}
    </div>
  );
};

export default PreDataValidation;
