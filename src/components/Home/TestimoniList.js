import styles from "./../../../styles/pages/Home.module.scss";
import TestimoniItem from "./TestimoniItem";
export default function TestimoniList() {
  return (
    <div className={styles.testimoniWrap}>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className={styles.title}>Travelers Review</div>
            <div className={styles.subtitle}>
              INI DIA KATA MEREKA YANG SUDAH PERNAH IKUT TRAVELING BARENG BAYU
              BUANA
            </div>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-end">
            <a className={styles.link}>View More</a>
          </div>
          {[...Array(3)].map((item, idx) => {
            return <TestimoniItem key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
}
