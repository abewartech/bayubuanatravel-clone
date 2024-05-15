import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import { useEffect, useState } from "react";
import resort from "./../public/assets/resort.jpg";
import image from "./../public/image/cb9a6f0c-7c93-4c78-9a34-7179d26c3873.jpg";
import bg from "./../public/image/IMG_1874.jpg";
import useTranslation from "next-translate/useTranslation";
import API from "../src/common/api";
import Head from "next/head";
import Image from "next/image";
import TitleSection from "../src/components/common/TitleSection";
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
      name: "Our Retaurant"
    }
  ];

  const handleActive = (menu) => {
    setActive(menu);
  };

  useEffect(() => {
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

    fetchData();
  }, []);

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
        title={"Our Restaurant"}
        breadcrumb={breadcrumb}
        background={bg}
      />
      <div className="container">
        <div className="row ">
          <div className="col-8">
            <TitleSection title="Marina Star Sorong" more={false} />
            <h5 className="mt-3 mb-4">
              Marina Star Restaurant offers delicious food and a beautiful
              seaside view, making it an ideal meeting point before embarking on
              your Raja Ampat Journey
            </h5>
          </div>
          <div className="col-4 align-self-end mb-4">
            <div className="d-flex justify-content-end">
              <Link
                href={`https://wa.me/6281316776671?text=Hi%2C%20${
                  lang === "en"
                    ? "I want to inquire about Marina Star"
                    : "Saya ingin menanyakan detail terkait Marina Star"
                }`}
              >
                <button
                  style={{
                    border: "none",
                    backgroundColor: "#01B7F2",
                    color: "#fff",
                    padding: "12px 32px"
                  }}
                >
                  {t("contactus")}
                </button>
              </Link>
            </div>
          </div>
          <Image src={image} className="img-fluid mb-3" />
          {/* <p>OPEN HOURS: 6 AM - 11 PM</p>
          <p>Capacity:</p>
          <ul>
            <li>Lt1: 250 Pax Ruangan VIP</li>
            <li>Lt2: 150 Pax Ruangan VIP</li>
          </ul>
          <p>Guest house:</p>
          <ul>
            <li>King size room: 2 Room</li>
            <li>Twin room: 2 Room</li>
          </ul> */}
        </div>
      </div>
    </Layout>
  );
}
