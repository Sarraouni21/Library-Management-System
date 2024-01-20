import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Track = () => {
  const navigate = useNavigate();
  const [borrowHistory, setBorrowHistory] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signup");
    }
  }, [navigate]);

  useEffect(() => {
    // Retrieve borrow history from local storage
    const storedBorrowHistory =
      JSON.parse(localStorage.getItem("borrowHistory")) || [];

    // Add a unique id to each row using the index
    const borrowHistoryWithIds = storedBorrowHistory.map((row, index) => ({
      ...row,
      id: index + 1, // Assuming index starts from 0, add 1 to make it unique
    }));

    setBorrowHistory(borrowHistoryWithIds);
  }, []);

  // Define columns for the Data Grid
  const columns = [
    { field: "bookName", headerName: "Book Name", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "returnDate", headerName: "Return Date", flex: 1 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={borrowHistory}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        components={{
          Toolbar: GridToolbar, // Add the GridToolbar to the DataGrid
        }}
      />
    </div>
  );
};

export default Track;
