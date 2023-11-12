import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import resort from "./../public/assets/resort.jpg";
import useTranslation from "next-translate/useTranslation";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import API from "../src/common/api";

// ... (import statements)

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
          <Typography variant="h4" className="mb-1">Travel Terms & Conditions</Typography>
          {data.map((item) => (
            <div key={item.id}>
              {lang === "en" ? (
                item.contentType === "html" && item.contentEN ? (
                  <div dangerouslySetInnerHTML={{ __html: item?.contentEN }} />
                ) : (
                  item.contentEN
                )
              ) : item.contentType === "html" ? (
                <div dangerouslySetInnerHTML={{ __html: item?.contentID }} />
              ) : (
                item.contentID
              )}
            </div>
          ))}
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
