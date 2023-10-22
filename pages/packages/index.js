import { useState, useEffect } from "react";
import Layout from "../../src/components/Layout";
import Card from "../../src/components/common/Card";
import HeaderPage from "../../src/components/common/HeaderPage";
import MuiAlert from "@mui/material/Alert";
import resort from "./../../public/assets/resort.jpg";
import API from "../../src/common/api";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TypeDestination() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const breadcrumb = [
    {
      name: "Home"
    },
    {
      name: "Package"
    }
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://user1697714815999.requestly.dev/products/v1/external?page=${page}&size=10`
      );
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const newData = response.data.data;
  
      console.log(data);
  
      // Assuming the API response is an array
      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);
  
      // Check if the new data is empty
      if (newData.length === 0) {
        setHasMore(false); // Stop infinite scrolling when there's no more data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error?.message || "An error occurred");
      setHasMore(false); // Stop infinite scrolling on error
    } finally {
      setLoading(false); // Set loading to false after data is processed
    }
  };

  useEffect(() => {
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
        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={hasMore}
          style={{
            overflow: "hidden"
          }}
        >
          <div className="row m-1">
            {error && <Alert severity="error">{error}</Alert>}
            {!loading && data.length === 0 && !error && <p>No data found</p>}
            {data.map((item, idx) => (
              <div className={"col-lg-3 col-md-6 col-12"} key={idx}>
                <Card type="common" data={item} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </Layout>
  );
}
