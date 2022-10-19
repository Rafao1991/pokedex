interface PokemonDto {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: Sprite;
  types: PokemonTypes[];
}

interface Sprite {
  front_default: string;
}

interface PokemonTypes {
  type: {
    name: string;
  };
}
