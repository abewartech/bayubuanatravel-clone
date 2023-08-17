import { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import sample from "./../../../../public/assets/sample.png";
import domestic from "./../../../../public/assets/domestic.png";
import clock from "./../../../../public/assets/icon/clock.svg";
import thumbnail from "./../../../../public/assets/thumb.png";
import calendar from "./../../../../public/assets/icon/calendar.svg";
import passport from "./../../../../public/assets/passport.png";
import Link from "next/link";

export default function Card(props) {
  const { type } = props;
  const commonCard = () => {
    return (
      <div className={`${styles.card} mt-3  `}>
        <Image src={sample} alt="sample" className="w-100" />
        <div className={styles.date}>
          <span className="me-2">
            <Image src={clock} width={10} height={10} alt="clock" />
          </span>
          4 Days & 3 Nights
        </div>
        <div className={styles.wrapContent}>
          <div className={styles.cardInfo}>
            <div className={styles.titlePackage}>Asia</div>
            <div className={styles.total}></div>
          </div>
          <div className={styles.cardPricing}>
            <div className={styles.price}>Starting From</div>
            <div className={styles.priceNumber}>
              IDR 56.000 <span>Per Person</span>
            </div>
          </div>
          <div className={styles.cta}>
            <Link href="https://wa.me/6281316776671" target="_blank">
              <button>Contact</button>
            </Link>
          </div>
        </div>
        <div className={styles.overlay}></div>
      </div>
    );
  };

  const newsCard = () => {
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
            Imigrasi resmi menetapkan Paspor RI dengan masa berlaku paling lama
            10 (sepuluh) tahun
          </div>
          <div className={styles.more}>Read More</div>
        </div>
      </div>
    );
  };

  const passportCard = () => {
    return (
      <div className={styles.cardPassword}>
        <div className={styles.cardImg}>
          <Image src={passport} alt="passport" />
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardPassporttitle}>Visa</div>
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
  };

  const domesticCard = () => {
    return (
      <div className={`${styles.card} ${styles.card__domestic}`}>
        <div className={styles.thumbnailWrap}>
          <Image src={domestic} alt="thumbnail" />
          <div className={styles.date}>
            <span className="me-2">
              <Image src={clock} width={10} height={10} alt="clock" />
            </span>
            4 Days & 3 Nights
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.titleCard}>4D EXOTIC TANA TORAJA</div>
          <div className={styles.departure}>
            Depart: <span>Jan - Aug 2023</span>
          </div>
          <div className={styles.footerCard}>
            <div className={styles.cta}>
              <button>Select</button>
            </div>
            <div className={styles.price}>
              <div className={styles.label}>From</div>
              <div className={styles.priceNumber}>IDR 5,679,000</div>
              <div className={styles.label}>Per Person</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const handleRender = (type) => {
    switch (type) {
      case "common":
        return commonCard();
      case "international":
        return domesticCard();
      case "news":
        return newsCard();
      case "passport":
        return passportCard();
      default:
        return commonCard();
    }
  };

  return <>{handleRender(type)}</>;
}
