import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import { getRandomDog } from "./api/dog-api";
import AnimalFrame from "./components/AnimalFrame/AnimalFrame";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div >
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<h1>implement about</h1>} />

          <Route path="*" element={<h1>404 page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
