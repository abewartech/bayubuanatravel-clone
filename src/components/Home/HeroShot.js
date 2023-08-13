import styles from "./../../../styles/pages/Home.module.scss";
import SearchBox from "./SearchBox";

export default function HeroShot() {
  return (
    <div className={styles.heroShot}>
      <div className={styles.wrap}>
        <div className={styles.wrapLeft}></div>
        <div className={styles.wrapRight}></div>
      </div>
      <SearchBox />
    </div>
  );
}
