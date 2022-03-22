import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import { getRandomDog } from "./api/dog-api";
import AnimalFrame from "./components/AnimalFrame/AnimalFrame";

function App() {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    // let mounted = true;
    getRandomDog().then((dog) => {
      // if (mounted) {
      setImageUrl(dog);
      // }
    });
    // return () => (mounted = false);
  }, []);

  console.log(imageUrl);
  return (
    <>
      <Home></Home>
      {/* {{ imageUrl } && <img src={imageUrl}></img>} */}
      <AnimalFrame imageUrl={imageUrl}></AnimalFrame>
    </>
  );
}

export default App;
