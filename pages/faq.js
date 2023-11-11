import { useEffect, useState } from "react";
import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import resort from "./../public/assets/resort.jpg";
import useTranslation from "next-translate/useTranslation";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import API from "../src/common/api";

export default function Faq({ serverRenderedData }) {
  const { t, lang } = useTranslation("common");
  const [data, setData] = useState(null);

  console.log(serverRenderedData)

  const breadcrumb = [
    {
      name: "Home",
    },
    {
      name: "FAQs",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("contents/v1?size=999");
        const filteredData = response.data.filter(
          (item) => item.category === "faq"
        );
        setData(filteredData[0]);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };

    fetchData();
  }, []);

  const getContent = () => {
    if (data) {
      const content = lang === "en" ? data.contentEN : data.contentID;
      return JSON.parse(content).map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
            style={{fontWeight: 'bold', fontSize: 18}}
          >
            {item.q}
          </AccordionSummary>
          <AccordionDetails>{item.a}</AccordionDetails>
        </Accordion>
      ));
    }
    return null;
  };

  return (
    <Layout>
      <HeaderPage title="FAQs" breadcrumb={breadcrumb} background={resort} />
      <div className="container">
        <div className="row mb-5">{getContent()}</div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const response = await API.get("contents/v1?size=999");
    const filteredData = response.data.filter(
      (item) => item.category === "faq"
    );

    return {
      props: {
        serverRenderedData: filteredData[0],
      },
    };
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    return {
      props: {
        serverRenderedData: [],
      },
    };
  }
}
