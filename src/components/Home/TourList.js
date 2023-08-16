import Card from "../common/Card";
import styles from "./../../../styles/pages/Home.module.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function TourList() {
  return (
    <>
      <div className="col-8">
        <div className={styles.title}>All Tours</div>
      </div>
      <div className="col-4 d-flex align-items-center justify-content-end">
        <a className={styles.link}>View More</a>
      </div>
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
