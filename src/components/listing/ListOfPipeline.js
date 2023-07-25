import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect, useMemo } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./SearchNavbarButton.css";
import { AiOutlineEdit } from "react-icons/ai";
import { Trash } from "react-bootstrap-icons";
import ConfirmationModal from "../CreateModals/ConfirmationModal";
import "../../App.css";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein, deleted: false };
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
  const [selectedEntityId, setSelectedEntityId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      // const processedData = data.map((row) => ({ ...row, deleted: false }));
      // setPipelineData(processedData);
      setPipelineData(data);
      // setSelectedTestcases(Array(formData.tableData.length).fill(""));
    } catch (error) {
      console.log("Error fetching test cases:", error);
    }
  };

  // const deletePipelineHandler = (index) => {
  //   const newData = [...piplineData];
  //   newData[index].deleted = !newData[index].deleted;
  //   setPipelineData(newData);

  //   const selectedId = newData[index].entity_id;
  //   setSelectedEntityIds((prevIds) =>
  //     prevIds.includes(selectedId)
  //       ? prevIds.filter((id) => id !== selectedId)
  //       : [...prevIds, selectedId]
  //   );
  // };

  const deletePipelineHandler = (entityId) => {
    const index = piplineData.findIndex((row) => row.entity_id === entityId);
    if (index !== -1) {
      const newData = [...piplineData];
      newData[index].deleted = !newData[index].deleted;
      setPipelineData(newData);
      setSelectedEntityId(entityId);
      setIsModalOpen(true);
    }
  };

  const handleDeleteConfirmed = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/deletepipeline/?entity_id=${selectedEntityId}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        // Data deleted successfully from the backend, you may want to update the state or fetch the data again
        console.log("Data deleted successfully!");

        setPipelineData((prevData) =>
          prevData.map((row) =>
            row.entity_id === selectedEntityId ? { ...row, deleted: true } : row
          )
        );
      } else {
        console.log("Failed to delete data from the backend.");
      }
    } catch (error) {
      console.log("Error deleting data:", error);
    }

    // Close the modal
    setIsLoading(false);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    // Reset the deleted property back to false when the modal is closed
    if (selectedEntityId) {
      const index = piplineData.findIndex(
        (row) => row.entity_id === selectedEntityId
      );
      if (index !== -1) {
        const newData = [...piplineData];
        newData[index].deleted = false;
        setPipelineData(newData);
      }
    }

    setSelectedEntityId(null);
  };

  const handleStatusSort = () => {
    // Toggle the status filter
    if (statusFilter === "active") {
      setStatusFilter("inactive");
    } else if (statusFilter === "inactive") {
      setStatusFilter(null);
    } else {
      setStatusFilter("active");
    }
  };

  const filteredPiplineData = useMemo(() => {
    if (statusFilter === "active") {
      return piplineData.filter((row) => row.entity_status === "Active");
    } else if (statusFilter === "inactive") {
      return piplineData.filter((row) => row.entity_status === "Inactive");
    } else {
      return piplineData;
    }
  }, [piplineData, statusFilter]);

  console.log(selectedEntityId);

  const TableHeaderContainer = styled(TableHead)(({ theme }) => ({
    "& th": {
      color: "#E0E0E0",
      cursor: "pointer",
      "&:hover": {
        color: "#000", // Change the color as per your preference
      },
    },
  }));
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHeaderContainer>
          <TableRow className="listOfPipelineNavbar">
            <StyledTableCell>Module</StyledTableCell>
            <StyledTableCell align="center">Source Entity</StyledTableCell>
            <StyledTableCell align="center">Target Entity</StyledTableCell>
            <StyledTableCell align="center" onClick={handleStatusSort}>
              Status
            </StyledTableCell>
            <StyledTableCell align="center">View</StyledTableCell>
            <StyledTableCell />
            <StyledTableCell />
          </TableRow>
        </TableHeaderContainer>
        <TableBody>
          {filteredPiplineData
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
              <StyledTableRow
                key={row.name}
                style={{
                  textDecoration: row.deleted ? "line-through" : "none",
                }}
              >
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
                <StyledTableCell align="center">
                  {" "}
                  <AiOutlineEdit className="edit" />
                </StyledTableCell>
                <StyledTableCell>
                  <Trash
                    className="trash"
                    onClick={() => deletePipelineHandler(row.entity_id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
        <ConfirmationModal
          show={isModalOpen}
          onClose={handleCloseModal}
          onDelete={handleDeleteConfirmed}
        />
        {isLoading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
      </Table>
    </TableContainer>
  );
}
