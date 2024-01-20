import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Link as MuiLink,
  Alert,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [showWarning, setShowWarning] = useState(false);
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleWarning = () => {
    setShowWarning(true);
    setTimeout(() => {
      setShowWarning(false);
    }, 3000); // Hide warning after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email: inputValue.email,
          password: inputValue.password,
        },
        { withCredentials: true }
      );

      const { success, message, token } = response.data;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5">
          Login Account
        </Typography>
        <form
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            marginTop: 1,
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleOnChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleOnChange}
          />
          {showWarning && (
            <Alert severity="warning" sx={{ width: "100%", marginTop: 2 }}>
              Wrong credentials. Please try again.
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item>
              <Typography variant="body2">
                Don't have an account?{" "}
                <MuiLink component={Link} to="/signup">
                  Signup
                </MuiLink>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default Login;
