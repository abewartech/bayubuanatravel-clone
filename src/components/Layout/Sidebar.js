import Link from "next/link";
import styles from "./Layout.module.scss";

export default function Sidebar(props) {
  const { showSideMenu, handleShowMenu } = props;
  return (
    <>
      {showSideMenu && (
        <div onClick={handleShowMenu} className={styles.overlay}></div>
      )}
      <div
        className={`${styles.sidemenu} ${showSideMenu ? styles.sidemenu__active : undefined
          }`}
      >
        <div className="position-fixed">
          <div className={styles.sideMenuItem}>
            <Link href="/">Home</Link>
          </div>
          <div className={styles.sideMenuItem}>
            <Link href="/about">About Us</Link>
          </div>
          <div className={styles.sideMenuItem}>

            <Link href="/ourrestaurant">Our Restaurant</Link>
          </div>

          <div className={styles.sideMenuItem}>

            <Link href="/ourspeedboat">Our Speedboat</Link>
          </div>
          <div className={styles.sideMenuItem}>
            <Link href="/andauresort">Andau Resort</Link>
          </div>

          <div className={styles.sideMenuItem}>
            <Link href="/diving">Diving</Link>
          </div>
          <div className={styles.sideMenuItem}>
            <Link href="/packages">Packages</Link>
          </div>
          <div className={styles.sideMenuItem}>
            <Link href="/contact-us">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
