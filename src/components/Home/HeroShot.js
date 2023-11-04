import styles from "./../../../styles/pages/Home.module.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import useTranslation from "next-translate/useTranslation";
import slider1 from "./../../../public/assets/slider/slider1.jpg";
import slider2 from "./../../../public/assets/slider/slider2.jpg";
import slider3 from "./../../../public/assets/slider/slider3.jpg";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";
export default function HeroShot() {
  const sliders = [slider1, slider2, slider3];
  const { t, lang } = useTranslation("common");
  const hasSliders = sliders.length > 0;

  const slideTexts = [
    {
      mainTitle: t("Welcome"),
      subTitle: t("fullexperience"),
    },
    {
      mainTitle: t("WelcomeSlide2"),
      subTitle: t("fullexperienceSlide2"),
    },
    {
      mainTitle: t("WelcomeSlide3"),
      subTitle: t("fullexperienceSlide3"),
    },
  ];

  return (
    <div className={styles.heroShot} style={{ zIndex: -1 }}>
      <Splide
        options={{
          type: "fade",
          perPerPage: 1,
          perMove: 1,
          arrows: false,
          autoplay: true,
          rewind: true,
        }}
      >
        {hasSliders ? (
          sliders.map((item, idx) => (
            <SplideSlide key={idx}>
              <div className={styles.imageContainer}>
                <Image src={item} alt="hero" className={styles.bannerBig} />
              </div>
              <div className={styles.wrap}>
                <div className="container">
                  <div className="row">
                    <div className={`col-12 col-lg-8 ${styles.wrapInfo}`}>
                      <div className={styles.mainTitle}>{slideTexts[idx].mainTitle}</div>
                      <div className={styles.subTitle}>{slideTexts[idx].subTitle}</div>
                    </div>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))
        ) : (
          <SplideSlide>
            <div className={styles.imageContainer}></div>
            <div className={styles.wrap}>
              <div className="container">
                <div className="row">
                  <div className={`col-12 col-lg-8 ${styles.wrapInfo}`}>
                    <div className={styles.mainTitle}>{t("DefaultWelcome")}</div>
                    <div className={styles.subTitle}>{t("fullexperience")}</div>
                  </div>
                </div>
              </div>
            </div>
          </SplideSlide>
        )}
      </Splide>
    </div>
  );
}
