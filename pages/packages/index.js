import { useState, useEffect } from "react";
import Layout from "../../src/components/Layout";
import Card from "../../src/components/common/Card";
import HeaderPage from "../../src/components/common/HeaderPage";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import resort from "./../../public/assets/resort.jpg";
import API from "../../src/common/api";
import Pagination from "@mui/material/Pagination";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TypeDestination() {
  const router = useRouter();
  const { t, lang } = useTranslation("common");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [orderBy, setOrderBy] = useState(0); // Default ordering option

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
      const itemsPerPage = 12; // Set your items per page
      const response = await API.get(
        `/products/v1/external/list?page=${pageNumber}&size=${itemsPerPage}&title=${searchName}&order=${orderBy}`
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

  useEffect(() => {
    fetchData(1);
  }, [searchName, orderBy]);

  useEffect(() => {
    const { searchName, orderBy } = router.query;
    if (searchName) {
      setSearchName(searchName);
    }
    if (orderBy) {
      setOrderBy(orderBy);
    }
  }, [router.query]);

  return (
    <Layout>
      <HeaderPage
        title={"Packages"}
        breadcrumb={breadcrumb}
        background={resort}
      />
      <div className="container mb-5">
        <div className="row m-1">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search Name"
              variant="standard"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              size="small"
            />
            <Select
              label="Order By"
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              variant="standard"
              size="small"
            >
              <MenuItem value="0">{t("nearestdate")}</MenuItem>
              <MenuItem value="1">A-Z</MenuItem>
              <MenuItem value="2">Z-A</MenuItem>
              <MenuItem value="3">{t("lowprice")}</MenuItem>
              <MenuItem value="4">{t("highprice")}</MenuItem>
            </Select>
          </div>
        </div>

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
