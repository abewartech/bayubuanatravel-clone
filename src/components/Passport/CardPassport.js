import styles from "./../../../styles/pages/Passport.module.scss";
import Image from "next/image";
import passport from "./../../../public/assets/passport.png";
export default function CardPassport() {
  return (
    <div className={styles.cardPassword}>
      <div className={styles.cardImg}>
        <Image src={passport} alt="passport" />
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.title}>Visa</div>
        <div className={styles.cardList}>
          <ul>
            <li>Visa Requirement</li>
            <li>Visa Requirement</li>
            <li>Visa Requirement</li>
            <li>Visa Requirement</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
