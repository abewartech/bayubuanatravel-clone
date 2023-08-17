import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.scss";
import Link from "next/link";
import Image from "next/image";
import whatsapp from "./../../../public/assets/logo/whatsapp.png";
import Sidebar from "./Sidebar";

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
    <div
      className={`${styles.layout} ${
        showSideMenu ? styles.layout__hide : undefined
      }`}
    >
      <Sidebar showSideMenu={showSideMenu} handleShowMenu={handleShowMenu} />
      <Header handleShowMenu={handleShowMenu} />
      {children}
      <Footer />
      <div className={styles.whatsappBtn}>
        <div className={styles.whatsappBtnCta}>
          <Link href="https://wa.me/6281316776671" target="_blank">
            <Image src={whatsapp} alt="whatsapp" />
          </Link>
        </div>
      </div>
    </div>
  );
}
