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
  const { onClose, open, buttonNames } = props;

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

  return (
    <Dialog
      // className="closeIconBox"

      onClose={handleClose}
      open={open}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle className="dialogTitle">Select Data Pipeline</DialogTitle>
      {/* <CloseIcon className="closeIcon" onClick={handleClose} /> */}

      <Box className="dialogBox" sx={{}}>
        <hr className="horizontalLine" />
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
