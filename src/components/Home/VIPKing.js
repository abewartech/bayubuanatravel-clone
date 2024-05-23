import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from "./../../../styles/pages/Home.module.scss";
import TitleSection from "../common/TitleSection";
import img1 from "./../../../public/rooms/VIPKING/20230722_125936.jpg";
import img2 from "./../../../public/rooms/VIPKING/vipking.jpg";
import img3 from "./../../../public/rooms/VIPKING/20230722_125946.jpg";
import img4 from "./../../../public/rooms/VIPKING/20230722_130000.jpg";
import img5 from "./../../../public/rooms/VIPKING/DSC04930.JPG";
import img6 from "./../../../public/rooms/VIPKING/DSC04931.JPG";
import Image from "next/image";
import TitleKecilSection from "../common/TitleKecilSection";

export default function VIPKing(props) {
  const { onClick } = props;
  const gallery = [img1, img2, img3, img4, img5, img6];
  return (
    <div className={`${styles.galleryList}`}>
      <div className="row">
        <TitleKecilSection title="VIP King" more={false} />
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
          {gallery.map((item, idx) => {
            return (
              <SplideSlide key={idx}>
                <div
                  onClick={() => onClick(item)}
                  className={styles.galleryItem}
                >
                  <Image alt="gallery" src={item} />
                </div>
                {/* <div className={styles.caption}>Photo By</div> */}
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
}
