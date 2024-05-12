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
import Typography from "@mui/material/Typography";
import Link from "next/link";

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
          content="is a field operator providing a diverse range of tour services since 2019. Our office is strategically located to facilitate easy access for guests to visit and obtain further information. In addition to tour services, we offer a wide array of facilities, including a restaurant, speedboat dock, speedboat rentals, and a privately managed island for relaxation. With well-maintained and comprehensive facilities, along with experienced and professional staff, we are committed to providing you with the best service and an unforgettable holiday experience in Raja Ampat."
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
          <div className="col-lg-10">
            <div className={styles.whyUs}>
              <TitleSection title="WHY US ?" more={false} />
              <Typography paragraph className="mt-3">
                <Link href="/ouroffice" style={{ textDecoration: "none" }}>
                  <strong>1. Our Office</strong>
                </Link>
                <br />
                We have a physical office that you can visit for inquiries and
                assistance.
              </Typography>
              <Typography paragraph>
                <Link href="/ourrestaurant" style={{ textDecoration: "none" }}>
                  <strong>2. Our Restaurant</strong>
                </Link>
                <br />
                Marina Star Restaurant offers delicious food and a beautiful
                seaside view, making it an ideal meeting point before embarking
                on your Raja Ampat Journey
              </Typography>
              <Typography paragraph>
                <Link href="/ourspeedboat" style={{ textDecoration: "none" }}>
                  <strong>3. Our Speedboat</strong>
                </Link>
                <br />
                Enjoy the freedom of private speedboat with various capacity
                options that can be tailored to your needs.
              </Typography>
              <Typography paragraph>
                <Link href="/ourjetty" style={{ textDecoration: "none" }}>
                  <strong>4. Our Private Jetty</strong>
                </Link>
                <br />
                We have a secure private jetty that ensures safe boarding onto
                the speedboat
              </Typography>
              <Typography paragraph>
                <Link href="/andauisland" style={{ textDecoration: "none" }}>
                  <strong>5. Andau Island</strong>
                </Link>
                <br />
                Experience the exclusivity of Andau Island, privately managed
                and located in the Fam Islands, Raja Ampat, just a 15 minute
                distance from the famous tourist spot, Piaynemo.
              </Typography>
              <Typography paragraph>
                <Link href="/andauresort" style={{ textDecoration: "none" }}>
                  <strong>6. Andau Resort</strong>
                </Link>
                <br />
                Relax in comfortable accommodations at Andau Resort, equipped
                with modern amenities such as 24-hour electricity, WiFi, clean
                water, air conditioning, hot water, and mesmerizing ocean views
                with pristine white sandy beaches.
              </Typography>
              <Typography paragraph className="mb-3 mt-1">
                At Marina Raja Ampat, we take pride in offering excellent
                services and creating unforgettable memories for our guests.
                Choose us for an extraordinary journey through the stunning
                beauty of Raja Ampat.
              </Typography>
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
      <div className="container mt-4">
        <div className="row">
          <Client />
        </div>
      </div>
    </Layout>
  );
}
