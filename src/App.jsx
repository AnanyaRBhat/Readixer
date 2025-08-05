// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SummarizePage from "./pages/SummarizePage";
import HandwritingPage from "./pages/HandwritingPage"; // If you have this

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summarize" element={<SummarizePage />} />
        <Route path="/handwriting" element={<HandwritingPage />} />
      </Routes>
    </Router>
  );
}
