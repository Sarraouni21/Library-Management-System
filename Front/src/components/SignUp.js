import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    }

    if (!username.trim()) {
      errors.username = "Username is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await axios
      .post("http://localhost:5000/signup", {
        email: email,
        password: password,
        username: username,
      })
      .catch((error) => {
        console.error(error);
      });

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowSuccessAlert(true);

      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate("/login");
      }, 1000);
    }, 1000);
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
        <Typography component="h1" variant="h5">
          Register a New Account
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
            error={formErrors.email ? true : false}
            helperText={formErrors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={handleOnChange}
            error={formErrors.username ? true : false}
            helperText={formErrors.username}
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
            error={formErrors.password ? true : false}
            helperText={formErrors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
          <Grid container>
            <Grid item>
              <Typography variant="body2">
                Already have an account?{" "}
                <MuiLink component={Link} to="/login">
                  Login
                </MuiLink>
              </Typography>
            </Grid>
          </Grid>
        </form>
        {showSuccessAlert && (
          <Alert severity="success" sx={{ width: "100%", marginTop: 2 }}>
            User registered successfully!
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default Signup;
