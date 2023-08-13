import styles from "./../../../styles/pages/Home.module.scss";

export default function SearchBox() {
  return (
    <div className="container">
      <div className={`${styles.searchBox} row`}>
        <div className="col-5">
          <div className={styles.filter}>
            <div className={styles.icon}></div>
            <div className={styles.filterForm}>
              <label>Departure Dates</label>
              <input />
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className={styles.filter}>
            <div className={styles.icon}></div>
            <div className={styles.filterForm}>
              <label>Departure Dates</label>
              <input />
            </div>
          </div>
        </div>
        <div className="col-2">
          <button>Find Now</button>
        </div>
      </div>
    </div>
  );
}
