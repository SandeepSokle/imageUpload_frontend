import { Avatar, Box } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarTop from "./header";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state?.user?.user;
  });

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  return (
    <>
      <NavbarTop />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#0000ff36",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          overFlow: "auto",
          flexWrap: "wrap",
          marginTop: "3rem",
          gap: 8,
        }}
      >
        <Box
          sx={{
            width: "60%",
            backgroundColor: "primary.main",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: ".5rem",
            padding: ".5rem",
            borderRadius: "8px",
          }}
        >
          {" "}
          <Avatar alt={user?.name} sx={{ width: "13rem", height: "13rem" }} />
          <h3>{user?.name}</h3>
          <h4>{user?.email}</h4>
        </Box>
      </div>
    </>
  );
};

export default Profile;
