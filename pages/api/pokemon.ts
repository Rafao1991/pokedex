// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as pokemonRepository from "../../libs/repositories/pokemon.repository";
import { isEmpty } from "lodash";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Pokemon[]>
) {
  const result = await pokemonRepository.findAll();

  if (isEmpty(result)) {
    res.status(404).end();
    return;
  }

  res.status(200).json(result);
}
