import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [pokemon, setPokemon] = useState<string[]>([]);
  
  useEffect(() => {
   const findAll = async () => {
    const response = await axios.get('https://pokedex-two-eta.vercel.app/api/pokemon');
    setPokemon(response.data);
   }

   findAll();
  }, []);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to our Pokedex!</h1>
        <ul>
          {pokemon.map(p => (
            <li key={p}>
              <a href={`/pokemon/${p}`}>{p}</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
};

export default Home;
