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
        className={`${styles.sidemenu} ${
          showSideMenu ? styles.sidemenu__active : undefined
        }`}
      >
        <div className="position-fixed">
          <div className={styles.sideMenuItem}>
            <Link href="/">Home</Link>
          </div>
          <div className={styles.sideMenuItem}>
            <Link href="/about">About</Link>
          </div>
          <div className={styles.sideMenuItem}>
            <Link href="/packages">Packages</Link>
          </div>
          <div className={styles.sideMenuItem}>
            <Link href="/resort">Resort</Link>
          </div>
          {/* <div className={styles.sideMenuItem}>
          <Link href="/destination/domenstic">Domestic Destination</Link>
        </div> */}
          <div className={styles.sideMenuItem}>
            <Link href="/gallery">Gallery</Link>
          </div>
          <div className={styles.sideMenuItem}>
            <Link href="/contact-us">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
