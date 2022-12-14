import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import NotFound from "../components/NotFound";
import styles from "../styles/Home.module.css";

interface HomeProps {
  pokemon: Pokemon[];
}

const Home: NextPage<HomeProps> = ({ pokemon }) => {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const filteredPokemon = pokemon
    ? pokemon.filter((pokemon) =>
        pokemon.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      )
    : [];

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokédex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to our Pokédex!</h1>
        <div>
          Search for a Pokémon:{" "}
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <Link href="/pokedex">
          <a>or go to a funniest Pokédex...</a>
        </Link>
        {pokemon ? (
          <section className={styles.pokemonList}>
            {filteredPokemon.map((p: Pokemon) => (
              <div
                className={styles.pokemonItem}
                key={p.name}
                onClick={() =>
                  router.push(`/pokemon/${p.name.toLocaleLowerCase()}`)
                }
              >
                <Image
                  width={96}
                  height={96}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                  alt={p.name}
                />
                <p>{p.name}</p>
              </div>
            ))}
          </section>
        ) : (
          <NotFound />
        )}
      </main>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const baseUrl = process.env.NEXT_API_BASE_URL;
    const response = await axios.get(`${baseUrl}pokemon/`);

    return {
      props: { pokemon: response.data },
    };
  } catch {
    return {
      props: { pokemon: null },
    };
  }
};

export default Home;
