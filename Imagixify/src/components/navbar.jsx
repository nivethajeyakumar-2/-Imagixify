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
          sx={{ fontWeight: "bold", color: "#1177bbff", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
         Imagixify
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Button color="inherit" onClick={() => navigate("/pdf")}>Image to PDF</Button>
          <Button color="inherit" onClick={() => navigate("/image_compress")}>Image Compress</Button>
          <Button color="inherit" onClick={() => navigate("/watermark")}>Watermark</Button>
        </Box>

        {/* Auth Buttons */}
        <Box>
          <Button variant="text" color="inherit">Login</Button>
          <Button variant="contained"  sx={{ ml: 1 ,}}>
            Sign up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
