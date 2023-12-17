import Image from "next/image";
import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import TitleSection from "../src/components/common/TitleSection";
import styles from "./../styles/pages/About.module.scss";
import thumb from "./../public/assets/thumb.png";
import Client from "../src/components/common/Client";
import { useEffect, useState } from "react";
import resort from "./../public/assets/resort.jpg";
import Card from "../src/components/common/Card";
import useTranslation from "next-translate/useTranslation";
import API from "../src/common/api";
import Head from "next/head";
export default function About() {
  const [active, setActive] = useState("All");
  const { t, lang } = useTranslation("common");
  const [data, setData] = useState([]); // State to store API response
  const breadcrumb = [
    {
      name: t("home")
    },
    {
      name: t("about")
    }
  ];

  const oneStopServices = [
    t("all"),
    "Marina Star Resto",
    "Jetty Marina Star",
    "Speed Boat"
  ];
  const handleActive = (menu) => {
    setActive(menu);
  };

  useEffect(() => {
    // Define a function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await API.get("contents/v1?size=999");
        const filteredData = response.data.filter(
          (item) => item.category === "about-us"
        );
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts
  return (
    <Layout>
      <Head>
        <title>Marina Raja Ampat - {t("about")}</title>
        <meta
          name="description"
          content="Is a company that handles Raja Ampat tourism, from arrival to departure to your hometown. Once again, we also have complete services to meet your Raja Ampat tourism needs."
        />
      </Head>
      <HeaderPage
        title={t("about")}
        breadcrumb={breadcrumb}
        background={resort}
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className={styles.wrap}>
              <TitleSection title="Marina Raja Ampat" more={false} />
              <div className={styles.desc}>
                {data.length > 0 ? (
                  data.map((item) => (
                    <div key={item.id}>
                      {lang === "en" ? item.contentEN : item.contentID}
                    </div>
                  ))
                ) : (
                  <div>{t("company")}</div>
                )}
              </div>

              <div className={styles.cta}>
                <button>{t("contactus")}</button>
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
      {/* <div className={styles.services}>
        <div className="container">
          <div className="row">
            <TitleSection
              title={t('service')}
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
      </div> */}
      <div className="container">
        <div className="row">
          <Client />
        </div>
      </div>
    </Layout>
  );
}
