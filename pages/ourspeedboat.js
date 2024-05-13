import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import { useEffect, useState } from "react";
import resort from "./../public/assets/resort.jpg";
import useTranslation from "next-translate/useTranslation";
import API from "../src/common/api";
import bg1 from "./../public/image/qw.jpeg";
import bg2 from "./../public/image/qw2.jpeg";
import bg3 from "./../public/image/qw3.jpeg";
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
      name: "Our Speedboat"
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
        title={"Our Speedboat"}
        breadcrumb={breadcrumb}
        background={resort}
      />
      <div className="container">
        <div className="row">
          <div className="col-8">
            <TitleSection title="Marina Speedboat" more={false} />
            <h5 className="mt-3 mb-4">
              Enjoy the freedom of private speedboat with various capacity
              options that can be tailored to your needs.
            </h5>
          </div>
          <div className="col-4 align-self-end mb-4">
            <div className="d-flex justify-content-end">
              <Link
                href={`https://wa.me/6281316776671?text=Hi%2C%20${
                  lang === "en"
                    ? "I want to inquire about Marina Speedboat"
                    : "Saya ingin menanyakan detail terkait Marina Speedboat"
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
            <Image src={bg2} className="img-fluid mb-3" />
          </div>
          {/* <h1>our speedboat</h1>
          <p>
            MARINA SPEED BOAT
            <ol>
              <li>MARINA 01 (10-18 Pax) Ac, toilet, Mesin 200x2 unit</li>
              <li>MARINA 02 (10-18 Pax) Ac, toilet, Mesin 150x2 unit</li>
              <li>MARINA 03 (10-18 Pax) Ac, toilet, Mesin 200x2 unit</li>
              <li>MARINA 47 (5-8 Pax) Ac, toilet, Mesin 115x2 unit</li>
              <li>MARINA 05 (10 Pax) Ac, toilet, Mesin 200x2 unit</li>
              <li>MARINA 06 (4-6 Pax) Mesin 50x2 unit</li>
              <li>MARINA 07 (4-6 Pax) Mesin 50x2 unit</li>
              <li>MARINA 08 (20-30 Pax) Ac, toilet, Mesin 250x3 unit</li>
              <li>MARINA 09 (15-20Pax) Ac, toilet, Mesin 250x2 unit</li>
              <li>MARINA 10 (35-42Pax) Ac, toilet, Mesin 250x4 unit</li>
            </ol>
          </p> */}
        </div>
      </div>
    </Layout>
  );
}
