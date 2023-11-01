import Card from "../common/Card";
import TitleSection from "../common/TitleSection";
import useTranslation from "next-translate/useTranslation";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import API from "../../common/api";
import { useState, useEffect } from "react";

export default function TourList() {
  const { t, lang } = useTranslation("common");
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    API.get("/products/v1/external/list?page=1&size=10")
      .then(response => {
        setProductData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <TitleSection title={'All Packages'} />
      <div className="mb-4">
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
          {productData.map((item, idx) => {
            return (
              <SplideSlide key={idx}>
                <Card data={item} />
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </>
  );
}
