import { ThreeDots } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <ThreeDots color="#2ea8a1" />
    </div>
  );
};

export default Loader;
