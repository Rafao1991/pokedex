import { isEmpty } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import * as pokemonRepository from "../../../libs/repositories/pokemon.repository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon>
) {
  const result = await pokemonRepository.findByNameOrId(
    req.query.pokemonName as string
  );

  if (isEmpty(result)) {
    res.status(404).end();
    return;
  }

  res.status(200).json(result);
}
