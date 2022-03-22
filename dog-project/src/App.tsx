import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/Home";
import { getRandomDog } from "./api/dog-api";

function App() {
  const [imageUrl, setImageUrl] = useState();

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
      {{ imageUrl } && <img src={imageUrl}></img>}
    </>
  );
}

export default App;
