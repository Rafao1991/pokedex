import axios from "axios";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface props {
  baseUrl: string;
  _pokemon: Pokemon;
}

const Pokedex: NextPage<props> = ({ baseUrl, _pokemon }: props) => {
  const router = useRouter();
  const [pokemonId, setPokemonId] = useState<number>(_pokemon.id);
  const [pokemon, setPokemon] = useState<Pokemon>(_pokemon);

  console.log(`render ${pokemonId} ${pokemon.name}`);

  useEffect(() => {
    const findById = async (id: number) => {
      try {
        const response = await axios.get<Pokemon>(`${baseUrl}pokemon/${id}`);
        setPokemon(response.data);
      } catch {}
    };
    findById(pokemonId);
  }, [baseUrl, pokemonId]);

  const navigateUp = () => {
    if (pokemonId > 1) {
      setPokemonId(pokemonId - 1);
    }
  };

  const navigateDown = () => {
    if (pokemonId < 898) {
      setPokemonId(pokemonId + 1);
    }
  };

  return (
    <div className="body" id="pokedex">
      {/* Left Panel */}
      <div id="left-panel">
        {/* Top lights */}
        <div className="left-top-container">
          <div className="lights-container">
            <div className="big-light-boarder">
              <div className="big-light blue" onClick={() => router.push("/")}>
                <div className="big-dot light-blue"></div>
              </div>
            </div>
            <div className="small-lights-container">
              <div className="small-light red">
                <div className="dot light-red"></div>
              </div>
              <div className="small-light yellow">
                <div className="dot light-yellow"></div>
              </div>
              <div className="small-light green">
                <div className="dot light-green"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Center Screen */}
        <div className="screen-container">
          <div className="screen">
            <div className="top-screen-lights">
              <div className="mini-light red"></div>
              <div className="mini-light red"></div>
            </div>
            <div id="main-screen">
              <Image
                width={96}
                height={96}
                src={pokemon.image}
                alt={pokemon.name}
              />
            </div>
            <div className="bottom-screen-lights">
              <div className="small-light red">
                <div className="dot light-red"></div>
              </div>
              <div className="burger">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Buttons */}
        <div className="buttons-container">
          <div className="upper-buttons-container">
            <div className="big-button"></div>
            <div className="long-buttons-container">
              <div className="long-button red"></div>
              <div className="long-button light-blue"></div>
            </div>
          </div>
          <div className="nav-buttons-container">
            <div className="dots-container">
              <div>.</div>
              <div>.</div>
            </div>
            <div className="green-screen">
              <span id="name-screen">{pokemon.name}</span>
            </div>
            <div className="right-nav-container">
              <div className="nav-button">
                <div className="nav-center-circle"></div>
                <div className="nav-button-vertical"></div>
                <div className="nav-button-horizontal">
                  <div className="border-top" onClick={navigateUp}></div>
                  <div className="border-bottom" onClick={navigateDown}></div>
                </div>
              </div>
              <div className="bottom-right-nav-container">
                <div className="small-light red">
                  <div className="dot light-red"></div>
                </div>
                <div className="dots-container">
                  <div className="black-dot">.</div>
                  <div className="black-dot">.</div>
                  <div className="black-dot">.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of Left panel */}

      {/* Right-panel */}
      <div id="right-panel">
        {/* Blank container */}
        <div className="empty-container"></div>
        {/* Top screen */}
        <div className="top-screen-container">
          <div id="about-screen" className="right-panel-screen">
            {`Height:${pokemon.height}cm Weight:${pokemon.weight}kg`}
          </div>
        </div>
        {/* Blue Buttons */}
        <div className="square-buttons-container">
          <div className="blue-squares-container">
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
            <div className="blue-square"></div>
          </div>
        </div>
        {/* Center Buttons */}
        <div className="center-buttons-container">
          <div className="center-left-container">
            <div className="small-reds-container">
              <div className="small-light red">
                <div className="dot light-red"></div>
              </div>
              <div className="small-light red">
                <div className="dot light-red"></div>
              </div>
            </div>
            <div className="white-squares-container">
              <div className="white-square"></div>
              <div className="white-square"></div>
            </div>
          </div>
          <div className="center-right-container">
            <div className="thin-buttons-container">
              <div className="thin-button"></div>
              <div className="thin-button"></div>
            </div>
            <div className="yellow-button yellow">
              <div className="big-dot light-yellow"></div>
            </div>
          </div>
        </div>
        {/* Bottom screens */}
        <div className="bottom-screens-container">
          <div id="type-screen" className="right-panel-screen">
            {pokemon.types.join(", ")}
          </div>
          <div id="id-screen" className="right-panel-screen">
            #{pokemon.id}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_API_BASE_URL;
  try {
    const response = await axios.get<Pokemon>(`${baseUrl}pokemon/1`);
    const _pokemon = response.data;

    return {
      props: { baseUrl, _pokemon },
    };
  } catch {
    return {
      props: { baseUrl },
    };
  }
}

export default Pokedex;
