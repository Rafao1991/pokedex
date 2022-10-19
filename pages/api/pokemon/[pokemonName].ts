import type { NextApiRequest, NextApiResponse } from "next";
import * as pokemonRepository from "../../../lib/repositories/pokemon.repository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon>
) {
  const result = await pokemonRepository.findByName(
    req.query.pokemonName as string
  );
  res.status(200).json(result);
}
