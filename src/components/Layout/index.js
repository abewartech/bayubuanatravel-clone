import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.scss";
import Link from "next/link";

export default function Layout(props) {
  const { children } = props;
  const [showSideMenu, setShowSideMenu] = useState(false);

  useEffect(() => {
    if (showSideMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showSideMenu]);
  const handleShowMenu = () => {
    setShowSideMenu(!showSideMenu);
  };
  return (
    <div className={`${styles.layout} ${showSideMenu && styles.layout__hide}`}>
      {showSideMenu && (
        <div onClick={handleShowMenu} className={styles.overlay}></div>
      )}
      <div
        className={`${styles.sidemenu} ${
          showSideMenu && styles.sidemenu__active
        }`}
      >
        <div className={styles.sideMenuItem}>
          <Link href="/">Home</Link>
        </div>
        <div className={styles.sideMenuItem}>About Us</div>

        <div className={styles.sideMenuItem}>
          <Link href="/destination/international">
            International Destination
          </Link>
        </div>
        <div className={styles.sideMenuItem}>
          <Link href="/destination/domenstic">Domestic Destination</Link>
        </div>
        <div className={styles.sideMenuItem}>
          <Link href="/passport">Passport & Visa</Link>
        </div>
        <div className={styles.sideMenuItem}>
          <Link href="/contact-us">Contact Us</Link>
        </div>
      </div>

      <Header handleShowMenu={handleShowMenu} />
      {children}
      <Footer />
    </div>
  );
}
