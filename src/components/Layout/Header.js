import Image from "next/image";
import styles from "./Layout.module.scss";
import Link from "next/link";
import logo from "./../../../public/assets/logo/logo-bayu.png";
export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.contactWrap}>
        <div className="container">
          <div className="d-flex justify-content-end">
            <div className="me-3">
              <span className="me-2"></span>+6221-23509999
            </div>
            <div>
              <span className="me-2"></span>office@bayubuanatravel.com
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainHeader}>
        <div className="container">
          <div className="row">
            <div className={`${styles.logoWrap} col-4`}>
              <Image src={logo} alt="logo" />
            </div>
            <nav className={`${styles.navWrap} col-8`}>
              <div className={styles.navItem}>Home</div>
              <div className={styles.navItem}>About Us</div>
              <div className={`${styles.navItem} ${styles.navItem__hover}`}>
                Destination
                <div className={styles.navWrap}>
                  <div className={styles.navChildMenu}>
                    <Link href="/destination/international">International</Link>
                  </div>
                  <div className={styles.navChildMenu}>
                    <Link href="/destination/domenstic">Domestic</Link>
                  </div>
                </div>
              </div>
              <div className={styles.navItem}>
                <Link href="/passport">Passport & Visa</Link>
              </div>
              <div className={styles.navItem}>Contact Us</div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
