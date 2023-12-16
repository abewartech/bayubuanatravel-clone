import { Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import API from "../src/common/api";
import styles from "./../styles/pages/DetailPackages.module.scss";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";
export default function PrintPDF() {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const [productData, setProductData] = useState(null);
  const [itineraryItems, setItineraryItems] = useState(Array(8).fill(null));
  const [expandedItems, setExpandedItems] = useState(
    Array(itineraryItems.length).fill(false)
  );
  const [totalPrice, setTotalPrice] = useState(
    productData
      ? lang === "en" && productData.base_price_usd !== null
        ? productData.base_price_usd
        : productData.base_price
      : 0
  );
  const componentRef = useRef();
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const { id } = router.query;
        const response = await API.get(`/products/v1/external/${id}`);
        setProductData(response.data);

        if (response.data && response.data.product_subs) {
          const updatedItineraryItems = response.data.product_subs.map(
            (sub) => {
              return {
                title: sub.title,
                description:
                  lang === "en" ? sub.description_en : sub.description_id
              };
            }
          );

          setItineraryItems(updatedItineraryItems);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [router.query.id, lang]);

  useEffect(() => {
    // Calculate total price whenever productData changes
    if (productData) {
      const basePrice = 0;
      const productSubsPrice = productData.product_subs.reduce(
        (acc, sub) => acc + sub.price,
        0
      );
      setTotalPrice(basePrice + productSubsPrice);
    }

    // Check if both productData and itineraryItems are available before printing
    if (productData && itineraryItems.every((item) => item !== null)) {
      const pdf = new jsPDF();

      // Set options for html2canvas
      const options = {
        scrollY: -window.scrollY // Fixes an issue with scrolling capturing only visible content
      };

      // Capture the content with html2canvas
      html2canvas(componentRef.current, options).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Add the image to the PDF
        pdf.addImage(imgData, "PNG", 0, 0);

        // Add a new page for the table
        pdf.addPage();

        // Use autoTable to add HTML content to the PDF
        autoTable(pdf, { html: "#itinerary-table" });

        // Save the PDF
        pdf.save("document.pdf");

        const printConfirmed = window.confirm(
          "Do you want to print the document?"
        );
        if (printConfirmed) {
          window.print();
        }
      });
    }
  }, [productData, itineraryItems]);

  return (
    <div ref={componentRef}>
      <Container>
        <Grid container spacing={2} className="mb-3">
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6" align="center">
                MARINA RAJA AMPAT
              </Typography>
              <Typography align="center">
                Ruko Dharmawangsa No 29. Jl Dharmawangsa VI Kebayoran Baru -
                Jakarta Selatan. 021-27095220
              </Typography>
              <Typography align="center">Jakarta</Typography>
              <Typography variant="h4" align="center">
                {t("detailpackagetour")}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={24}>
            <div className="row">
              <div className="col-lg-5">
                <div className="mb-5">
                  <div className={styles.topTitle}>
                    {productData && productData.title}
                  </div>
                  <div style={{ fontWeight: "bold", fontSize: 18 }}>
                    {lang === "en"
                      ? `USD ${
                          (productData && productData.base_price_usd) ||
                          productData?.base_price
                        }`
                      : `Rp. ${productData && productData.base_price}`}
                  </div>
                </div>
                <div>
                  {lang === "en" ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productData?.description_en
                      }}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productData?.description_id
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-7">
                <div className={styles.itineraryTitle}>{t("itinerary")}</div>
                {itineraryItems.map((item, idx) => {
                  return (
                    <div key={idx} className={styles.itineraryItem}>
                      <div className={styles.itineraryDetail}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                        >
                          {item?.title}
                        </div>
                        <div className="p-1 mt-3">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item?.description
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
