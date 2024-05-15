import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import { useEffect, useState } from "react";
import resort from "./../public/assets/resort.jpg";
import andauImage from "./../public/assets/andau/DJI_0701.JPG";
import bg1 from "./../public/image/andau1.jpeg";
import bg2 from "./../public/image/andau2.jpeg";
import bg3 from "./../public/image/andau3.jpeg";
import image1 from "./../public/image/20230722_190113.jpg";
import image2 from "./../public/image/20230722_191322.jpg";
import image3 from "./../public/image/20230722_203051.jpg";
import image4 from "./../public/image/20230722_222819.jpg";
import image5 from "./../public/image/andau_restaurant.jpg";
import image6 from "./../public/image/gazebo.jpg";
import andauImage2 from "./../public/assets/andau/DJI_0701.JPG";
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
      name: "Andau Island Raja Ampat"
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
        <title>ANDAU RESORT RAJA AMPAT - {t("about")}</title>
        <meta
          name="description"
          content="Andau Vetty is a field operator providing a diverse range of tour services since 2019. Our office is strategically located to facilitate easy access for guests to visit and obtain further information. In addition to tour services, we offer a wide array of facilities, including a restaurant, speedboat dock, speedboat rentals, and a privately managed island for relaxation. With well-maintained and comprehensive facilities, along with experienced and professional staff, we are committed to providing you with the best service and an unforgettable holiday experience in Raja Ampat."
        />
      </Head>
      <HeaderPage
        title={"Andau Island Raja Ampat"}
        breadcrumb={breadcrumb}
        background={andauImage}
      />
      <div className="container">
        <div className="row">
          <div className="col-8">
            <TitleSection title="Andau Island Raja Ampat" more={false} />
            <h5 className="mt-3 mb-4">
              Experience the exclusivity of Andau Island, privately managed and
              located in the Fam Islands, Raja Ampat, just a 15 minute distance
              from the famous tourist spot, Piaynemo.
            </h5>
          </div>
          <div className="col-4 align-self-end mb-4">
            <div className="d-flex justify-content-end">
              <Link
                href={`https://wa.me/6281316776671?text=Hi%2C%20${
                  lang === "en"
                    ? "I want to inquire about Andau Island"
                    : "Saya ingin menanyakan detail terkait Pulau Andau"
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
          {/* <iframe src="https://drive.google.com/file/d/1G8m6M5zwABWsAXIKH5zJHFbkJq-X0JUi/preview" width="640" height="480" allow="autoplay"></iframe> */}
          <div className="col-md-4">
            {" "}
            <Image src={bg1} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            {" "}
            <Image src={bg3} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            {" "}
            <Image src={bg2} className="img-fluid mb-5" />
          </div>
          <div className="col-md-4">
            <Image src={image1} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            <Image src={image2} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            <Image src={image3} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            <Image src={image4} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            <Image src={image5} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            <Image src={image6} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            <Image src={andauImage2} className="img-fluid mb-3" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
