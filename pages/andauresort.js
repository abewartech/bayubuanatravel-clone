import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import { useEffect, useState } from "react";
import resort from "./../public/assets/resort.jpg";
import useTranslation from "next-translate/useTranslation";
import API from "../src/common/api";
import Head from "next/head";

export default function AndauResort() {
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
        <title>Andau Resort - {t("about")}</title>
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
          <h2>OUR ROOM</h2>
          <h3>Andau Resort (8 unit)</h3>
          <p>3 king size room</p>
          <p>5 twin bed room</p>

          <h3>Andau Room (5 unit)</h3>
          <p>2 king size room</p>
          <p>3 twin bed room</p>

          <h3>Andau Family (5 Unit)</h3>
          <p>2 room, 4 bed</p>

          <h4>Facilities:</h4>
          <ul>
            <li>Ac | Toilet | Shower | Wastafel</li>
            <li>Terrace | Water heater</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
