// import React, { useState } from "react";
// import imageCompression from "browser-image-compression";
// import { Card, CardMedia, Button, Typography, Box, Grid } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Navbar } from "./navbar";

// export default function UploadPage() {
//   const [originalImage, setOriginalImage] = useState(null);
//   const [originalLink, setOriginalLink] = useState("");
//   const [outputFileName, setOutputFileName] = useState("");
//   const navigate = useNavigate();

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setOriginalImage(file);
//     setOriginalLink(URL.createObjectURL(file));
//     setOutputFileName(file.name);
//   };

//   const handleCompress = async () => {
//     if (!originalImage) return;

//     const options = {
//       maxSizeMB: 1,
//       maxWidthOrHeight: 500,
//       useWebWorker: true,
//     };

//     if (options.maxSizeMB >= originalImage.size / 1024) {
//       alert("Image is too small, can't be compressed!");
//       return;
//     }

//     const compressedFile = await imageCompression(originalImage, options);
//     const compressedLink = URL.createObjectURL(compressedFile);

//     navigate("/compressed", {
//       state: { compressedLink, outputFileName },
//     });
//   };

//   return (
//     <Box sx={{ m: 5 }}>
//         <Navbar/>
//       <Box sx={{ textAlign: "center", color: "black" }}>
//         <Typography variant="h3">Upload Image</Typography>
//         <Typography variant="h5">1. Choose an image</Typography>
//         <Typography variant="h5">2. Click Compress</Typography>
//       </Box>

//       <Grid container spacing={2} sx={{ mt: 5 }}>
//         <Grid item xl={4} lg={4} md={12} sm={12} textAlign="center">
//           <Card  sx={{ backgroundColor:"transparent" }}>
//             <CardMedia
//               component="img"
//               height="300"
//               image={originalLink
//                 //  || "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
//                 }
             
//             />
//           </Card>
//           <Box sx={{ mt: 2 }}>
//             <Button variant="contained" component="label" sx={{ width: "75%" }}>
//               Upload Image
//               <input type="file" hidden accept="image/*" onChange={handleUpload} />
//             </Button>
//           </Box>
//         </Grid>

//         <Grid item xl={4} lg={4} md={12} sm={12} display="flex" justifyContent="center" alignItems="center">
//           {outputFileName && (
//             <Button variant="contained" onClick={handleCompress}>
//               Compress
//             </Button>
//           )}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";

export default function UploadPage() {
  const [originalImage, setOriginalImage] = useState(null);
  const [originalLink, setOriginalLink] = useState("");
  const [outputFileName, setOutputFileName] = useState("");
  const navigate = useNavigate();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setOriginalImage(file);
    setOriginalLink(URL.createObjectURL(file));
    setOutputFileName(file.name);
  };

  const handleCompress = async () => {
    if (!originalImage) return;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= originalImage.size / 1024) {
      alert("Image is too small, can't be compressed!");
      return;
    }

    const compressedFile = await imageCompression(originalImage, options);
    const compressedLink = URL.createObjectURL(compressedFile);

    navigate("/compressed", {
      state: { compressedLink, outputFileName },
    });
  };

  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/*  Navbar */}
      <Navbar />

      {/*  Center Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mt: 8,
          px: 2,
        }}
      >
        {/* Title */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
         Image Compress
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 4 }}>
         Compress your Images in seconds. Easily adjust orientation and margins.
        </Typography>

        {/* Upload Button */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            component="label"
            sx={{
              bgcolor: "#1177bbff",
              color: "white",
              px: 5,
              py: 2,
              borderRadius: 2,
              fontSize: "1.1rem",
              fontWeight: "600",
              textTransform: "none",
              boxShadow: 3,
              "&:hover": { bgcolor: "#1177bbff" },
            }}
          >
            Select JPG images
            <input type="file" hidden accept="image/*" onChange={handleUpload} />
          </Button>

          {/* Optional icon buttons beside main button */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              variant="contained"
              sx={{
                minWidth: "40px",
                width: "40px",
                height: "40px",
                bgcolor: "#1177bbff",
                borderRadius: "50%",
                "&:hover": { bgcolor: "#1177bbff" },
              }}
            >
              ▲
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: "40px",
                width: "40px",
                height: "40px",
                bgcolor: "#1177bbff",
                borderRadius: "50%",
                "&:hover": { bgcolor: "#1177bbff" },
              }}
            >
              ✚
            </Button>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          or drop JPG images here
        </Typography>

        {/* Image Preview (optional, hidden until upload) */}
        {originalLink && (
          <Grid container justifyContent="center" sx={{ mt: 6 }}>
            <Grid item xs={12} sm={8} md={6} textAlign="center">
              <Card
                elevation={0}
                sx={{
                  backgroundColor: "transparent",
                  border: "1px dashed #ccc",
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={originalLink}
                  alt="preview"
                  sx={{ objectFit: "contain" }}
                />
              </Card>

              {outputFileName && (
                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={handleCompress}
                    sx={{
                      bgcolor: "#1177bbff",
                      px: 4,
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": { bgcolor: "#1177bbff" },
                    }}
                  >
                    Compress
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        )}
      </Box>

      {/* ✅ Footer */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 2,
          borderTop: "1px solid #ddd",
          color: "text.secondary",
          fontSize: "0.9rem",
        }}
      >
        © Imagixify 2025 • Your Image Editor
      </Box>
    </Box>
  );
}
