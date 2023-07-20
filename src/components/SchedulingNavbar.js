import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SchedulingPipeline from "./SchedulingPipeline";

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

function SchedulingNavbar() {
  const navigateRouter = useNavigate();
  const [addSchedulingPipeline, setaddSchedulingPipeline] = useState(false);
  // const openScheduling = () => {
  //   setaddSchedulingPipeline(true);
  // };

  return (
    <div>
      {addSchedulingPipeline && <SchedulingPipeline />}
      <div className="row justify-content-center mt-5 w-100">
        <div className="col-lg-10 col-md-10">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
              <Toolbar>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "block", color: "#F7901D" },
                  }}
                >
                  Scheduling Pipelines
                </Typography>
                <Search className="searchInputStyle">
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    fullWidth
                    // value={searchedData}
                    // onChange={(e) => {
                    //   setsearchedData(e.target.value);
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
                  <button
                    className="btn-s"
                    style={{ paddingLeft: "8px", paddingRight: "8px" }}
                    // onClick={openScheduling}
                    onClick={() => {
                      navigateRouter && navigateRouter("/scheduling/edit");
                    }}
                  >
                    <AddIcon className="AddOutlinedIcon" />
                    Add New
                  </button>
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default SchedulingNavbar;
