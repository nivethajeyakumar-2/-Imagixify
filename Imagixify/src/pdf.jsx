
// import React, { useState } from "react";
// import { Box, Button, Card, CardMedia, Grid, Typography } from "@mui/material";
// import { PDFDocument } from "pdf-lib";

// const ImageToPDF = () => {
//   const [images, setImages] = useState([]);
//   const [files, setFiles] = useState([]);

//   const handleImages = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const fileURLs = selectedFiles.map((file) => URL.createObjectURL(file));
//     setImages(fileURLs);
//     setFiles(selectedFiles);
//   };

//   // Convert file to ArrayBuffer preserving full resolution
//   const fileToArrayBuffer = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (err) => reject(err);
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const generatePDF = async () => {
//     if (files.length === 0) return alert("Please upload images first");

//     const pdfDoc = await PDFDocument.create();

//     for (let file of files) {
//       try {
//         const imgBytes = await fileToArrayBuffer(file);

//         // Check extension to embed properly
//         let image;
//         if (file.type === "image/png") {
//           image = await pdfDoc.embedPng(imgBytes);
//         } else {
//           image = await pdfDoc.embedJpg(imgBytes);
//         }

//         const { width, height } = image;
//         const page = pdfDoc.addPage([width, height]);

//         page.drawImage(image, {
//           x: 0,
//           y: 0,
//           width,
//           height,
//         });
//       } catch (err) {
//         console.error(`Skipping file ${file.name}:`, err);
//       }
//     }

//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "Generated_images.pdf";
//     link.click();
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" fontWeight="bold" mb={2}>
//         Images ➤ PDF Converter 
//       </Typography>

//       <Button variant="contained" component="label">
//         Upload Images
//         <input
//           type="file"
//           hidden
//           multiple
//           accept="image/*"
//           onChange={handleImages}
//         />
//       </Button>

//       <Grid container spacing={2} mt={2}>
//         {images.map((img, index) => (
//           <Grid item xs={12} sm={4} md={3} key={index}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={img}
//                 alt={`img-${index}`}
//               />
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {images.length > 0 && (
//         <Button
//           variant="contained"
//           color="success"
//           size="large"
//           sx={{ mt: 3 }}
//           onClick={generatePDF}
//         >
//           Generate PDF
//         </Button>
//       )}
//     </Box>
//   );
// };

// export default ImageToPDF;

import React, { useState, useRef, useCallback } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  FormControl,
  Paper,
} from "@mui/material";
import { PDFDocument } from "pdf-lib";
import { Navbar } from "./components/navbar";

export default function ImageToPDF() {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const [orientation, setOrientation] = useState("portrait");
  const [pageSize, setPageSize] = useState("A4");
  const [margin, setMargin] = useState("none");

  const fileInputRef = useRef();

  const pageSizes = {
    A4: [595.28, 841.89],
    Letter: [612, 792],
    A3: [841.89, 1190.55],
  };

  const handleUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...fileURLs]);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    const fileURLs = droppedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...fileURLs]);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const fileToArrayBuffer = useCallback(
    (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsArrayBuffer(file);
      }),
    []
  );

  const generatePDF = async () => {
    if (files.length === 0) {
      alert("Please upload at least one image!");
      return;
    }

    const pdfDoc = await PDFDocument.create();
    const [pageWidth, pageHeight] = pageSizes[pageSize];
    const isLandscape = orientation === "landscape";
    const finalWidth = isLandscape ? pageHeight : pageWidth;
    const finalHeight = isLandscape ? pageWidth : pageHeight;

    const marginMap = { none: 0, small: 20, big: 50 };
    const marginValue = marginMap[margin];

    for (const file of files) {
      try {
        const imgBytes = await fileToArrayBuffer(file);
        let image;
        if (file.type === "image/png") {
          image = await pdfDoc.embedPng(imgBytes);
        } else {
          image = await pdfDoc.embedJpg(imgBytes);
        }

        const { width, height } = image;
        const scale = Math.min(
          (finalWidth - 2 * marginValue) / width,
          (finalHeight - 2 * marginValue) / height
        );

        const page = pdfDoc.addPage([finalWidth, finalHeight]);
        const x = (finalWidth - width * scale) / 2;
        const y = (finalHeight - height * scale) / 2;

        page.drawImage(image, {
          x,
          y,
          width: width * scale,
          height: height * scale,
        });
      } catch (err) {
        console.error(`Error processing ${file.name}:`, err);
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Converted_Images.pdf";
    link.click();
  };

  return (
    <Box sx={{ bgcolor: "#fefeffff", minHeight: "100vh" }}>
      {/* Header */}
      <Navbar/>

      {/* MAIN CONTAINER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 4,
          p: 3,
        }}
      >
        {/* LEFT SIDE - Upload / Preview */}
        <Box sx={{ flex: 1, maxWidth: 600 }}>
          <Paper
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{
              p: 3,
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
              justifyContent: images.length ? "flex-start" : "center",
              gap: 2,
              position: "sticky",
              top: 100,
            }}
          >
            {!images.length ? (
              <Box
                onClick={() => fileInputRef.current.click()}
                sx={{
                  border: "2px dashed #aaa",
                  borderRadius: 3,
                  p: 2,
                  textAlign: "center",
                  width: "80%",
                  height: "120px",
                  bgcolor: "#fafafa",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { borderColor: "#1177bb" },
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={200}
                  color="text.secondary"
                >
                  Drag & Drop images here or Click to upload
                </Typography>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  ref={fileInputRef}
                  onChange={handleUpload}
                />
              </Box>
            ) : (
              <>
                <Grid container spacing={2}>
                  {images.map((img, i) => (
                    <Grid item xs={6} sm={4} md={3} key={i}>
                      <Card
                        sx={{
                          boxShadow: 3,
                          borderRadius: 2,
                          overflow: "hidden",
                          bgcolor: "#fff",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={img}
                          alt={`preview-${i}`}
                          sx={{
                            height: 200,
                            objectFit: "cover",
                            bgcolor: "#f9f9f9",
                          }}
                        />
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{
                            p: 1,
                            textAlign: "center",
                            fontSize: "0.8rem",
                            color: "text.secondary",
                          }}
                        >
                          {files[i]?.name}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Button
                  variant="contained"
                  onClick={() => fileInputRef.current.click()}
                  sx={{
                    mt: 3,
                    borderRadius: 50,
                    textTransform: "none",
                    bgcolor: "#1177bb",
                    "&:hover": { bgcolor: "#0e6199" },
                  }}
                >
                  + Add More Images
                </Button>
              </>
            )}
          </Paper>
        </Box>

        {/* RIGHT SIDE - Options Panel */}
        <Box sx={{ width: 350, position: "sticky", top: 100 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: "#fff",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Image to PDF Options
            </Typography>

            {/* Orientation */}
            <Typography variant="subtitle2" color="text.secondary">
              Page Orientation
            </Typography>
            <ToggleButtonGroup
              value={orientation}
              exclusive
              onChange={(e, val) => val && setOrientation(val)}
              sx={{
                mb: 2,
                mt: 1,
                "& .MuiToggleButton-root.Mui-selected": {
                  bgcolor: "#1177bb",
                  color: "#fff",
                },
              }}
            >
              <ToggleButton value="portrait" sx={{ px: 3 }}>
                Portrait
              </ToggleButton>
              <ToggleButton value="landscape" sx={{ px: 3 }}>
                Landscape
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Page Size */}
            <Typography variant="subtitle2" color="text.secondary">
              Page Size
            </Typography>
            <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
              <Select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                size="small"
              >
                <MenuItem value="A4">A4 (210×297 mm)</MenuItem>
                <MenuItem value="Letter">Letter (8.5×11 in)</MenuItem>
                <MenuItem value="A3">A3 (297×420 mm)</MenuItem>
              </Select>
            </FormControl>

            {/* Margin */}
            <Typography variant="subtitle2" color="text.secondary">
              Margin
            </Typography>
            <ToggleButtonGroup
              value={margin}
              exclusive
              onChange={(e, val) => val && setMargin(val)}
              sx={{
                mb: 3,
                mt: 1,
                "& .MuiToggleButton-root.Mui-selected": {
                  bgcolor: "#1177bb",
                  color: "#fff",
                },
              }}
            >
              <ToggleButton value="none" sx={{ px: 3 }}>
                No Margin
              </ToggleButton>
              <ToggleButton value="small" sx={{ px: 3 }}>
                Small
              </ToggleButton>
              <ToggleButton value="big" sx={{ px: 3 }}>
                Big
              </ToggleButton>
            </ToggleButtonGroup>

            <Button
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: "1rem",
                borderRadius: "50px",
                textTransform: "none",
                bgcolor: "#1177bb",
                "&:hover": { bgcolor: "#0e6199" },
              }}
              onClick={generatePDF}
            >
              Convert to PDF
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
