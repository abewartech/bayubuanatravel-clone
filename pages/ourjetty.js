import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import { useEffect, useState } from "react";
import resort from "./../public/assets/resort.jpg";
import useTranslation from "next-translate/useTranslation";
import API from "../src/common/api";
import Head from "next/head";

export default function OurJetty() {
  const [active, setActive] = useState("All");
  const { t } = useTranslation("common");
  const [data, setData] = useState([]); // State to store API response
  const breadcrumb = [
    {
      name: t("home")
    },
    {
      name: t("about")
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
        title={t("about")}
        breadcrumb={breadcrumb}
        background={resort}
      />
      <div className="container">
        <div className="row">
          <p>MARINA 05 (8-10) Ac, toilet Mesin 200Pk x 2</p>
          <p>MARINA 06 (4-6 Pax) Mesin 50Pk x 2</p>
          <p>MARINA 07 (4-6 Pax) Mesin 50Pk x 2</p>
          <p>MARINA 08 (10-18 Pax) Ac, toilet Mesin 250Pk x 3</p>
          <p>MARINA 09 (15-20Pax) Ac, toilet, Mesin 250x2 unit</p>
          <p>MARINA 10 (35-42Pax) Ac, toilet, Mesin 250x4 unit</p>
        </div>
      </div>
    </Layout>
  );
}
