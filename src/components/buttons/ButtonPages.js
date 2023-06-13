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

export default function ButtonPages(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = (e, reason) => {
    if (reason && reason == "backdropClick") return;
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  let buttonNames = [
    {
      name: "batch ingestion of relational sources for single entity",
    },
    {
      name: "batch ingestion of relational sources for multiple entities",
    },
    {
      name: "Upload data from UI",
    },
    {
      name: "Realtime ingestion",
    },
    {
      name: "ELT - Transformations",
    },
    {
      name: "Data Quality pipelines",
    },
    {
      name: "Data Masking pipelines",
    },
    {
      name: "Snowpark development Notebook",
    },
    {
      name: "Streamlit app development Notebook",
    },
    {
      name: "Snowflake Data Consumption pipelines",
    },
  ];
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className="dialogTitle">
        Please select data pipelines
      </DialogTitle>

      <Box sx={{ flexGrow: 1, marginY: "20px" }}>
        <Grid container justifyContent={"center"} spacing={2}>
          {buttonNames.map((_, index) => (
            <Grid
              item
              key={index}
              xs={6}
              sm={6}
              justifyContent={"center"}
              display={"flex"}
            >
              <Button
                className="buttonElements"
                variant="contained"
                onClick={() => handleListItemClick("")}
              >
                {_.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Dialog>
  );
}

ButtonPages.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
