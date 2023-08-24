import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import Card from "../src/components/common/Card";
import { useState } from "react";
import styles from "./../styles/pages/Gallery.module.scss";
import resort from "./../public/assets/resort.jpg";
import TitleSection from "../src/components/common/TitleSection";
export default function Gallery() {
  const [active, setActive] = useState("All");
  const [activeGallery, setActiveGallery] = useState("All");
  const breadcrumb = [
    {
      name: "Home",
    },
    {
      name: "Gallery",
    },
  ];
  const menuGallery = ["All", "Piaynemo", "Kalibiru", "Wayag"];
  const activityGallery = ["All", "Piaynemo", "Kalibiru", "Wayag"];

  const handleActive = (type, name) => {
    if (name === "activity") {
      setActiveGallery(type);
    } else {
      setActive(type);
    }
  };

  return (
    <Layout>
      <HeaderPage title="Gallery" breadcrumb={breadcrumb} background={resort} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={styles.menuGallery}>
              {menuGallery.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleActive(item, "gallery")}
                  className={`${
                    active === item ? styles.galleryItem_active : ""
                  } ${styles.galleryItem}
                  } `}
                  id={`menu-${idx + 1}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          {[...Array(8)].map((item, idx) => {
            return (
              <div key={idx} className="col-12 col-xl-3">
                <Card type="gallery" />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.activityContainer}>
        <div className="container">
          <TitleSection title="Activity" more={false} align="center" />
          <div className="row">
            <div className="col-12">
              <div className={styles.menuActivity}>
                {activityGallery.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleActive(item, "activity")}
                    className={`${
                      activeGallery === item ? styles.activityItem_active : ""
                    } ${styles.activityItem}
                  } `}
                    id={`menu-${idx + 1}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {[...Array(3)].map((item, idx) => {
              return (
                <div key={idx} className="col-12 col-xl-4">
                  <Card type="gallery" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
