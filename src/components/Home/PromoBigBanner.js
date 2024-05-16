import styles from "./../../../styles/pages/Home.module.scss";
import promo from "./../../../public/assets/promo3.JPG";
import promo4 from "./../../../public/assets/promo4.jpg";
import promo5 from "./../../../public/assets/promo5.JPG";
import promo6 from "./../../../public/assets/promo6.JPG";
import promo2 from "./../../../public/assets/promo2.jpg";
// import promo3 from "./../../../public/assets/promo3.jpg";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import TitleSection from "../common/TitleSection";
import useTranslation from 'next-translate/useTranslation'
export default function PromoBigBanner() {
  const { t, lang } = useTranslation('common')
  const gallery = [promo, promo4, promo5, promo6]
  return (
    <>
      <TitleSection
        title={t('explore')}
        subtitle={t('experiance')}
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
          arrows: true,
        }}
      >
        {gallery.map((item, idx) => {
          return (
            <SplideSlide key={idx}>
              <div className="col-12">
                <div className={styles.sliderList}>
                  <div className={styles.sliderItem}>
                    <Image src={item} alt="promo" />
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
