import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/user/action";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = React.useState();
  const [isLoginPage, setIsLoginPage] = React.useState(true);
  const [signupData, setSignUpData] = React.useState({});
  const [password, setPassword] = React.useState();
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleSubmit = async () => {
    try {
      let user = await axios.post(`${process.env.React_App_Api}/users/login`, {
        email,
        password,
      });
      dispatch(loginUser(user));
      let userData = {
        name: user?.data?.user?.name,
        email: user?.data?.user?.email,
      };
      sessionStorage.setItem("user", JSON.stringify(userData));
      history("/home");
    } catch (err) {
      console.log(err);
      alert("wrong email or password");
    }
  };

  const handleSignUp = async () => {
    if (signupData.password != signupData.confirmpassword) {
      alert("Password and Confirm Password Not match");
    }
    try {
      let user = await axios.post(
        `${process.env.React_App_Api}/users/signup`,
        signupData
      );
      let userData = {
        name: user?.data?.user?.name,
        email: user?.data?.user?.email,
      };
      sessionStorage.setItem("user", JSON.stringify(userData));
      dispatch(loginUser(user));
      history("/home");
    } catch (err) {
      if (err.response.data.code == 11000)
        alert(
          "Duplicate Entry : " + Object.keys(err.response.data.keyValue)[0]
        );
    }
  };

  React.useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("user"));
    if (data) {
      let newData = {
        data: { user: data },
      };
      dispatch(loginUser(newData));
      history("/home");
    }
  }, []);

  return (
    <Box
      sx={{
        m: 1,
        marginTop: "5rem",
        // width: "25ch",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {isLoginPage ? (
        <>
          {" "}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={(val) => {
              setEmail(val.target.value);
            }}
            sx={{ m: 4 }}
          />
          <TextField
            id="password"
            label="password"
            variant="outlined"
            onChange={(val) => {
              setPassword(val.target.value);
            }}
          />
          <div
            style={{
              margin: "1rem",
            }}
          >
            <Button
              variant="outlined"
              onClick={(event) => {
                event.preventDefault();
                setIsLoginPage(false);
              }}
              type="submit"
              sx={{
                m: 2,
              }}
            >
              New Member
            </Button>
            <Button
              variant="contained"
              onClick={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              type="submit"
              sx={{
                m: 2,
              }}
            >
              Login
            </Button>
          </div>
        </>
      ) : (
        <>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            onChange={(val) => {
              setSignUpData({ ...signupData, name: val.target.value });
            }}
            sx={{ m: 1 }}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={(val) => {
              setSignUpData({ ...signupData, email: val.target.value });
            }}
            sx={{ m: 1 }}
          />
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            type="number"
            onChange={(val) => {
              setSignUpData({ ...signupData, phone: val.target.value });
            }}
            sx={{ m: 1 }}
          />
          <TextField
            id="password"
            label="password"
            variant="outlined"
            onChange={(val) => {
              setPassword(val.target.value);
              setSignUpData({ ...signupData, password: val.target.value });
            }}
            sx={{ m: 1 }}
          />
          <TextField
            id="confirm password"
            label="Confirm Password"
            variant="outlined"
            onChange={(val) => {
              setPassword(val.target.value);
              setSignUpData({
                ...signupData,
                confirmpassword: val.target.value,
              });
            }}
            sx={{ m: 1 }}
          />
          <div
            style={{
              margin: "1rem",
            }}
          >
            <Button
              variant="outlined"
              onClick={(event) => {
                event.preventDefault();
                setIsLoginPage(true);
              }}
              type="submit"
              sx={{
                m: 2,
              }}
            >
              already Member
            </Button>
            <Button
              variant="contained"
              onClick={(event) => {
                event.preventDefault();
                handleSignUp();
              }}
              type="submit"
              sx={{
                m: 2,
              }}
            >
              Sign Up
            </Button>
          </div>
        </>
      )}
    </Box>
  );
}
