import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from "./../../../styles/pages/Home.module.scss";
import TestimoniItem from "./TestimoniItem";
export default function TestimoniList() {
  return (
    <div className={styles.testimoniWrap}>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className={styles.title}>Travelers Review</div>
            <div className={styles.subtitle}>
              INI DIA KATA MEREKA YANG SUDAH PERNAH IKUT TRAVELING BARENG BAYU
              BUANA
            </div>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-end">
            <a className={styles.link}>View More</a>
          </div>

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
