import Card from "../common/Card";
import TitleSection from "../common/TitleSection";
import useTranslation from "next-translate/useTranslation";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import API from "../../common/api";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function TourList() {
  const { t, lang } = useTranslation("common");
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products/v1/external/list?page=1&size=10")
      .then((response) => {
        setProductData(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading is set to false in case of an error
      });
  }, []);

  return (
    <>
      <TitleSection title={t('packages')} tours/>
      <div className="mb-4">
        {loading ? ( // Display loading indicator while waiting for data
          <div
            className="mb-4"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh"
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Splide
            options={{
              type: "loop",
              perPage: 4,
              pagination: false,
              gap: "1.25rem",
              fixedWidth: "calc(25% - 32px)",
              perMove: 1,
              breakpoints: {
                1024: {
                  perPage: 3,
                  fixedWidth: "calc(33% - 32px)"
                },
                992: {
                  perPage: 2,
                  fixedWidth: "calc(50% - 32px)"
                },
                640: {
                  perPage: 1,
                  fixedWidth: "calc(100% - 8rem)"
                }
              },
              autoplay: true
            }}
          >
            {productData.map((item, idx) => (
              <SplideSlide key={idx}>
                <Card data={item} />
              </SplideSlide>
            ))}
          </Splide>
        )}
      </div>
    </>
  );
}
