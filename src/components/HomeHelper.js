import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal } from "@mui/material";
import "./HomeHelper.css";
import axios from "axios";
import { getAllData } from "./Controllers";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "25vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function HomeHelper({ data, idx }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleViews = async () => {
    try {
      let newData = await axios.post(
        `${process.env.React_App_Api}/images/views`,
        {
          id: data._id,
        }
      );
      getAllData(dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    handleViews();
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      {" "}
      <Card
        sx={{ minWidth: 300, maxWidth: 345, cursor: "pointer" }}
        onClick={handleOpen}
      >
        <CardMedia
          sx={{ height: 140 }}
          image={data.imageUrl}
          title="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>{data.title}</div>
            <div>v : {data.views}</div>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div>{data.describe}</div>
          </Typography>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>{data.title}</div>
            <div>v : {data.views}</div>
          </Typography>
          <div
            style={{
              overflow: "auto",
            }}
          >
            <img src={data.imageUrl} alt={data.title} />
          </div>{" "}
        </Box>
      </Modal>
    </>
  );
}
