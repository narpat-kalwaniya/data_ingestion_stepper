import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
import ReplayIcon from "@mui/icons-material/Replay";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Data_Quality.css";
import QuickValidationModal from "./QuickValidationModal";
import ConfigureAddDetailsPage from "./ConfigureAddDetailsPage";
import ColumnRulesButtonList from "./ColumnRulesButtonList";
import TableRulesModal from "./TableRulesModal";

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

const ConfigureRules = () => {
  const [showModal, setShowModal] = useState(false);
  const [addDetailsShowModal, setaddDetailsShowModal] = useState(false);
  const [columnDetailsShowModal, setColumnDetailsShowModal] = useState(false);
  const [tableRuleModal, setTableRuleModal] = useState(false);

  const tableRuleShowModal = () => {
    setTableRuleModal(true);
  };

  const tableRuleCloseModal = () => {
    setTableRuleModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const addDetailsHandleShowModal = () => {
    setaddDetailsShowModal(true);
  };

  const addDetailshandleCloseModal = () => {
    setaddDetailsShowModal(false);
  };

  const columnDetailsHandleShowModal = () => {
    setColumnDetailsShowModal(true);
  };

  const columnDetailshandleCloseModal = () => {
    setColumnDetailsShowModal(false);
  };

  return (
    <>
      <div className="col-lg-10 col-md-10 m-auto configureruletable">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            color="transparent"
            sx={{
              boxShadow: "none",
            }}
          >
            <Toolbar className="configurenavbarStyle">
              <Box
                sx={{
                  display: {
                    md: "flex",
                    gap: "275px",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                }}
              >
                <Typography
                  variant="h7"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  Table Names:
                </Typography>

                <Typography
                  variant="h7"
                  noWrap
                  component="div"
                  onClick={tableRuleShowModal}
                  sx={{
                    display: { xs: "none", sm: "block" },
                    cursor: "pointer",
                  }}
                >
                  <AddIcon className="AddOutlinedIcon" />
                  Table Rules
                </Typography>
              </Box>

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
                  className="quickValidationBtn"
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                  }}
                  onClick={handleShowModal}
                >
                  Quick Validation
                </button>

                <button
                  className="btn-s"
                  style={{ paddingLeft: "8px", paddingRight: "8px" }}
                  onClick={addDetailsHandleShowModal}
                >
                  <AddIcon className="AddOutlinedIcon" />
                  Add Details
                </button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      <div className="col-lg-10 col-md-10 m-auto configureruletable">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead style={{ color: "#E0E0E0" }}>
              <TableRow className="listOfPipelineNavbar">
                <StyledTableCell>Dimension</StyledTableCell>
                <StyledTableCell align="center">
                  Business Test Name
                </StyledTableCell>

                <StyledTableCell align="center">Column Name(s)</StyledTableCell>
                <StyledTableCell align="center">Arguements</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell className="idColumnStyle">
                  first{" "}
                </StyledTableCell>
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
                <StyledTableCell>
                  <ReplayIcon
                    className="viewBtnStyle"
                    style={{ width: "15px", height: "15px" }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <hr className="separatorLine" />

      <div className="col-lg-10 col-md-10 m-auto configureruletable column-rule-header">
        <h6>Column 1</h6>
        <h6>Data Type</h6>

        <h6 onClick={columnDetailsHandleShowModal}>
          {" "}
          <AddIcon className="AddOutlinedIcon" />
          Column Rules
        </h6>
      </div>

      {showModal && (
        <QuickValidationModal show={showModal} onHide={handleCloseModal} />
      )}

      {addDetailsShowModal && (
        <ConfigureAddDetailsPage
          show={addDetailsShowModal}
          onHide={addDetailshandleCloseModal}
        />
      )}

      {columnDetailsShowModal && (
        <ColumnRulesButtonList
          show={columnDetailsShowModal}
          onHide={columnDetailshandleCloseModal}
        />
      )}

      {tableRuleModal && (
        <TableRulesModal
          show={tableRuleShowModal}
          onHide={tableRuleCloseModal}
        />
      )}
    </>
  );
};

export default ConfigureRules;
