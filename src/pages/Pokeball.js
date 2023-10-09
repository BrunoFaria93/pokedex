import { Link } from "react-router-dom";
import pokeballSound from "../assets/sounds/pokeballsound.mp3";

const PokePage = () => {
  const playAudioPokeball = () => {
    new Audio(pokeballSound).play();
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-5">
      <h1 className="font-bold text-3xl text-white">Clique na Pokéball</h1>
      <Link to="./pokedex">
        <img
          onClick={() => playAudioPokeball()}
          className="w-44 h-44 bounceImg"
          src={require("../assets/images/pokeball.png")}
          alt="pokeball"
        />
      </Link>
    </div>
  );
};

export default PokePage;
