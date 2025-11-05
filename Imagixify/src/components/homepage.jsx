// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Container,
//   Chip,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// // ✅ Tool list with routes
// const tools = [
//   {
//     title: "Merge PDF",
//     desc: "Combine PDFs in the order you want.",
//     color: "#ff6b6b",
//     // path: "/merge-pdf",
//   },
//   {
//     title: "Split PDF",
//     desc: "Separate one page or a whole set into independent PDFs.",
//     color: "#f06595",
//     // path: "/split-pdf",
//   },
//   {
//     title: "Compress PDF",
//     desc: "Reduce file size while keeping quality.",
//     color: "#51cf66",
//     path: "/image_compress",
//   },
//   {
//     title: "Edit PDF",
//     desc: "Add text, images, and shapes to your PDFs.",
//     color: "#7950f2",
//     // path: "/edit-pdf",
//   },
// ];

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
//       {/* Navbar */}
//       <AppBar position="static" color="inherit" elevation={0}>
//         <Toolbar sx={{ justifyContent: "space-between" }}>
//           <Typography variant="h5" sx={{ fontWeight: "bold", color: "#e63946" }}>
//             I ❤️ PDF
//           </Typography>
//           <Box>
//             <Button color="inherit">Merge PDF</Button>
//             <Button color="inherit">Split PDF</Button>
//             <Button color="inherit">Compress PDF</Button>
//             <Button color="inherit">Convert PDF</Button>
//             <Button color="inherit">All Tools</Button>
//           </Box>
//           <Box>
//             <Button variant="text" color="inherit">Login</Button>
//             <Button variant="contained" color="error" sx={{ ml: 1 }}>
//               Sign up
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Hero Section */}
//       <Container sx={{ textAlign: "center", py: 8 }}>
//         <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
//           Every tool you need to work with PDFs in one place
//         </Typography>
//         <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 4 }}>
//           Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1 }}>
//           {["All", "Workflows", "Organize PDF", "Optimize PDF", "Convert PDF", "Edit PDF", "PDF Security"].map((item, i) => (
//             <Chip key={i} label={item} clickable variant={i === 0 ? "filled" : "outlined"} color={i === 0 ? "primary" : "default"} />
//           ))}
//         </Box>
//       </Container>

//       {/* Tools Grid */}
//       <Container sx={{ pb: 8 }}>
//         <Grid container spacing={3}>
//           {tools.map((tool, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card
//                 onClick={() => navigate(tool.path)}
//                 sx={{
//                   borderRadius: 3,
//                   cursor: "pointer",
//                   transition: "0.3s",
//                   "&:hover": { transform: "translateY(-5px)", boxShadow: 4 },
//                 }}
//               >
//                 <CardContent sx={{ textAlign: "center", py: 3 }}>
//                   <Box
//                     sx={{
//                       width: 50,
//                       height: 50,
//                       borderRadius: 2,
//                       bgcolor: tool.color,
//                       mx: "auto",
//                       mb: 2,
//                     }}
//                   />
//                   <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                     {tool.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                     {tool.desc}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default HomePage;

import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Container,
  Typography,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";


const tools = [
  // {
  //   title: "Merge PDF",
  //   desc: "Combine PDFs in the order you want.",
  //   color: "#ff6b6b",
  //   path: "/merge-pdf",
  // },
  {
    title: "Image to PDF",
    desc: "Convert images into a single PDF file for easy sharing and storage.",
    color: "#f06595",
    path: "/pdf",
  },
  {
    title: " Image Compress",
    desc: "Reduce image file size while keeping the quality sharp and clear.",
    color: "#51cf66",
    path: "/image_compress",
  },
  {
    title: "Watermark",
    desc: "Add custom text, logos, or shapes to your images to protect and brand them.",
    color: "#7950f2",
    path: "/watermark",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" , width:"1230px" }}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Container sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        All the image tools you need in one place
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 4, }}>
         Edit, compress, convert, watermark, and optimize your images quickly and easily. 
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1 }}>
          {["All", "Image to PDF", "Image Compress", "Watermark", ].map(
            (item, i) => (
              <Chip
                key={i}
                label={item}
                clickable
                variant={i === 0 ? "filled" : "outlined"}
                color={i === 0 ? "primary" : "default"}
              />
            )
          )}
        </Box>
        <Typography variant="subtitle2" sx={{ color: "text.secondary"  , mt:5}}>
         Manage your image workflow with just a few clicks — no software installation required.
        </Typography>
      </Container>

      {/* Tools Grid */}
      <Container sx={{ pb: 8 }}>
        <Grid container spacing={3}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                onClick={() => navigate(tool.path)}
                sx={{
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 4 },
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 3 , width:"300px" }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: tool.color,
                      mx: "auto",
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {tool.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {tool.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
