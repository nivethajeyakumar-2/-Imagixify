// import React from "react";

// import imageCompression from "browser-image-compression";

// import Card from "react-bootstrap/Card";

// export default class imageCompressor extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       compressedLink:
//         "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
//       originalImage: "",
//       originalLink: "",
//       clicked: false,
//       uploadImage: false
//     };
//   }

//   handle = e => {
//     const imageFile = e.target.files[0];
//     this.setState({
//       originalLink: URL.createObjectURL(imageFile),
//       originalImage: imageFile,
//       outputFileName: imageFile.name,
//       uploadImage: true
//     });
//   };

//   changeValue = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   click = e => {
//     e.preventDefault();

//     const options = {
//       maxSizeMB: 1,
//       maxWidthOrHeight: 500,
//       useWebWorker: true
//     };

//     if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
//       alert("Image is too small, can't be Compressed!");
//       return 0;
//     }

//     let output;
//     imageCompression(this.state.originalImage, options).then(x => {
//       output = x;

//       const downloadLink = URL.createObjectURL(output);
//       this.setState({
//         compressedLink: downloadLink
//       });
//     });

//     this.setState({ clicked: true });
//     return 1;
//   };

//   render() {
//     return (
//       <div className="m-5">

//         <div className="text-light text-center">
//           <h1>Three Simple Steps</h1>
//           <h3>1. Upload Image</h3>
//           <h3>2. Click on Compress</h3>
//           <h3>3. Download Compressed Image</h3>
//         </div>

//         <div className="row mt-5">
//           <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
//             {this.state.uploadImage ? (
//               <Card.Img
//                 className="ht"
//                 variant="top"
//                 src={this.state.originalLink}
//               ></Card.Img>
//             ) : (
//               <Card.Img
//                 className="ht"
//                 variant="top"
//                 src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
//               ></Card.Img>
//             )}
//             <div className="d-flex justify-content-center">
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="mt-2 btn btn-dark w-75"
//                 onChange={e => this.handle(e)}
//               />
//             </div>
//           </div>
//           <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
//             <br />
//             {this.state.outputFileName ? (
//               <button
//                 type="button"
//                 className=" btn btn-dark"
//                 onClick={e => this.click(e)}
//               >
//                 Compress
//               </button>
//             ) : (
//               <></>
//             )}
//           </div>

//           <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
//             <Card.Img variant="top" src={this.state.compressedLink}></Card.Img>
//             {this.state.clicked ? (
//               <div className="d-flex justify-content-center">
//                 <a
//                   href={this.state.compressedLink}
//                   download={this.state.outputFileName}
//                   className="mt-2 btn btn-dark w-75"
//                 >
//                   Download
//                 </a>
//               </div>
//             ) : (
//               <></>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// mui
// import React from "react";
// import imageCompression from "browser-image-compression";
// import {
//   Card,
//   CardMedia,
//   Button,
//   Typography,
//   Box,
//   Grid,
// } from "@mui/material";

// export default class ImageCompressor extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       compressedLink:
//         "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
//       originalImage: "",
//       originalLink: "",
//       clicked: false,
//       uploadImage: false,
//     };
//   }

//   handle = (e) => {
//     const imageFile = e.target.files[0];
//     this.setState({
//       originalLink: URL.createObjectURL(imageFile),
//       originalImage: imageFile,
//       outputFileName: imageFile.name,
//       uploadImage: true,
//     });
//   };

//   click = (e) => {
//     e.preventDefault();

//     const options = {
//       maxSizeMB: 1,
//       maxWidthOrHeight: 500,
//       useWebWorker: true,
//     };

//     if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
//       alert("Image is too small, can't be Compressed!");
//       return 0;
//     }

//     imageCompression(this.state.originalImage, options).then((output) => {
//       const downloadLink = URL.createObjectURL(output);
//       this.setState({
//         compressedLink: downloadLink,
//       });
//     });

//     this.setState({ clicked: true });
//     return 1;
//   };

//   render() {
//     return (
//       <Box sx={{ m: 5 }}>
//         {/* Header */}
//         <Box sx={{ textAlign: "center", color: "white" }}>
//           <Typography variant="h3">Three Simple Steps</Typography>
//           <Typography variant="h5">1. Upload Image</Typography>
//           <Typography variant="h5">2. Click on Compress</Typography>
//           <Typography variant="h5">3. Download Compressed Image</Typography>
//         </Box>

