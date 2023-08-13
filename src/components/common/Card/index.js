import { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import Image from "next/image";
import sample from "./../../../../public/assets/sample.png";

export default function Card(props) {
  const { type } = props;
  const commonCard = () => {
    return (
      <div className={`${styles.card} mt-3  `}>
        <Image src={sample} alt="sample" className="w-100" />
        <div className={styles.wrapContent}>
          <div className={styles.cardInfo}>
            <div className={styles.titlePackage}>Asia</div>
            <div className={styles.total}>25 Tours</div>
          </div>
          <div className={styles.cardPricing}>
            <div className={styles.price}>Starting From</div>
            <div className={styles.priceNumber}>
              IDR 56.000 <span>Per Person</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const domesticCard = () => {
    return (
      <div className={`${styles.card} ${styles.card__domestic}`}>
        <div className={styles.thumbnailWrap}>
          {/* <Image src="" alt="thumbnail" /> */}
          <div className={styles.date}></div>
        </div>
        <div className={styles.info}>
          <div className={styles.titleCard}></div>
          <div className={styles.departure}>
            Depart: <span></span>
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
      default:
        return commonCard();
    }
  };

  return <>{handleRender()}</>;
}