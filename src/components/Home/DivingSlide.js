import { Splide, SplideSlide } from "@splidejs/react-splide";
import styles from "./../../../styles/pages/Home.module.scss";
import TitleSection from "../common/TitleSection";
import img1 from "./../../../public/rooms/ANDAUDOUBLE/20230722_132024.jpg";
import img2 from "./../../../public/rooms/ANDAUDOUBLE/20230722_132107.jpg";
import img3 from "./../../../public/rooms/ANDAUDOUBLE/20230722_132119.jpg";
import img4 from "./../../../public/rooms/ANDAUDOUBLE/andaudouble.jpg";
import img5 from "./../../../public/rooms/ANDAUDOUBLE/DSC04935.JPG";
import img6 from "./../../../public/rooms/ANDAUDOUBLE/DSC04936.JPG";
import bg1 from "./../../../public/image/diving/1.jpg";
import bg2 from "./../../../public/image/diving/2.jpg";
import bg3 from "./../../../public/image/diving/3.jpg";
import image1 from "./../../../public/image/diving/4.jpg";
import image2 from "./../../../public/image/diving/5.jpg";
import image3 from "./../../../public/image/diving/6.jpg";
import image4 from "./../../../public/image/diving/7.jpg";
import image5 from "./../../../public/image/diving/8.jpg";
import image6 from "./../../../public/image/diving/9.jpg";
import image7 from "./../../../public/image/diving/10.jpg";
import image8 from "./../../../public/image/diving/11.jpg";
import image9 from "./../../../public/image/diving/12.jpg";
import Image from "next/image";
import TitleKecilSection from "../common/TitleKecilSection";

export default function DivingSlide(props) {
  const { onClick } = props;
  const gallery = [bg1, bg2, bg3, image1, image2, image3, image4, image5, image6, image7, image8, image9];
  return (
    <div className={`${styles.galleryList}`}>
      <div className="row">
        {/* <TitleKecilSection title="Diving" more={false} /> */}
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
