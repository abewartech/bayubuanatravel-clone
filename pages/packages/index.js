import { useState, useEffect } from "react";
import Layout from "../../src/components/Layout";
import Card from "../../src/components/common/Card";
import HeaderPage from "../../src/components/common/HeaderPage";
import MuiAlert from "@mui/material/Alert";
import resort from "./../../public/assets/resort.jpg";
import API from "../../src/common/api";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import useTranslation from "next-translate/useTranslation";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TypeDestination() {
  const { t, lang } = useTranslation("common");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10; // Number of items to display per page

  const breadcrumb = [
    {
      name: t("home")
    },
    {
      name: t("packages")
    }
  ];

  const fetchData = async (pageNumber) => {
    try {
      const itemsPerPage = 10; // Set your items per page
      const response = await API.get(
        `/products/v1/external/list?page=${pageNumber}&size=${itemsPerPage}`
      );

      const newData = response.data;

      // Assuming the API response is an array
      setData(newData);
      setPage(pageNumber);
      // Calculate the total number of pages
      const totalItems = response.totalData.total; // Assuming "total" is the total number of items
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error?.message || "An error occurred");
    } finally {
      setLoading(false); // Set loading to false after data is processed
    }
  };

  const handlePageChange = (event, pageNumber) => {
    fetchData(pageNumber);
  };

  useEffect(() => {
    fetchData(1);
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <Layout>
      <HeaderPage
        title={"Packages"}
        breadcrumb={breadcrumb}
        background={resort}
      />
      <div className="container mb-5">
        <div className="row m-1">
          {error && <Alert severity="error">{error}</Alert>}
          {!loading && data.length === 0 && !error && <p>No data found</p>}
          {data.map((item, idx) => (
            <div className={"col-lg-3 col-md-6 col-12"} key={idx}>
              <Card type="common" data={item} />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
}
