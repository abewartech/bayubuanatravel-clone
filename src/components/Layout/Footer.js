import styles from "./Layout.module.scss";
export default function Footer() {
  return (
    <div className={`${styles.footerWrap} `}>
      <div className="container">
        <div className={`${styles.footerContent} row`}>
          {/* <div className={`${styles.footerSocmed} col-4`}>
            <div className={styles.footerSocmedItem}>FB</div>
            <div className={styles.footerSocmedItem}></div>
            <div className={styles.footerSocmedItem}></div>
          </div> */}
          <div className={`${styles.footerOtherMenu} col-8`}>
            <div className={styles.footerItemMenu}>Travel Updates</div>
            <div className={styles.footerItemMenu}>Terms & Conditions</div>
            <div className={styles.footerItemMenu}>Privacy Policy</div>
            <div className={styles.footerItemMenu}>Sitemap</div>
          </div>
        </div>
        <div className={styles.copyRight}>
          © 2023 Bayu Buana Travel Services. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
