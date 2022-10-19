// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as pokemonRepository from "../../lib/repositories/pokemon.repository";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const result = await pokemonRepository.findAll();
  res.status(200).json(result);
}
