import { useState, useEffect } from "react";
import Layout from "../../src/components/Layout";
import Card from "../../src/components/common/Card";
import HeaderPage from "../../src/components/common/HeaderPage";
import MuiAlert from "@mui/material/Alert";
import resort from "./../../public/assets/resort.jpg";
import API from "../../src/common/api";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TypeDestination() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const breadcrumb = [
    {
      name: "Home"
    },
    {
      name: "Package"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/products/v1/external?page=1&size=8");
        setData(response.data); // Assuming the API response is an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <Layout>
      <HeaderPage
        title={"Packages"}
        breadcrumb={breadcrumb}
        background={resort}
      />
      <div className="container mb-5">
        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : data.length === 0 ? (
            <p>No data found</p>
          ) : (
            data.map((item, idx) => (
              <div className={"col-lg-3 col-md-6 col-12"} key={idx}>
                <Card type="common" data={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
