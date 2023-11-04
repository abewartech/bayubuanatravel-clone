import { Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import API from "../src/common/api";
import styles from "./../styles/pages/DetailPackages.module.scss";
import { useRouter } from "next/router";
export default function PrintPDF() {
  const router = useRouter();
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    const css = `
      @page {
        size: landscape;
        margin: 0;
      }
      
      table {
        page-break-inside: auto;
      }
    
      tr {
        page-break-inside: avoid;
        page-break-after: auto;
      }
    
      .break-inside {
        page-break-inside: avoid;
      }
    `;

    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");

    style.type = "text/css";
    style.media = "print";

    if ("styleSheet" in style) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
    // setTimeout(() => window.print(), 1000); //uncomment print

    const fetchProductData = async () => {
      try {
        const { id } = router.query; // Replace 'router.query' with your router configuration to get the ID
        const response = await API.get(`/products/v1/external/${id}`);
        setProductData(response.data); // Store the product data in state
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <>
      <Container>
        <Grid container spacing={2} className="mb-3">
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6" align="center">
                PERCAYA UMROH Head Office (Jakarta)
              </Typography>
              <Typography align="center">
                Ruko Dharmawangsa No 29. Jl Dharmawangsa VI Kebayoran Baru -
                Jakarta Selatan. 021-27095220
              </Typography>
              <Typography align="center">Jakarta</Typography>
              <Typography variant="h4" align="center">
                KWITANSI PEMBAYARAN
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
          <div className="mb-3 position-relative">
              <div className={styles.date}>
                <span className="me-2">
                </span>
                {productData && productData.additional_info}
              </div>
            </div>
            <div className="mb-5">
              <div className={styles.topLabel}>
                Rp. {productData && productData.base_price}
              </div>
              <div className={styles.topTitle}>
                {productData && productData.title}
              </div>
            </div>
            <div>
              <div className={styles.labelDetail}>Tour Details</div>
              <div className={styles.infoDetail}>
                <div className="mb-1">
                  Depart: 17 Juli 2023, 24 Juli 2023, 7 Agustus 2023
                </div>
                <div className="d-flex align-items-center">
                  <span className="me-1">
                  </span>
                  Malaysia Airlines
                </div>
              </div>
              <div className={styles.infoDetail}>
                <div className="mb-1">
                  {productData && productData.description}
                </div>
              </div>
            </div>
            <div>
              <div className={styles.labelDetail}>Highlights</div>
              <ul className={styles.infoDetail}>
                <li>
                  Berpakaian khas jepang{" "}
                  <span>
                    <b>Kimono</b>
                  </span>
                </li>
                <li>
                  Berbelanja di{" "}
                  <span>
                    <b>Gotemba Premium Outlet</b>
                  </span>
                </li>
                <li>
                  Berkeliling komplek{" "}
                  <span>
                    <b>Asakusa Kannon Temple</b>{" "}
                  </span>
                  dengan becak unik khas Jepang{" "}
                  <span>
                    <b>Jinrikisha</b>
                  </span>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
