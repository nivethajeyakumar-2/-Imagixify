

// components/ImageResizeConvert.jsx
// import React, { useState, useRef } from "react";
// import { Box, Grid, TextField, Button, Typography, Card, CardMedia, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

// export default function ImageResizeConvert() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [width, setWidth] = useState(300);
//   const [height, setHeight] = useState(300);
//   const [format, setFormat] = useState("image/png");
//   const canvasRef = useRef(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImage(file);
//       setPreview(url);
//     }
//   };

//   const handleResize = () => {
//     const img = new Image();
//     img.src = preview;
//     img.onload = () => {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       canvas.width = width;
//       canvas.height = height;
//       ctx.drawImage(img, 0, 0, width, height);
//       setPreview(canvas.toDataURL(format));
//     };
//   };

//   const downloadImage = () => {
//     const link = document.createElement("a");
//     link.href = preview;
//     link.download = `resized.${format.split("/")[1]}`;
//     link.click();
//   };

//   return (
//     <Box>
//       <Typography variant="h6" gutterBottom>🖼️ Resize / Convert</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={4}>
//           <Button variant="contained" component="label" fullWidth>
//             Upload Image
//             <input type="file" hidden onChange={handleImageUpload} />
//           </Button>
//           {preview && <Card sx={{ mt: 2 }}><CardMedia component="img" image={preview} height="250" /></Card>}
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <Grid container spacing={2}>
//             <Grid item xs={6}><TextField label="Width" value={width} onChange={(e) => setWidth(e.target.value)} fullWidth /></Grid>
//             <Grid item xs={6}><TextField label="Height" value={height} onChange={(e) => setHeight(e.target.value)} fullWidth /></Grid>
//           </Grid>
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>Format</InputLabel>
//             <Select value={format} label="Format" onChange={(e) => setFormat(e.target.value)}>
//               <MenuItem value="image/png">PNG</MenuItem>
//               <MenuItem value="image/jpeg">JPG</MenuItem>
//               <MenuItem value="image/webp">WEBP</MenuItem>
//             </Select>
//           </FormControl>
//           <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
//             <Button variant="contained" onClick={handleResize} disabled={!image}>Resize</Button>
//             <Button variant="outlined" onClick={downloadImage} disabled={!preview}>Download</Button>
//           </Box>
//         </Grid>
//       </Grid>
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </Box>
//   );
// }

// components/ImageFilters.jsx
import React, { useState } from "react";
import { Box, Slider, Typography, Button, Card, CardMedia } from "@mui/material";
import { Navbar } from "./navbar";

export default function ImageFilters() {
  const [file, setFile] = useState(null);
  const [filter, setFilter] = useState({ brightness: 100, grayscale: 0, blur: 0 });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setFile(URL.createObjectURL(file));
  };

  const style = {
    filter: `brightness(${filter.brightness}%) grayscale(${filter.grayscale}%) blur(${filter.blur}px)`,
    transition: "0.3s",
  };

  return (
    <Box sx={{ bgcolor: "#f5f6fa", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar/>
      {/* <Typography variant="h6"> Image Filters</Typography> */}
      <Button variant="contained" component="label" sx={{ my: 2 }}>
        Upload Image
        <input type="file" hidden onChange={handleFile} />
      </Button>
      {file && (
        <Card>
          <CardMedia component="img" height="300" image={file} sx={style} />
        </Card>
      )}
      {file && (
        <Box mt={2}>
          <Typography>Brightness</Typography>
          <Slider sx={{ width:"50px" }} value={filter.brightness} min={50} max={150} onChange={(e, v) => setFilter({ ...filter, brightness: v })} />
          <Typography>Grayscale</Typography>
          <Slider  sx={{ width:"50px" }}  value={filter.grayscale} min={0} max={100} onChange={(e, v) => setFilter({ ...filter, grayscale: v })} />
          <Typography>Blur</Typography>
          <Slider  sx={{ width:"50px" }}  value={filter.blur} min={0} max={10} onChange={(e, v) => setFilter({ ...filter, blur: v })} />
        </Box>
      )}
    </Box>
  );
}
