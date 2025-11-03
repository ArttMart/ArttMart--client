import ProductGrid from '@components/shared/ProductGrid/ProductGrid';
import Categories from './Categories/Categories';
import Carousel from './Carousel/Carousel';
import styles from './Homepage.module.scss';

const Homepage = (props) => {
  return (
    <div className={`${styles.homepage} container`}>
      <div className={styles.sectionContainer}>
        <h2 className={`${styles.heading} h2`}>Welcome to ArttMart!</h2>
        <Carousel data={props.data[3]} />
      </div>

      <div className={styles.sectionContainer}>
        <h2 className={`${styles.heading} h2`}>Featured Art Work</h2>
        <div className={styles.wrapper}>
          <ProductGrid data={props.data[0]} />
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <h2 className={`${styles.heading} h2`}>Categories</h2>
        <div className={styles.wrapper}>
          <Categories data={props.data[1]} />
        </div>
      </div>

      <div className={styles.sectionContainer}>
        <h2 className={`${styles.heading} h2`}>New Arrivals</h2>
        <div className={styles.wrapper}>
          <ProductGrid data={props.data[2]} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
