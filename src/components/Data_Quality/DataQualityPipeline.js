import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
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
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../Transformation/TransformationPipeline.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid #E2E2E2",
  borderRadius: "4px",
  fontSize: "5px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

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

function DataQualityPipeline() {
  const navigateRouter = useNavigate();
  return (
    <>
      <div className="col-lg-10 col-md-10 m-auto">
        <div className="row justify-content-center mt-5 w-100 m-0 p-0">
          <div className="col-lg-12 col-md-12 m-0 p-0">
            <Box sx={{ flexGrow: 1 }}>
              <p className="heading"> All Customers</p>

              <hr className="horizontalLine" />

              <AppBar
                position="static"
                color="transparent"
                sx={{
                  boxShadow: "none",
                }}
              >
                <Toolbar className="navbarStyle">
                  {/* <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      display: { xs: "none", sm: "block", color: "#F7901D" },
                    }}
                  >
                    TransFormation Pipelines
                  </Typography> */}
                  <Search className="searchInputStyle">
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      fullWidth
                      // value={searchedSchedulingData}
                      // onChange={(e) => {
                      //   setSearchedSchedulingData(e.target.value);
                      // }}
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
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
                    <div
                      style={{
                        display: "inline-block",
                        position: "relative",
                        marginRight: "15px",
                      }}
                    ></div>
                    {/* <button
                      className="btn-s"
                      style={{ paddingLeft: "8px", paddingRight: "8px" }}
                      onClick={() => {
                        navigateRouter &&
                          navigateRouter("/pipelines/transformations/Stepper");
                      }}
                    >
                      <AddIcon className="AddOutlinedIcon" />
                      Add New Query
                    </button> */}
                  </Box>
                </Toolbar>
              </AppBar>
            </Box>
          </div>
        </div>
      </div>

      <div className="col-lg-10 col-md-10 m-auto">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead style={{ color: "#E0E0E0" }}>
              <TableRow className="listOfPipelineNavbar">
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">
                  Overall Quality
                </StyledTableCell>
                <StyledTableCell align="center">Checks</StyledTableCell>
                <StyledTableCell align="center">Records</StyledTableCell>
                <StyledTableCell align="center">Columns</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell
                  onClick={() => {
                    navigateRouter &&
                      navigateRouter("/pipelines/dataQuality/customer/Id");
                  }}
                  className="idColumnStyle"
                >
                  first{" "}
                </StyledTableCell>
                <StyledTableCell>first </StyledTableCell>
                <StyledTableCell>first </StyledTableCell>
                <StyledTableCell>first </StyledTableCell>
                <StyledTableCell>first </StyledTableCell>
                <StyledTableCell>
                  <BorderColorSharpIcon
                    className="viewBtnStyle"
                    style={{ width: "15px", height: "15px" }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <DeleteIcon
                    className="viewBtnStyle"
                    style={{ width: "15px", height: "15px" }}
                  />
                </StyledTableCell>
              </StyledTableRow>
              {/* {fileterData.map((row) => (
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
                    {row.is_active != "false" ? "Active" : "Inactive"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <BorderColorSharpIcon
                      className="viewBtnStyle"
                      style={{ width: "15px", height: "15px" }}
                        onClick={() => {
                          navigateRouter &&
                            navigateRouter("/scheduling/edit/job-name");
                          sessionStorage.setItem(
                            "schedulingUserData",
                            JSON.stringify(row)
                          );
                        }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <DeleteIcon
                      className="viewBtnStyle"
                      style={{ width: "15px", height: "15px" }}
                        onClick={() => {
                          deleteHandleShow();
                          setdeletetionDagNAme(row.job_name);
                        }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default DataQualityPipeline;
