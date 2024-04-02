import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import resort from "./../public/assets/resort.jpg";
import useTranslation from "next-translate/useTranslation";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import API from "../src/common/api";
import { Button } from "@mui/material";
import mandiriLogo from "./../public/assets/logo/mandiri.png";
import bniLogo from "./../public/assets/logo/bni.png";
import Image from "next/image";

export default function Terms({ serverRenderedData }) {
  const { t, lang } = useTranslation("common");
  const [data, setData] = useState(serverRenderedData);
  const breadcrumb = [
    {
      name: "Home"
    },
    {
      name: "Terms & Conditions"
    }
  ];

  useEffect(() => {
    // If data is not available, fetch it on the client side
    if (!data.length) {
      const fetchData = async () => {
        try {
          const response = await API.get("contents/v1?size=999");
          const filteredData = response.data.filter(
            (item) => item.category === "tnc"
          );
          setData(filteredData);
        } catch (error) {
          console.error("Error fetching data from the API:", error);
        }
      };

      fetchData();
    }
  }, [data]);

  return (
    <Layout>
      <HeaderPage
        title="Terms & Conditions"
        breadcrumb={breadcrumb}
        background={resort}
      />
      <Container className="mb-5">
        <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
          <Typography variant="h5" className="mb-1">
            {t("carabayar")} Bank Transfer :
          </Typography>
          <ol className="m-2">
            <li className="mt-3">
              Sisa Pelunasan Pembayaran melalui Bank Transfer dengan tujuan
              rekening milik <b>Marina Raja Ampat</b>, yaitu :
              <ul className="m-2">
                <li className="mt-4">
                  <Image src={mandiriLogo} alt="mandiriLogo" width={80} /> Bank
                  Mandiri
                </li>
                <li className="mt-4">
                  <Image src={bniLogo} alt="bniLogo" width={80} /> Bank BNI
                </li>
              </ul>
            </li>
            <li className="mt-3">
              Pilih salah satu Bank yang tertera.<br></br> Transfer pembayaran
              dilakukan sesuai dengan nominal transaksi ke nomor rekening Bank
              yang kamu pilih.
            </li>
            <li className="mt-3">
              {t("carabayar2")} <b>Marina Raja Ampat</b>.
            </li>
          </ol>
          <p className="text-center mt-4">
            (Info lebih lanjut hubungi, Tim <b>Marina Raja Ampat</b>).
          </p>
          <p className="text-center">
            <Button
              variant="contained"
              onClick={() =>
                window.open("https://wa.me/6281316776671?text=Hi", "_blank")
              }
              style={{ backgroundColor: "#feed13", color: "#0197da" }}
            >
              Hubungi Tim Marina Raja Ampat
            </Button>
          </p>
        </Paper>
      </Container>
    </Layout>
  );
}

// Server-side rendering to pass initial data
export async function getServerSideProps() {
  try {
    const response = await API.get("contents/v1?size=999");
    const filteredData = response.data.filter(
      (item) => item.category === "tnc"
    );

    return {
      props: {
        serverRenderedData: filteredData
      }
    };
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    return {
      props: {
        serverRenderedData: []
      }
    };
  }
}
