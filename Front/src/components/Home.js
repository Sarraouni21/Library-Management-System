import React, { useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();
  const carouselImages = [
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    const preloadImages = () => {
      carouselImages.forEach((imageUrl) => {
        new Image().src = imageUrl;
      });
    };

    if (!localStorage.getItem("token")) {
      navigate("/signup");
    }

    preloadImages();
  }, [carouselImages, navigate]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box position="relative" width="100%" height="70vh">
          <Slider {...settings}>
            {carouselImages.map((imageUrl, index) => (
              <div key={index}>
                <img
                  src={imageUrl}
                  alt={`Carousel Image ${index + 1}`}
                  style={{ width: "100%", height: "80vh", objectFit: "cover" }}
                />
              </div>
            ))}
          </Slider>
        </Box>

        <Button
          component={Link}
          to="/books"
          sx={{ marginTop: 13 }}
          variant="contained"
        >
          Books
        </Button>
      </Box>
    </div>
  );
};

export default Home;
