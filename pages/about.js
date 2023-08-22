import Image from "next/image";
import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import TitleSection from "../src/components/common/TitleSection";
import styles from "./../styles/pages/About.module.scss";
import thumb from "./../public/assets/thumb.png";
import Client from "../src/components/common/Client";
import { useState } from "react";
import resort from "./../public/assets/resort.jpg";
import Card from "../src/components/common/Card";
export default function About() {
  const [active, setActive] = useState("All");
  const breadcrumb = [
    {
      name: "Home",
    },
    {
      name: "About",
    },
  ];
  const oneStopServices = [
    "All",
    "Marina Star Resto",
    "Jetty Marina Star",
    "Speed Boat",
  ];
  const handleActive = (menu) => {
    setActive(menu);
  };
  return (
    <Layout>
      <HeaderPage title="About" breadcrumb={breadcrumb} background={resort} />
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className={styles.wrap}>
              <TitleSection title="Marina Raja Ampat" more={false} />
              <div className={styles.desc}>
                Perusahaan yang menangani perjalan wisata raja ampat, mulai dari
                kedatangan sampai keberangkatan ke kota asal Kembali, kami juga
                memiliki pelayanan lengkap untuk memenuhi kebutuhan anda untuk
                perjalanan raja ampat.
              </div>
              <div className={styles.cta}>
                <button>Kontak Kami</button>
              </div>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-2">
            <div className={styles.img}>
              <Image src={thumb} alt="thumb" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.services}>
        <div className="container">
          <div className="row">
            <TitleSection
              title="One Stop Services"
              align="center"
              more={false}
            />
            <div className="col-12">
              <div className={styles.menuWrap}>
                {oneStopServices.map((item, idx) => (
                  <div
                    onClick={() => handleActive(item)}
                    className={`${styles.menuItem} ${
                      active === item ? styles.menuItem_active : ""
                    }`}
                    key={idx}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {[...Array(4)].map((item, idx) => {
              return (
                <div key={idx} className="col-12 col-xl-3">
                  <Card type="gallery" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <Client />
        </div>
      </div>
    </Layout>
  );
}
