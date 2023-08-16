import styles from "./../../../styles/pages/Home.module.scss";
import promo from "./../../../public/assets/promo.png";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
export default function PromoBigBanner() {
  return (
    <>
      <div className="col-8">
        <div className={styles.title}>Explore Our Promotions</div>
        <div className={styles.subtitle}>
          NIKMATI PROMO & EVENT MENARIK UNTUK MELENGKAPI LIBURANMU
        </div>
      </div>
      <div className="col-4 d-flex align-items-center justify-content-end">
        <a className={styles.link}>View More</a>
      </div>
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          pagination: false,
          gap: "1.25rem",
          perMove: 1,
          autoplay: true,
          arrows: false,
        }}
      >
        {[...Array(5)].map((item, idx) => {
          return (
            <SplideSlide key={idx}>
              <div className="col-12">
                <div className={styles.sliderList}>
                  <div className={styles.sliderItem}>
                    <Image src={promo} alt="promo" />
                  </div>
                </div>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </>
  );
}
