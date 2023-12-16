import Image from "next/image";
import Link from "next/link";
import logo from "./../../../public/assets/logo/logo.png";
import styles from "./Layout.module.scss";
import mail from "./../../../public/assets/icon/mail.svg";
import call from "./../../../public/assets/icon/call.svg";
import useTranslation from "next-translate/useTranslation";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
export default function Footer() {
  const { t, lang } = useTranslation("common");
  const socialMediaLinks = [
    { icon: <InstagramIcon />, url: "https://www.instagram.com/marinarajaampatt" },
    { icon: <FacebookIcon />, url: "https://www.facebook.com/hashtag/marinarajaampat/" },
    { icon: <TwitterIcon />, url: "https://twitter.com/example" },
  ];
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
                office@marinarajaampat.com
              </div>
            </div>
          </div>

          <div className={` col-12 col-lg-3 offset-lg-5`}>
            <div className={`${styles.footerOtherMenu}`}>
              <div className={styles.footerOtherTitle}>{t("other")}</div>
              <div className={styles.footerItemMenu}>{t("travel")}</div>
              <Link
                href="/termsandconditions"
                passHref
                style={{ textDecoration: "none" }}
              >
                <div className={styles.footerItemMenu}>{t("term")}</div>
              </Link>
              <Link href="/faq" passHref style={{ textDecoration: "none" }}>
                <div className={styles.footerItemMenu}>FAQs</div>
              </Link>
              <div className={styles.footerItemMenu}>{t("sitemap")}</div>
            </div>
          </div>

          <div className={`col-12 ${styles.socialMedia}`}>
            {socialMediaLinks.map((socialMedia, index) => (
              <a
                key={index}
                href={socialMedia.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {socialMedia.icon}
              </a>
            ))}
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
