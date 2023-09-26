import Image from "next/image";
import Layout from "../../src/components/Layout";
import thumbnail from "./../../public/assets/gallery/1.jpg";
import clock from "./../../public/assets/icon/clock.svg";
import airplane from "./../../public/assets/icon/airplane-square.svg";
import styles from "./../../styles/pages/DetailPackages.module.scss";
import { useState } from "react";

export default function DetailPackages() {
  const [expand, setExpand] = useState(false);
  const [id, setId] = useState(0);
  const handleShowDetail = (id) => {
    setExpand(!expand);
    setId(id);
  };
  return (
    <Layout>
      <div className="container my-4">
        <div className="row">
          <div className="col-lg-5">
            <div className="mb-3 position-relative">
              <Image
                src={thumbnail}
                alt="thumbnail"
                className={`w-100 h-50 ${styles.img}`}
              />
              <div className={styles.date}>
                <span className="me-2">
                  <Image src={clock} width={10} height={10} alt="clock" />
                </span>
                4 Days & 3 Nights
              </div>
            </div>
            <div className="mb-5">
              <div className={styles.topLabel}>Lorem ipsum doler sit amet</div>
              <div className={styles.topTitle}>Paket 1 </div>
            </div>
            <div>
              <div className={styles.labelDetail}>Tour Details</div>
              <div className={styles.infoDetail}>
                <div className="mb-1">Depart: 17 Juli 2023, 24 Juli 2023, 7 Agustus 2023</div>
                <div className="d-flex align-items-center">
                  <span className="me-1">
                    <Image src={airplane} alt="airplane" />
                  </span>
                  Malaysia Airlines
                </div>
              </div>
            </div>
            <div>
              <div className={styles.labelDetail}>Highlights</div>
              <ul className={styles.infoDetail}>
                <li>
                  Berpakaian khas jepang{" "}
                  <span>
                    <b>Kimono</b>
                  </span>
                </li>
                <li>
                  Berbelanja di{" "}
                  <span>
                    <b>Gotemba Premium Outlet</b>
                  </span>
                </li>
                <li>
                  Berkeliling komplek{" "}
                  <span>
                    <b>Asakusa Kannon Temple</b>{" "}
                  </span>
                  dengan becak unik khas Jepang{" "}
                  <span>
                    <b>Jinrikisha</b>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-7">
            <div className={styles.itineraryTitle}>Itinerary</div>
            {[...Array(8)].map((item, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => handleShowDetail(idx + 1)}
                  className={styles.itineraryItem}
                >
                  <div className={styles.itineraryDetail}>
                    <div className={styles.number}>{idx + 1}</div>
                    <div>Hari 0{idx + 1}: Jakarta - Kansai</div>
                  </div>
                  {expand && id === idx + 1 && (
                    <div className="p-4">
                      <div>Detail Itinerary</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
