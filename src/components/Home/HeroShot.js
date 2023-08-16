import styles from "./../../../styles/pages/Home.module.scss";
import SearchBox from "./SearchBox";
import domestic from "./../../../public/assets/domestic.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";
export default function HeroShot() {
  return (
    <div className={styles.heroShot}>
      <div className={styles.wrap}>
        {/* <Splide
          options={{
            type: "loop",
            perPage: 1,
            pagination: true,
            perMove: 1,
            autoplay: true,
            arrows: false,
            fixedWidth: "calc(100%)",
          }}
        >
          {[...Array(1)].map((item, idx) => {
            return (
              <SplideSlide key={idx}>
                <div>Tes {idx}</div>
              </SplideSlide>
            );
          })}
        </Splide> */}
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <div className="row ">
              <div className="col-12 col-lg-6 p-0">
                <Image src={domestic} alt="hero" />
              </div>
              <div className={`col-12 col-lg-6 p-0 ${styles.wrapInfo}`}>
                <div className={styles.mainTitle}>
                  Long Weekend Holiday Departures
                </div>
                <div className={styles.subTitle}>
                  Kunjungi destinasi favoritmu bareng #BayuBuanaAja. Jangan
                  sampai kelewatan kesempatan ini, karena kuotanya terbatas
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="row ">
              <div className="col-12 col-lg-6 p-0">
                <Image src={domestic} alt="hero" />
              </div>
              <div className={`col-12 col-lg-6 p-0 ${styles.wrapInfo}`}>
                <div className={styles.mainTitle}>
                  Long Weekend Holiday Departures
                </div>
                <div className={styles.subTitle}>
                  Kunjungi destinasi favoritmu bareng #BayuBuanaAja. Jangan
                  sampai kelewatan kesempatan ini, karena kuotanya terbatas
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <SearchBox />
    </div>
  );
}
