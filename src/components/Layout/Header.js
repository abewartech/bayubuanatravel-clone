import Image from "next/image";
import styles from "./Layout.module.scss";
import Link from "next/link";
import logo from "./../../../public/assets/logo/logo.png";
import mail from "./../../../public/assets/icon/mail.svg";
import call from "./../../../public/assets/icon/call.svg";
import menu from "./../../../public/assets/icon/menu.svg";
import { useEffect } from "react";
export default function Header(props) {
  const { handleShowMenu } = props;
  useEffect(() => {
    window.onscroll = function () {
      myFunction();
    };

    var header = document.getElementById("header-landing");
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.scrollY > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  }, []);
  return (
    <div className={styles.header}>
      <div className={styles.contactWrap}>
        <div className="container">
          <div className="d-flex justify-content-end">
            <div className="me-4">
              <span className="me-2">
                <Image src={call} alt="call" width={16} height={16} />
              </span>
              +6221-23509999
            </div>
            <div>
              <span className="me-2">
                <Image src={mail} alt="mail" width={16} height={16} />
              </span>
              office@bayubuanatravel.com
            </div>
          </div>
        </div>
      </div>
      <div id="header-landing" className={styles.mainHeader}>
        <div className="container">
          <div className="row justify-content-between">
            <Link href="/" className={`${styles.logoWrap} col-10 col-lg-4`}>
              <Image src={logo} alt="logo" width={100} height={40} />
            </Link>
            <nav className={`${styles.navWrap} col-lg-8 col-10`}>
              <div className={styles.navItem}>
                <Link href="/">Home</Link>
              </div>
              <div className={styles.navItem}>About Us</div>
              {/* <div className={`${styles.navItem} ${styles.navItem__hover}`}>
                Destination
                <div className={styles.navWrap}>
                  <div className={styles.navChildMenu}>
                    <Link href="/destination/international">International</Link>
                  </div>
                  <div className={styles.navChildMenu}>
                    <Link href="/destination/domenstic">Domestic</Link>
                  </div>
                </div>
              </div> */}
              <div className={styles.navItem}>
                <Link href="/destination/international">Destination</Link>
              </div>
              <div className={styles.navItem}>
                <Link href="/passport">Passport & Visa</Link>
              </div>
              <div className={styles.navItem}>
                <Link href="/contact-us">Contact Us</Link>
              </div>
            </nav>
            <div
              onClick={handleShowMenu}
              className={`${styles.navWrap__mobile} ${styles.navWrap} col-2`}
            >
              <Image src={menu} alt="menu" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
