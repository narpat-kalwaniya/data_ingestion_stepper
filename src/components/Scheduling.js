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
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import "./SchedulingStyle.css";
import SchedulingNavbar from "./SchedulingNavbar";
import { useNavigate } from "react-router-dom";

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

export default function Scheduling() {
  const [searchedSchedulingData, setSearchedSchedulingData] = useState("");
  const [schedulingData, setschedulingData] = useState([]);
  const navigateRouter = useNavigate();

 

  useEffect(() => {
    fetchSchedulingDetails();
  }, []);

  const fetchSchedulingDetails = async () => {
    try {
      const response = await fetch(
        "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/getjobs/"
      );
      const data = await response.json();
      setschedulingData(data);
      // setSelectedTestcases(Array(formData.tableData.length).fill(""));
    } catch (error) {
      console.log("Error fetching test cases:", error);
    }
  };

  const fileterData = schedulingData.filter(
    (item) =>
      !searchedSchedulingData ||
      (searchedSchedulingData &&
        item?.job_name
          ?.toLowerCase()
          ?.includes(searchedSchedulingData?.toLowerCase()))
  );

  return (
    <>
      <SchedulingNavbar
        searchedSchedulingData={searchedSchedulingData}
        setSearchedSchedulingData={setSearchedSchedulingData}
      />
      <div className="col-lg-10 col-md-10 m-auto">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead style={{ color: "#E0E0E0" }}>
              <TableRow className="listOfPipelineNavbar">
                <StyledTableCell>Job Name</StyledTableCell>
                <StyledTableCell align="center">
                  Start Timestamp
                </StyledTableCell>
                <StyledTableCell align="center">Parent DAG ID</StyledTableCell>
                <StyledTableCell align="center">Module Name </StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fileterData.map((row) => (
                <StyledTableRow key={row.job_name}>
                  <StyledTableCell component="th" scope="row">
                    {row.job_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.start_timestamp}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.parent_dag_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.tasks?.[0]?.module_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <BorderColorSharpIcon
                      className="viewBtnStyle"
                      style={{ width: "15px", height: "15px" }}
                      onClick={() => {
                        navigateRouter && navigateRouter("/scheduling/edit/job-name");
                        sessionStorage.setItem('schedulingUserData', JSON.stringify(row));
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <DeleteIcon
                      className="viewBtnStyle"
                      style={{ width: "15px", height: "15px" }}
                      onClick={() => {
                        // console.log("Icon clicked!", row.entity_id);
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
