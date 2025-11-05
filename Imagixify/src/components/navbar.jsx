import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo / Brand */}
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#e63946", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          I ❤️ PDF
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Button color="inherit" onClick={() => navigate("/merge-pdf")}>Merge PDF</Button>
          <Button color="inherit" onClick={() => navigate("/split-pdf")}>Split PDF</Button>
          <Button color="inherit" onClick={() => navigate("/image_compress")}>Compress PDF</Button>
          <Button color="inherit">Convert PDF</Button>
          <Button color="inherit">All Tools</Button>
        </Box>

        {/* Auth Buttons */}
        <Box>
          <Button variant="text" color="inherit">Login</Button>
          <Button variant="contained" color="error" sx={{ ml: 1 }}>
            Sign up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
