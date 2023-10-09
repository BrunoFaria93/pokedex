import "./App.css";
import { Route, Routes } from "react-router-dom";
import Pokeball from "./pages/Pokeball";
import Pokedex from "./pages/Pokedex";
import { useRef, useState } from "react";
import { FaVolumeUp, FaVolumeOff } from "react-icons/fa";

function App() {
  const [isSound, setIsSound] = useState(false);
  const myRef = useRef();

  const audioHandler = () => {
    if (isSound) {
      myRef.current.pause();
    } else {
      myRef.current.play();
    }
    setIsSound(!isSound);
  };

  return (
    <>
      <audio ref={myRef} src={require("./assets/sounds/theme.mp3")} />
      <div>
        {isSound ? (
          <FaVolumeUp
            className="absolute w-10 h-10 right-5 top-5 text-white z-50"
            onClick={() => audioHandler()}
          />
        ) : (
          <FaVolumeOff
            className="absolute w-10 h-10 right-5 top-5 text-white z-50"
            onClick={() => audioHandler()}
          />
        )}
      </div>
      <Routes>
        <Route path="/" element={<Pokeball />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </>
  );
}

export default App;
