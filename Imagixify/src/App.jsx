import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompressedPage from "./components/compressedpage";
import ImageToPDF from "./pdf";
import HomePage from "./components/homepage";
import UploadPage from "./components/uploadpage";
import ImageWatermark from "./components/watermark";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/compressed" element={<CompressedPage />} />
        <Route path="/pdf" element={<ImageToPDF/>}/>
        <Route path="/image_compress" element={<UploadPage/>}/>
        <Route path="/watermark" element={<ImageWatermark/>}/>
      </Routes>
    </Router>
  );
}
