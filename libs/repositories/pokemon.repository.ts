import axios from "axios";
import { capitalizeFirstLetter } from "../common/StringUtils";

const baseUrl = process.env.POKE_API_BASE_URL;

export const findAll = async (limit: number = 151): Promise<Pokemon[]> => {
  try {
    const result = await axios.get(`${baseUrl}pokemon?limit=${limit}`);

    if (!result || !result.data || !result.data.results) {
      return [];
    }

    return result.data.results.map((p: PokemonDto, i: number) => {
      return {
        id: i + 1,
        name: capitalizeFirstLetter(p.name),
        url: p.url,
      };
    });
  } catch {
    return [];
  }
};

export const findByNameOrId = async (nameOrId: string): Promise<Pokemon> => {
  try {
    const response = await axios.get<PokemonDto>(
      `${baseUrl}pokemon/${nameOrId.toLowerCase()}`
    );

    if (!response || !response.data) {
      return getEmptyPokemon();
    }

    const pokemon: Pokemon = {
      id: response.data.id,
      name: capitalizeFirstLetter(response.data.name),
      url: response.data.url,
      height: response.data.height,
      weight: response.data.weight,
      image: response.data.sprites.front_default,
      types: response.data.types.map((type) =>
        capitalizeFirstLetter(type.type.name)
      ),
    };

    return pokemon;
  } catch {
    return getEmptyPokemon();
  }
};

const getEmptyPokemon = (): Pokemon => {
  const pokemon: Pokemon = {
    id: 0,
    name: "",
    url: "",
    height: 0,
    weight: 0,
    image: "",
    types: [],
  };

  return pokemon;
};
