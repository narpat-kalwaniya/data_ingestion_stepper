import React from "react";
import { Drawer } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./TransformationPipeline.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

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
    width: "100% ",
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

function QueryDetailsSlider({ anchor, onClose }) {
  return (
    <>
      <Drawer
        anchor={"right"}
        open={Boolean(anchor)}
        onClose={() => {
          onClose();
        }}
        // width={1000}
        PaperProps={{
          sx: {
            width: 650,
          },
        }}
      >
        <div className="row justify-content-center mt-4 w-100 m-0 p-2">
          <Box sx={{ flexGrow: 1, padding: 0 }}>
            <div className="queryDetailsClosebtn">
              <p className="heading"> All Queries</p>

              <CloseOutlinedIcon
                onClick={() => {
                  onClose();
                }}
                className="closeQuerybtn"
              />
            </div>
            <hr className="horizontalLine" />

            <AppBar
              position="static"
              color="transparent"
              sx={{
                boxShadow: "none",
              }}
            >
              <Toolbar className="navbarStyle">
                <Search className="searchInputStyle searchInputWidth">
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
              </Toolbar>
            </AppBar>
          </Box>

          <TableContainer component={Paper} style={{ padding: "0" }}>
            <Table aria-label="customized table">
              <TableHead style={{ color: "#E0E0E0" }}>
                <TableRow className="listOfPipelineNavbar">
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="center">Query Name</StyledTableCell>
                  <StyledTableCell align="center">Dependencies</StyledTableCell>
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
        </div>
      </Drawer>
    </>
  );
}

export default QueryDetailsSlider;
