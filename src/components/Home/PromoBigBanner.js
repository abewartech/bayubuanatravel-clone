import styles from "./../../../styles/pages/Home.module.scss";

export default function PromoBigBanner() {
  return (
    <>
      <div className="col-8">
        <div className={styles.title}>Explore Our Promotions</div>
        <div className={styles.subtitle}>
          NIKMATI PROMO & EVENT MENARIK UNTUK MELENGKAPI LIBURANMU
        </div>
      </div>
      <div className="col-4 d-flex align-items-center justify-content-end">
        <a className={styles.link}>View More</a>
      </div>
      <div className="col-12">
        <div className={styles.sliderList}>
          <div className={styles.sliderItem}></div>
        </div>
      </div>
    </>
  );
}
