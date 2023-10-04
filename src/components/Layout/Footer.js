import Image from "next/image";
import logo from "./../../../public/assets/logo/logo.png";
import styles from "./Layout.module.scss";
import mail from "./../../../public/assets/icon/mail.svg";
import call from "./../../../public/assets/icon/call.svg";
import menu from "./../../../public/assets/icon/menu.svg";
export default function Footer() {
  return (
    <div className={`${styles.footerWrap} `}>
      <div className="container">
        <div className={`${styles.footerContent} row`}>
          <div className="col-12 col-lg-4 mb-5">
            <Image src={logo} alt="logo" width={180} height={80} />
            <div className={styles.footerAddress}>
              Jl. Cakalang komp. Pelabuhan Perikanan. Kota sorong Papua Barat
            </div>
            <div className="mt-4">
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

          <div className={` col-12 col-lg-3 offset-lg-5`}>
            <div className={`${styles.footerOtherMenu}`}>
              <div className={styles.footerOtherTitle}>Others</div>
              <div className={styles.footerItemMenu}>Travel Updates</div>
              <div className={styles.footerItemMenu}>Terms & Conditions</div>
              <div className={styles.footerItemMenu}>Privacy Policy</div>
              <div className={styles.footerItemMenu}>Sitemap</div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-5">
          <div className={styles.copyRight}>
            © 2023 Bayu Buana Travel Services. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
