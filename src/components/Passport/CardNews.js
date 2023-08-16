import styles from "./../../../styles/pages/Passport.module.scss";
import thumbnail from "./../../../public/assets/thumb.png";
import calendar from "./../../../public/assets/icon/calendar.svg";
import Image from "next/image";
export default function CardNews() {
  return (
    <div className={styles.cardNewsUpdate}>
      <div className={styles.cardNewsThumbnail}>
        <Image src={thumbnail} alt="thumb" />
      </div>
      <div className={styles.cardNewsBody}>
        <div className={styles.cardNewsDate}>
          <span className="me-1">
            <Image src={calendar} width={16} height={16} alt="date" />
          </span>{" "}
          Friday, 21 October 2022
        </div>
        <div className={styles.cardNewsTitle}>
          Masa Berlaku Paspor Indonesia Menjadi 10 Tahun
        </div>
        <div className={styles.desc}>
          Hi Bayu Buana Lovers, ada kabar gembira nih, Direktorat Jenderal
          Imigrasi resmi menetapkan Paspor RI dengan masa berlaku paling lama 10
          (sepuluh) tahun
        </div>
        <div className={styles.more}>Read More</div>
      </div>
    </div>
  );
}
