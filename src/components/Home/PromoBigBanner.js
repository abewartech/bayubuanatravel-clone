import styles from "./../../../styles/pages/Home.module.scss";
import promo from "./../../../public/assets/promo.png";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import TitleSection from "../common/TitleSection";
export default function PromoBigBanner() {
  return (
    <>
      <TitleSection
        title="Explore Our Promotions"
        subtitle="Nikmati Promo & Event Menarik Untuk Melengkapi Liburanmu"
        more={false}
      />
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
