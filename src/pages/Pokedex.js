import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
const Pokedex = () => {
  const [pokeData, setPokeData] = useState();
  const [pokeSeach, setPokeSearch] = useState("");
  const [pokemonID, setPokemonID] = useState(pokeData?.id);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  let pokemonImage = "";
  if (pokeData) {
    pokemonImage =
      pokeData["sprites"]["versions"]["generation-v"]["black-white"][
        "animated"
      ]["front_default"];
  }

  const fetchPokemon = async (pokemon) => {
    setLoading(true);
    try {
      const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );

      if (APIResponse.status === 200) {
        setNotFound(false);
        const data = await APIResponse.json();
        setPokeData(data);
        setPokemonID(data.id);
        setLoading(false);
        return data;
      } else {
        setNotFound(true);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleOnChange = (e) => {
    e.preventDefault();
    setPokeSearch(e.target.value);
  };

  const handlePrev = () => {
    if (pokemonID > 1 && pokeData) {
      setPokemonID((prevPokemonID) => prevPokemonID - 1);
      fetchPokemon(pokemonID - 1);
    }
  };
  const handleNext = () => {
    if (pokeData) {
      setPokemonID((prevPokemonID) => prevPokemonID + 1);
      fetchPokemon(pokemonID + 1);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <main className="framerMotion md:flex md:justify-center md:items-center md:h-screen">
      <div className="inline-block mt-[15%] md:mt-0 p-[15px] relative md:p-0 md:py-10">
        <img
          className="w-full max-w-[425px] md:h-[500px]"
          src={require("../assets/images/pokedex.png")}
          alt="pokedex"
        />
        <img
          className="absolute bottom-[48%] left-[50%] transform -translate-x-[63%] -translate-y-[20%] h-[18%]"
          src={pokemonImage}
          alt=""
        />
        <h1 className="absolute font-bold color-[#aaa] top-[54.5%] right-[27%] flex gap-1 justify-center items-center">
          <span className="text-gray-400 text-xl">
            {pokeData ? (notFound ? "" : pokeData.id) : ""}
          </span>{" "}
          -
          <span className="color-[#3a444d] capitalize">
            {!pokeData && notFound && "Não encontrado :("}
            {loading
              ? "Carregando..."
              : pokeData
              ? notFound
                ? "Não encontrado"
                : pokeData.name
              : ""}
          </span>
        </h1>
        <div>
          <form className="absolute w-[65%] top-[65%] left-14 flex">
            <input
              onKeyPress={handleKeyPress}
              onChange={handleOnChange}
              type="text"
              value={pokeSeach}
              className="input_search"
              placeholder="Nome ou número"
              required
            />
            <button
              type="button"
              onClick={() =>
                pokeSeach ? fetchPokemon(pokeSeach.toLowerCase()) : ""
              }
              className="button_search"
            >
              <FaSearch />
            </button>
          </form>

          <div className="buttons">
            <button
              type="button"
              onClick={() => handlePrev()}
              className="button btn-prev"
            >
              Ant &lt;
            </button>
            <button
              type="button"
              onClick={() => handleNext()}
              className="button btn-next"
            >
              Prox &gt;
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pokedex;
