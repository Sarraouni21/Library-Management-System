import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  InputAdornment,
  TextField,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Borrow = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowDetails, setBorrowDetails] = useState({
    name: "",
    lastName: "",
    returnDate: new Date().toISOString().split("T")[0], // Set today's date as default
    returned: false,
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signup");
    }
  }, [navigate]);

  const booksPerPage = 3; // Number of books to display per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books");
        console.log("API Response:", response.data);

        // Assuming the API response is an array of books directly
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Function to open the borrow modal
  const handleBorrowClick = (book) => {
    setSelectedBook(book);
    setBorrowDetails({
      name: "",
      lastName: "",
      returnDate: new Date().toISOString().split("T")[0], // Set today's date as default
      returned: false,
    });
    setOpenModal(true);
  };

  // Function to close the borrow modal
  const handleModalClose = () => {
    setOpenModal(false);
  };

  // Function to handle input changes in the modal
  const handleModalInputChange = (field, value) => {
    setBorrowDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  // Function to handle borrow confirmation
  const handleBorrowConfirm = () => {
    // Store borrow details in local storage
    const borrowHistory =
      JSON.parse(localStorage.getItem("borrowHistory")) || [];
    const newBorrow = {
      bookName: selectedBook.name,
      name: borrowDetails.name,
      lastName: borrowDetails.lastName,
      returnDate: borrowDetails.returnDate,
    };
    borrowHistory.push(newBorrow);
    localStorage.setItem("borrowHistory", JSON.stringify(borrowHistory));

    // Close the modal
    setOpenModal(false);
  };
  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        style={{ marginTop: "30px" }}
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: 2, "& input": { padding: "8px" } }}
      />

      <Box display="flex" flexWrap="wrap" justifyContent="space-around">
        {currentBooks.map((book) => (
          <Card key={book._id} sx={{ maxWidth: 300, margin: 2 }}>
            <CardMedia
              component="img"
              height="140"
              image={book.image}
              alt={book.name}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {book.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Author: {book.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {book.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {book.price} Tnd
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Available: {book.available ? "Yes" : "No"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  alignSelf: "center",
                  marginTop: "15px",
                  marginLeft: "25px",
                }}
                onClick={() => handleBorrowClick(book)}
              >
                Borrow
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>

      {/* Borrow Modal */}
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Borrow Book</DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {selectedBook && selectedBook.name}
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={borrowDetails.name}
            onChange={(e) => handleModalInputChange("name", e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={borrowDetails.lastName}
            onChange={(e) => handleModalInputChange("lastName", e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Return Date"
            type="date"
            variant="outlined"
            fullWidth
            value={borrowDetails.returnDate}
            onChange={(e) =>
              handleModalInputChange("returnDate", e.target.value)
            }
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBorrowConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Borrow;
