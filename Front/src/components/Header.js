import React, { useState } from "react";
import { AppBar, Tab, Tabs, Toolbar, Typography, Button } from "@mui/material";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulate a logout animation if needed
    // ...

    // Navigate to "/login"
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <AppBar sx={{ backgroundColor: "#232F3D" }} position="sticky">
        <Toolbar>
          <NavLink to="/" style={{ color: "white" }}>
            <Typography>
              <LibraryBooksOutlinedIcon />
            </Typography>
          </NavLink>
          <Tabs
            sx={{ ml: "auto" }}
            textColor="white"
            indicatorColor="primary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={NavLink} to="/add" label="Add Book" />
            <Tab LinkComponent={NavLink} to="/books" label="Books" />
            <Tab LinkComponent={NavLink} to="/borrow" label="Borrow Book" />
            <Tab LinkComponent={NavLink} to="/track" label="Track" />
            <Tab LinkComponent={NavLink} to="/about" label="About Us" />
          </Tabs>

          {/* "Log Out" button */}
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
