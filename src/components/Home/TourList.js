import Card from "../common/Card";
import styles from "./../../../styles/pages/Home.module.scss";

export default function TourList() {
  return (
    <>
      <div className="col-8">
        <div className={styles.title}>All Tours</div>
      </div>
      <div className="col-4 d-flex align-items-center justify-content-end">
        <a className={styles.link}>View More</a>
      </div>

      {[...Array(4)].map((item, idx) => {
        return (
          <div key={idx} className="col-3">
            <Card />
          </div>
        );
      })}
    </>
  );
}
