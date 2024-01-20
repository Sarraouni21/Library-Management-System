import { Box, Typography, Container } from "@mui/material";
import React, { useEffect } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={4}
        bgcolor="background.paper"
        borderRadius={2}
      >
        <LibraryBooksIcon color="primary" style={{ fontSize: 60 }} />
        <Typography
          variant="h2"
          sx={{ fontFamily: "fantasy", mt: 2, color: "text.primary" }}
        >
          This is a Library Management 
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontFamily: "fantasy", color: "secondary.main" }}
        >
          By "Ouni Sarra"
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
