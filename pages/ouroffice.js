import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import { useEffect, useState } from "react";
import resort from "./../public/assets/resort.jpg";
import useTranslation from "next-translate/useTranslation";
import API from "../src/common/api";
import Head from "next/head";

export default function About() {
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
        title="Marina Raja Ampat Office"
        breadcrumb={breadcrumb}
        background={resort}
      />
      <div className="container">
        <div className="row">
          <p>
            ESE TOUR EREAN DESTINATION
            Jl. Cakalang Komp. Pelabuhan Perikanan
            Kampung Baru, Sorong - Papua Barat Daya (98414)
          </p>
          <p>TOUR PACKAGE</p>
          <ul>
            <li>One Day Trip</li>
            <li>2D1N Kalibiru - Piaynemo</li>
            <li>3D2N Wayag, Kalibiru, Piaynemo</li>
            <li>3D2N Misool</li>
            <li>4D3N Wayag, Kalibiru, Piaynemo</li>
            <li>4D3N Misool</li>
            <li>5D4N Misool, Wayag, Piaynemo, Kalibiru</li>
            <li>6D5N Misool, Wayag, Piaynemo, Kalibiru</li>
            <li>7D6N Misool, Wayag, Piaynemo, Kalibiru</li>
            <li>Diving package, etc.</li>
          </ul>
          <p>NOTE :</p>
          <ol>
            <li>Saving time (Menghemat waktu)</li>
            <li>More comfortable (Lebih nyaman)</li>
            <li>Barbeque in the island (Benefit its only for long trip) (Barbeque di pulau - Hanya untuk paket perjalanan panjang)</li>
            <li>Close to the famous spot (Dekat dengan spot-spot terkenal)</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
