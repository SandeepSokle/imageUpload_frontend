import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
import { Box, Button, Modal, Popover } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/user/action";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import TextField from "@mui/material/TextField";
import axios from "axios";
import { fileUpload, getAllData } from "./Controllers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const NavbarTop = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElModel, setAnchorElModel] = useState(null);
  const [title, setTitle] = useState("");
  const [describe, setDescribe] = useState("");
  const [file, setFile] = useState(null);
  const history = useNavigate();
  const dispatch = useDispatch();
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open1 = Boolean(anchorEl);

  const user = useSelector((state) => {
    return state?.user?.user;
  });

  const handleClick = (event) => {
    setAnchorElModel(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElModel(null);
  };
  const openModel = Boolean(anchorElModel);
  const id = openModel ? "simple-popover" : undefined;

  const [openForm, setOpenForm] = React.useState(false);
  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleUplaod = async () => {
    try {
      let newImage = await axios.post(
        `${process.env.React_App_Api}/images/upload`,
        {
          title,
          describe,
          imageUrl: file,
        }
      );
      getAllData(dispatch);
      setTitle("");
      setDescribe("");
      setFile(null);
      handleCloseForm();
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = () => {
    if (file != "" && describe != "" && file) handleUplaod();
    else alert("Please fill all field");
  };

  return (
    <Toolbar
      sx={{
        backgroundColor: "#1976d2",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
            // justifyContent: "space-evenly",
          }}
          onClick={() => {
            history("/home");
          }}
        >
          Upload Image
        </Typography>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              cursor: "pointer",
              marginRight: "20px",
            }}
          >
            <CloudUploadIcon onClick={handleOpenForm} />
          </div>
          <div
            style={{
              fontSize: "1.3rem",
              cursor: "default",
            }}
          >
            {user?.name}
          </div>
          <Typography
            aria-owns={open1 ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={(e) => {
              if (user?.name) handlePopoverOpen(e);
            }}
            onMouseLeave={(e) => {
              if (user?.name) handlePopoverClose(e);
            }}
            onClick={(e) => {
              if (user?.name) {
                handleClick(e);
              } else {
                // history(`../login`, { replace: false });
              }
            }}
            sx={{
              m: "0rem 0.8rem",
              cursor: "pointer",
            }}
          >
            {/* Hover with a Popover. */}
            <Avatar alt={user?.name} />
          </Typography>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={open1}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1, textAlign: "center" }}>
              <div
                style={{
                  margin: "0px 10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                {user?.name}
              </div>
              <div
                style={{
                  margin: "0px 10px",
                  fontSize: "18px",
                  // fontWeight: "bold",
                }}
              >
                {" "}
                {user?.email}
              </div>
            </Typography>
          </Popover>
          <Popover
            id={id}
            open={openModel}
            anchorEl={anchorElModel}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2, textAlign: "center" }}>
              <Button
                sx={{
                  m: "8px 0px",
                  mb: "0px",
                }}
                variant="outlined"
                onClick={() => {
                  handleClose();
                  history("/profile", { replace: false });
                }}
              >
                Profile
              </Button>
              <div
                style={{
                  margin: "8px 1px",
                  marginTop: "0px",
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                {user?.name}
              </div>
              <div
                style={{
                  margin: "8px 1px",
                  fontSize: "20px",
                }}
              >
                {" "}
                {user?.email}
              </div>
              <div
                style={{
                  margin: "8px 1px",
                }}
              ></div>
              <Button
                sx={{
                  m: "8px 0px",
                  mb: "0px",
                }}
                variant="contained"
                onClick={() => {
                  dispatch(logoutUser());
                  handleClose();
                  history("/", { replace: false });
                }}
              >
                Sign Out
              </Button>
            </Typography>
          </Popover>
        </div>

        {/* Modal for upload file form */}
        <Modal
          hideBackdrop
          open={openForm}
          onClose={handleCloseForm}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <h2 id="child-modal-title">Upload Image</h2>
            <Typography sx={{ textAlign: "center" }}>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                style={{
                  marginBottom: "20px",
                  width: "100%",
                }}
                value={title}
                onChange={(ele) => {
                  ele.preventDefault();
                  setTitle(ele.target.value);
                }}
              />
              <TextField
                id="outlined-basic"
                multiline
                rows={10}
                label="Description"
                variant="outlined"
                style={{
                  marginBottom: "20px",
                  width: "100%",
                }}
                value={describe}
                onChange={(ele) => {
                  ele.preventDefault();
                  setDescribe(ele.target.value);
                }}
              />
              <TextField
                label="upload Image"
                focused
                type="file"
                sx={{
                  width: "100%",
                  m: 1,
                }}
                onChange={async (e) => {
                  let fileUrl = await fileUpload({
                    file: e.target.files[0],
                    setFile,
                  });
                }}
              />
            </Typography>

            <Button variant="contained" onClick={handleSubmit}>
              Upload
            </Button>
          </Box>
        </Modal>
      </div>
    </Toolbar>
  );
};

export default NavbarTop;
