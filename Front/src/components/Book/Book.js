import React, { useState } from "react";
import { Button, Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";

const Book = (props) => {
  const history = useNavigate();
  const { _id, name, author, description, price, image } = props.book;

  const [showAlert, setShowAlert] = useState(false);

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/books/${_id}`);
      // Display the success alert
      setShowAlert(true);
      // Delay for a moment before refreshing the page
      setTimeout(() => {
        // Hide the alert after the delay
        setShowAlert(false);
        // Refresh the page
        window.location.reload();
      }, 1000); // 10000 milliseconds (adjust as needed)
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  
  return (
    <div className="card">
      <img src={image} alt={name} />
      <article>By {author}</article>
      <h3>{name}</h3>
      <p>{description}</p>
      <h3>{price} TND </h3>
      <Button LinkComponent={Link} to={`/books/${_id}`} sx={{ mt: "auto" }}>
        Update
      </Button>
      <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
        Delete
      </Button>

      {/* Alert for successful deletion */}
      {showAlert && (
        <Alert severity="success" sx={{ mt: 2 }}>
          <AlertTitle>Success</AlertTitle>
          Book "{name}" has been deleted successfully!
        </Alert>
      )}
    </div>
  );
};

export default Book;