//         {/* Main Content */}
//         <Grid container spacing={2} sx={{ mt: 5 }}>
//           {/* Original Image Upload */}
//           <Grid item xl={4} lg={4} md={12} sm={12} textAlign="center">
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="300"
//                 image={
//                   this.state.uploadImage
//                     ? this.state.originalLink
//                     : "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
//                 }
//                 alt="Original"
//               />
//             </Card>
//             <Box sx={{ mt: 2 }}>
//               <Button
//                 variant="contained"
//                 component="label"
//                 color="dark"
//                 sx={{ width: "75%" }}
//               >
//                 Upload Image
//                 <input
//                   type="file"
//                   accept="image/*"
//                   hidden
//                   onChange={this.handle}
//                 />
//               </Button>
//             </Box>
//           </Grid>

//           {/* Compress Button */}
//           <Grid
//             item
//             xl={4}
//             lg={4}
//             md={12}
//             sm={12}
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//           >
//             {this.state.outputFileName && (
//               <Button
//                 variant="contained"
//                 color="dark"
//                 onClick={this.click}
//               >
//                 Compress
//               </Button>
//             )}
//           </Grid>

//           {/* Compressed Image */}
//           <Grid item xl={4} lg={4} md={12} sm={12} textAlign="center">
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="300"
//                 image={this.state.compressedLink}
//                 alt="Compressed"
//               />
//             </Card>
//             {this.state.clicked && (
//               <Box sx={{ mt: 2 }}>
//                 <Button
//                   variant="contained"
//                   color="dark"
//                   sx={{ width: "75%" }}
//                   href={this.state.compressedLink}
//                   download={this.state.outputFileName}
//                 >
//                   Download
//                 </Button>
//               </Box>
//             )}
//           </Grid>
//         </Grid>
//       </Box>
//     );
//   }
// }


import React from "react";
import imageCompression from "browser-image-compression";
import {
  Card,
  CardMedia,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion"; // Animation
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

class ImageCompressorBase extends React.Component {
  constructor() {
    super();
    this.state = {
      compressedLink:
        "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
      originalImage: "",
      originalLink: "",
      clicked: false,
      uploadImage: false,
      outputFileName: "",
    };
  }
  handle = (e) => {
    const imageFile = e.target.files[0];
    this.setState(
      {
        originalLink: URL.createObjectURL(imageFile),
        originalImage: imageFile,
        outputFileName: imageFile.name,
        uploadImage: true,
      },
      () => {
        // Navigate to /compress route after upload
        this.props.navigate("/compress");
      }
    );
  };

  click = (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
      return 0;
    }

    imageCompression(this.state.originalImage, options).then((output) => {
      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink,
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  render() {
    return (
      <Box sx={{ m: 5 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", color: "white" }}>
          <Typography variant="h3">Three Simple Steps</Typography>
          <Typography variant="h5">1. Upload Image</Typography>
          <Typography variant="h5">2. Click on Compress</Typography>
          <Typography variant="h5">3. Download Compressed Image</Typography>
        </Box>

        {/* Main Content */}
        <Grid container spacing={2} sx={{ mt: 5 }}>
          {/* Original Image Upload */}
          <Grid item xl={4} lg={4} md={12} sm={12} textAlign="center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    this.state.uploadImage
                      ? this.state.originalLink
                      : "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
                  }
                  alt="Original"
                />
              </Card>
            </motion.div>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                component="label"
                color="dark"
                sx={{ width: "75%" }}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={this.handle}
                />
              </Button>
            </Box>
          </Grid>
          {/* Compress Button */}
          <Grid
            item
            xl={4}
            lg={4}
            md={12}
            sm={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {this.state.outputFileName && (
              <Button
                variant="contained"
                color="dark"
                onClick={this.click}
              >
                Compress
              </Button>
            )}
          </Grid>
          {/* Compressed Image */}
          <Grid item xl={4} lg={4} md={12} sm={12} textAlign="center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={this.state.compressedLink}
                  alt="Compressed"
                />
              </Card>
            </motion.div>
            {this.state.clicked && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="dark"
                  sx={{ width: "75%" }}
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                >
                  Download
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  }
}
// Wrap class component with navigate using hook
function ImageCompressorWrapper() {
  const navigate = useNavigate();
  return <ImageCompressorBase navigate={navigate} />;
}

// Router Setup
export default function ImageCompressor() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageCompressorWrapper />} />
        <Route path="/compress" element={<ImageCompressorWrapper />} />
      </Routes>
    </Router>
  );
}
