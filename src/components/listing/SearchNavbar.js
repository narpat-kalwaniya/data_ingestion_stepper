import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import CustomizedTables from "./ListOfPipeline";
import ButtonPages from "../buttons/ButtonPages";
import "./SearchNavbarButton.css";
import "../../styles/main.css";
import AddIcon from "@mui/icons-material/Add";
import { Upload } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Drafts from "../Drafts";
import { formContext } from "../formContext";
import { stepContext } from "../stepContext";

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

export default function ListingPage() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchedData, setsearchedData] = React.useState("");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [isShowDrafts, setIsShowDrafts] = React.useState(false);
  const [drafts, setDrafts] = React.useState([]);
  const { formData, setFormData } = React.useContext(formContext);
  const { step, setStep } = React.useContext(stepContext);

  // console.log("formData", setFormData);

  React.useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const response = await fetch(
        "http://ec2-54-197-121-247.compute-1.amazonaws.com:8000/getdrafts/"
      );
      const data = await response.json();
      // console.log(data);
      setDrafts(data);
      // setSelectedTestcases(Array(formData.tableData.length).fill(""));
    } catch (error) {
      console.log("Error fetching test cases:", error);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    if (value) {
      navigate("/pipelines/add");
    }
    setOpen(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const showDraftsHandler = () => {
    setIsShowDrafts(!isShowDrafts);
  };

  const deleteHandler = (index) => {
    const updatedItems = [...drafts.drafts];

    updatedItems.splice(index, 1);
    console.log(updatedItems);
    setDrafts({ ...drafts, drafts: updatedItems });
  };

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
    <>
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
                  All Pipelines
                </Typography>
                <Search className="searchInputStyle">
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    fullWidth
                    value={searchedData}
                    onChange={(e) => {
                      setsearchedData(e.target.value);
                    }}
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
                  >
                    <span
                      style={{
                        color: "rgb(53, 143, 182)",
                        fontSize: "14px",
                        cursor: "pointer",
                        marginBottom: "0px",
                        transition: "font-size 0.4s",
                      }}
                      onClick={showDraftsHandler}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "rgb(123, 162, 179)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "rgb(53, 143, 182)")
                      }
                    >
                      Drafts
                    </span>
                    {drafts.length > 0 && !isShowDrafts && (
                      <sup
                        style={{
                          width: "13px",
                          height: "13px",
                          backgroundColor: "red",
                          borderRadius: "50%",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "8px",
                          fontWeight: "bold",
                          position: "absolute",
                          top: "-1px",
                          right: "-12px",
                          // border: "1px solid white",
                        }}
                      >
                        {drafts.length}
                      </sup>
                    )}
                  </div>
                  <button
                    className="btn-c"
                    style={{
                      paddingLeft: "8px",
                      paddingRight: "8px",
                      color: "#F7901D",
                      borderColor: "#F7901D",
                      backgroundColor: "white",
                    }}
                  >
                    <Upload style={{ marginRight: "4px" }} /> Upload
                  </button>
                  <button
                    className="btn-s"
                    style={{ paddingLeft: "8px", paddingRight: "8px" }}
                    onClick={() => {
                      handleClickOpen(true);
                    }}
                  >
                    {/* <AddOutlinedIcon className="AddOutlinedIcon" /> */}
                    <AddIcon className="AddOutlinedIcon" />
                    Add New
                  </button>
                </Box>
              </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
          </Box>
          {isShowDrafts ? (
            <Drafts
              drafts={drafts}
              setDrafts={setDrafts}
              deleteHandler={deleteHandler}
              formData={formData}
              setFormData={setFormData}
              step={step}
              setStep={setStep}
              open={open}
              setOpen={setOpen}
              handleClose={handleClose}
            />
          ) : (
            <CustomizedTables searchedData={searchedData} />
          )}
        </div>
      </div>
      <ButtonPages
        open={open}
        onClose={handleClose}
        buttonNames={buttonNames}
      />
    </>
  );
}
