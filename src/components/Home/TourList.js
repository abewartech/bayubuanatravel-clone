import Card from "../common/Card";
import TitleSection from "../common/TitleSection";
import styles from "./../../../styles/pages/Home.module.scss";
import useTranslation from 'next-translate/useTranslation'
import { Splide, SplideSlide } from "@splidejs/react-splide";


export default function TourList() {
  const { t, lang } = useTranslation('common')
  return (
    <>
      <TitleSection title={t('alltours')}/>
      <div className="mb-4">
        <Splide
          options={{
            type: "loop",
            perPage: 4,
            pagination: false,
            gap: "1.25rem",
            fixedWidth: "calc(25% - 32px)",
            perMove: 1,
            breakpoints: {
              1024: {
                perPage: 3,
                fixedWidth: "calc(33% - 32px)",
              },
              992: {
                perPage: 2,
                fixedWidth: "calc(50% - 32px)",
              },
              640: {
                perPage: 1,
                fixedWidth: "calc(100% - 8rem)",
              },
            },
            autoplay: true,
          }}
        >
          {[...Array(5)].map((item, idx) => {
            return (
              <SplideSlide key={idx}>
                <Card />
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </>
  );
}
