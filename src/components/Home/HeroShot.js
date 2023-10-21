import styles from "./../../../styles/pages/Home.module.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import useTranslation from 'next-translate/useTranslation'
import slider1 from "./../../../public/assets/slider/slider1.jpg";
import slider2 from "./../../../public/assets/slider/slider2.jpg";
import slider3 from "./../../../public/assets/slider/slider3.jpg";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";
export default function HeroShot() {
  const sliders = [slider1, slider2, slider3];
  const { t, lang } = useTranslation('common')
  return (
    <div className={styles.heroShot}>
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          perMove: 1,
          arrows: false,
          autoplay: true
        }}
      >
        {sliders.map((item, idx) => {
          return (
            <SplideSlide key={idx}>
              <Image src={item} alt="hero" className={styles.bannerBig} />
            </SplideSlide>
          );
        })}
      </Splide>
      <div className={styles.wrap}>
        <div className="container">
          <div className="row">
            {/* <div className="col-12 col-lg-6 p-0"></div> */}
            <div className={`col-12 col-lg-8 ${styles.wrapInfo}`}>
              <div className={styles.mainTitle}>
                {t('Welcome')}
              </div>
              <div className={styles.subTitle}>
                {t('fullexperience')}
              </div>
          
            </div>
          </div>
        </div>
      </div>
      {/* <SearchBox /> */}
    </div>
  );
}
