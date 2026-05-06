import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Button,
  Grid,
  Typography,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";
import imageCompression from "browser-image-compression";

export default function CompressedPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  const { compressedLink, outputFileName } = state;

  // ---- States ----
  const [images, setImages] = useState([{ src: compressedLink, name: outputFileName }]);
  const [quality, setQuality] = useState(70); // default compression quality (0–100)
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1080);
  const [format, setFormat] = useState("jpeg");
  const [loading, setLoading] = useState(false);

  // ---- Handlers ----
  const handleAddImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImage = {
        src: URL.createObjectURL(file),
        name: file.name,
      };
      setImages((prev) => [...prev, newImage]);
    }
  };

  const handleCompress = async () => {
    if (images.length === 0) return;

    setLoading(true);
    try {
      const compressedImages = [];

      for (const img of images) {
        const response = await fetch(img.src);
        const blob = await response.blob();

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: Math.max(maxWidth, maxHeight),
          initialQuality: quality / 100,
          fileType: format === "jpeg" ? "image/jpeg" : "image/png",
          useWebWorker: true,
        };

        const compressedBlob = await imageCompression(blob, options);
        const compressedFile = new File([compressedBlob], img.name, {
          type: options.fileType,
        });

        compressedImages.push({
          src: URL.createObjectURL(compressedFile),
          name: img.name.replace(/\.[^/.]+$/, "") + `_compressed.${format}`,
          blob: compressedBlob,
        });
      }

      setImages(compressedImages);
    } catch (err) {
      console.error("Compression failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---- Download Handlers ----
  const handleDownload = (img) => {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = img.name;
    link.click();
  };

  const handleDownloadAll = () => {
    images.forEach((img, index) => {
      const link = document.createElement("a");
      link.href = img.src;
      link.download = img.name || `compressed_${index + 1}.${format}`;
      link.click();
    });
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" ,  width:"1530px" }}>
      <Navbar />

      <Grid container spacing={3} sx={{ px: 4, py: 5 }}>
        {/* LEFT SIDE — Preview Section */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
          }}
        >
          {images.map((img, i) => (
            <Card
              key={i}
              sx={{
                width: 260,
                borderRadius: 2,
                boxShadow: 3,
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#fff",
              }}
            >
              <Box sx={{ width: "100%", position: "relative", bgcolor: "#fff" }}>
                <CardMedia
                  component="img"
                  image={img.src}
                  alt={img.name}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "contain",
                    backgroundColor: "#fafafa",
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  p: 1,
                  textAlign: "center",
                  color: "text.secondary",
                  fontSize: "0.85rem",
                  wordBreak: "break-all",
                }}
              >
                {img.name}
              </Typography>
              <Button
                onClick={() => handleDownload(img)}
                variant="outlined"
                size="small"
                sx={{
                  display: "block",
                  mx: "auto",
                  mb: 1.5,
                  borderRadius: "20px",
                  textTransform: "none",
                }}
              >
                Download
              </Button>
            </Card>
          ))}

          {/* Floating Add Button */}
          <Box sx={{ position: "relative" }}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="add-image-input"
              onChange={handleAddImage}
            />
            <label htmlFor="add-image-input">
              <Button
                variant="contained"
                component="span"
                sx={{
                  mt: 2,
                  borderRadius: "50px",
                  textTransform: "none",
                  px: 3,
                  backgroundColor: "#1177bb",
                  "&:hover": { backgroundColor: "#0d5a8b" },
                }}
              >
                + Add Image
              </Button>
            </label>
          </Box>
        </Grid>

        {/* RIGHT SIDE — Compression Options */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              p: 3,
              boxShadow: 2,
              textAlign: "left",
              position: "sticky",
              top: 80,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Image Compression Options
            </Typography>

            {/* Compression Quality */}
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Compression Quality ({quality}%)
            </Typography>
            <Slider
              value={quality}
              onChange={(e, val) => setQuality(val)}
              min={10}
              max={100}
              step={5}
              sx={{ mb: 3 }}
            />

            {/* Resolution */}
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Max Width (px)
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Select
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
                size="small"
              >
                <MenuItem value={800}>800 px</MenuItem>
                <MenuItem value={1280}>1280 px</MenuItem>
                <MenuItem value={1920}>1920 px</MenuItem>
                <MenuItem value={2560}>2560 px</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Max Height (px)
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Select
                value={maxHeight}
                onChange={(e) => setMaxHeight(Number(e.target.value))}
                size="small"
              >
                <MenuItem value={600}>600 px</MenuItem>
                <MenuItem value={1080}>1080 px</MenuItem>
                <MenuItem value={1440}>1440 px</MenuItem>
                <MenuItem value={2160}>2160 px</MenuItem>
              </Select>
            </FormControl>

            {/* Format */}
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Output Format
            </Typography>
            <ToggleButtonGroup
              value={format}
              exclusive
              onChange={(e, val) => val && setFormat(val)}
              sx={{ mb: 4 }}
            >
              <ToggleButton value="jpeg" sx={{ px: 3 }}>
                JPEG
              </ToggleButton>
              <ToggleButton value="png" sx={{ px: 3 }}>
                PNG
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Compress Button */}
            <Button
              variant="contained"
              onClick={handleCompress}
              disabled={loading}
              sx={{
                width: "100%",
                fontSize: "1rem",
                textTransform: "none",
                py: 1.5,
                borderRadius: "50px",
                backgroundColor: "#1177bb",
                "&:hover": { backgroundColor: "#0d5a8b" },
                mb: 2,
              }}
            >
              {loading ? "Compressing..." : "Compress Images"}
            </Button>

            {/* Download All Button */}
            <Button
              variant="outlined"
              onClick={handleDownloadAll}
              disabled={images.length === 0}
              sx={{
                width: "100%",
                textTransform: "none",
                borderRadius: "50px",
              }}
            >
              Download All
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
