import Image from "next/image";
import styles from "./../../../styles/pages/Home.module.scss";
import banner from "./../../../public/assets/banner.png";
export default function PromoSmallBanner() {
  return (
    <div className="col-12">
      <div className={styles.bannerPromo}>
        <Image src={banner} alt="banner" />
      </div>
    </div>
  );
}
