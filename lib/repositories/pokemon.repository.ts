import axios from "axios";
import { capitalizeFirstLetter } from "../common/StringUtils";

const baseUrl = "https://pokeapi.co/api/v2/";

export const findAll = async (): Promise<string[]> => {
  const result = await axios.get(`${baseUrl}pokemon?limit=151`);
  return result.data.results.map((p: PokemonDto) =>
    capitalizeFirstLetter(p.name)
  );
};

export const findByName = async (name: string): Promise<Pokemon> => {
  const response = await axios.get<PokemonDto>(
    `${baseUrl}pokemon/${name.toLowerCase()}`
  );
  const pokemon: Pokemon = {
    id: response.data.id,
    name: capitalizeFirstLetter(response.data.name),
    height: response.data.height,
    weight: response.data.weight,
    image: response.data.sprites.front_default,
    types: response.data.types.map((type) =>
      capitalizeFirstLetter(type.type.name)
    ),
  };

  return pokemon;
};
