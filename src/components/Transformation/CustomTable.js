import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import { FaPlus } from "react-icons/fa";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomTable = ({ queryColumns, showModal, handleCloseModal }) => {
  const [columnDetailsShowModal, setColumnDetailsShowModal] = useState(false);

  const columnDetailsHandleShowModal = () => {
    setColumnDetailsShowModal(true);
  };

  const columnDetailshandleCloseModal = () => {
    setColumnDetailsShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Table</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
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
                      <StyledTableCell align="center">
                        Rule Name
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
                        <StyledTableCell>{row.data_type}</StyledTableCell>
                        <StyledTableCell>{row.rule_names}</StyledTableCell>
                        <StyledTableCell align="center">
                          <FaPlus
                            className="add"
                            onClick={columnDetailsHandleShowModal}
                          />
                          {"Add Rules "}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomTable;
