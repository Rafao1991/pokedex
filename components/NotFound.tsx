import Image from 'next/image'
import sad_pikachu from '../assets/img/sad_pikachu.png'
import styles from '../styles/Home.module.css'

const NotFound = () => {
  return (
    <div className={styles.main}>
      <h1>404 Not Found</h1>
      <Image src={sad_pikachu} alt="sad pikachu"/>
    </div>
  );
};

export default NotFound;