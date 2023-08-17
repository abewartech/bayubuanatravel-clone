import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from "./../../../styles/pages/Home.module.scss";
import TestimoniItem from "./TestimoniItem";
import TitleSection from "../common/TitleSection";
export default function TestimoniList() {
  return (
    <div className={styles.testimoniWrap}>
      <div className="container">
        <div className="row">
          <TitleSection
            title="Testimoni Travelers"
            subtitle="Kata mereka mengenai traveling bareng bayu buana"
          />
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              pagination: false,
              gap: "1.25rem",
              fixedWidth: "calc(33% - 32px)",
              perMove: 1,
              autoplay: true,
              arrows: false,
              breakpoints: {
                1024: {
                  perPage: 3,
                  fixedWidth: "calc(33% - 32px)",
                },
                992: {
                  perPage: 1,
                  fixedWidth: "calc(100% - 32px)",
                },
                640: {
                  perPage: 1,
                  fixedWidth: "calc(100% - 6rem)",
                },
              },
            }}
          >
            {[...Array(5)].map((item, idx) => {
              return (
                <SplideSlide key={idx}>
                  <TestimoniItem key={idx} />
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
      </div>
    </div>
  );
}
