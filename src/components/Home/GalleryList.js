import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from "./../../../styles/pages/Home.module.scss";

export default function GalleryList() {
  return (
    <div className={`${styles.galleryList} container`}>
      <div className="row">
        <div className="col-8">
          <div className={styles.title}>Image Gallery from Participant</div>
        </div>
        <div className="col-4 d-flex align-items-center justify-content-end">
          <a className={styles.link}>View More</a>
        </div>

        <Splide
          options={{
            type: "loop",
            perPage: 4,
            pagination: false,
            gap: "1.25rem",
            fixedWidth: "calc(25% - 32px)",
            perMove: 1,
            autoplay: true,
            arrows: false,
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
          }}
        >
          {[...Array(5)].map((item, idx) => {
            return (
              <SplideSlide key={idx}>
                <div className={styles.galleryItem}></div>
                <div className={styles.caption}>Photo By</div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
}
