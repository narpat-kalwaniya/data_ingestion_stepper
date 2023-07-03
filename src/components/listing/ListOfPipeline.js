import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./SearchNavbarButton.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#CACACA",
    fontSize: "12px",
    letterSpacing: "0px",
    color: "#4F4F4F",
    opacity: 1,
    paddingTop: "9px !important",
    paddingBottom: "9px !important",
    fontWeight: "700",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "12px",
    paddingTop: "9px !important",
    paddingBottom: "9px !important",
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function CustomizedTables({ searchedData }) {
  const [piplineData, setPipelineData] = useState([]);
  useEffect(() => {
    fetchTestcases();
  }, []);

  const fetchTestcases = async () => {
    try {
      const response = await fetch(
        "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/entitydetails/"
      );
      const data = await response.json();
      console.log(data);
      setPipelineData(data);
      // setSelectedTestcases(Array(formData.tableData.length).fill(""));
    } catch (error) {
      console.log("Error fetching test cases:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{ color: "#E0E0E0" }}>
          <TableRow className="listOfPipelineNavbar">
            <StyledTableCell>Module</StyledTableCell>
            <StyledTableCell align="center">Source Entity</StyledTableCell>
            <StyledTableCell align="center">Target Entity</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">View</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {piplineData
            .filter(
              (item) =>
                !searchedData ||
                (searchedData &&
                  item?.app_name
                    ?.toLowerCase()
                    ?.includes(searchedData?.toLowerCase())) ||
                (searchedData &&
                  item?.source_entity_name
                    ?.toLowerCase()
                    ?.includes(searchedData?.toLowerCase())) ||
                (searchedData &&
                  item?.target_connection_name
                    ?.toLowerCase()
                    ?.includes(searchedData?.toLowerCase())) ||
                (searchedData &&
                  item?.source_connection_name
                    ?.toLowerCase()
                    ?.includes(searchedData?.toLowerCase()))
            )
            .map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  Data Ingestion
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.source_entity_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.target_entity_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.entity_status}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <VisibilityOutlinedIcon
                    className="viewBtnStyle"
                    style={{ width: "15px", height: "15px" }}
                    onClick={() => {
                      console.log("Icon clicked!", row.entity_id);
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
