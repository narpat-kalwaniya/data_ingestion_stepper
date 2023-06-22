import * as React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./ButtonPages.css";
// import CloseIcon from "@mui/icons-material/Close";

export default function ButtonPages(props) {
  const { onClose, open } = props;

  const handleClose = (e, reason) => {
    if (reason && reason == "backdropClick") return;
    onClose("");
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    // ...theme.typography.body2,
    // padding: theme.spacing(2),
    // textAlign: "center",
    // color: theme.palette.text.secondary,
  }));
  let buttonNames = [
    {
      id: 1,
      name: "Batch Ingestion of Relational Sources for Single Entity",
    },
    {
      id: 2,
      name: "Batch Ingestion of Relational Sources for Multiple Entities",
    },
    {
      id: 3,
      name: "Upload Data From UI",
    },
    {
      id: 4,
      name: "Realtime Ingestion",
    },
    {
      id: 5,
      name: "ELT-Transformations",
    },
    {
      id: 6,
      name: "Data Quality Pipelines",
      href: "http://ec2-54-197-121-247.compute-1.amazonaws.com:3000/",
    },
    {
      id: 7,
      name: "Data Masking Pipelines",
    },
    {
      id: 8,
      name: "Snowpark Development Notebook",
    },
    {
      id: 9,
      name: "Streamlit App Development Notebook",
    },
    {
      id: 10,
      name: "Snowflake Data Consumption Pipelines",
    },
  ];
  return (
    <Dialog
      // className="closeIconBox"

      onClose={handleClose}
      open={open}
      // style={{
      //   marginLeft: "100px",
      // }}
    >
      <DialogTitle className="dialogTitle">Select Data Pipelines</DialogTitle>
      {/* <CloseIcon className="closeIcon" onClick={handleClose} /> */}

      <Box className="dialogBox" sx={{}}>
        <Grid container justifyContent={"center"} spacing={1}>
          {buttonNames.map((_, index) => (
            <Grid
              item
              key={index}
              xs={6}
              sm={6}
              justifyContent={"center"}
              display={"flex"}
            >
              {_.href ? (
                <Button
                  className="buttonElements"
                  variant="contained"
                  target="_blank"
                  href={_.href}
                >
                  {_.name}
                </Button>
              ) : (
                <Button
                  className="buttonElements"
                  variant="contained"
                  onClick={() => handleListItemClick(_.name)}
                >
                  {_.name}
                </Button>
              )}
            </Grid>
          ))}
        </Grid>
        <button className="closebtn" onClick={handleClose}>
          {" "}
          Close
        </button>
      </Box>
      {/* <CloseIcon className="closeIcon" onClick={handleClose} /> */}
    </Dialog>
  );
}

ButtonPages.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
