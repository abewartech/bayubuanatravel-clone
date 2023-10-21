import Image from "next/image";
import Layout from "../../src/components/Layout";
import thumbnail from "./../../public/assets/gallery/1.jpg";
import clock from "./../../public/assets/icon/clock.svg";
import airplane from "./../../public/assets/icon/airplane-square.svg";
import styles from "./../../styles/pages/DetailPackages.module.scss";
import { useEffect, useState } from "react";
import { Button, Modal, Box, Typography, Grid } from "@mui/material";
import bi from "../../public/assets/bi.png";
import xendit from "../../public/assets/xendit.png";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: 4,
  p: 4
};
export default function DetailPackages() {
  const [expand, setExpand] = useState(false);
  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState(null);

  const fetchProductData = async (productId) => {
    try {
      const response = await axios.get(
        `https://api.marinarajaampat.id/products/v1/external/${productId}`
      );
      setProductData(response.data.data); // Store the product data in state
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    // When the component mounts, fetch product data for a specific ID (e.g., 1)
    fetchProductData(1); // You can replace 1 with the actual ID you want to fetch

    // ... your other useEffect code ...
  }, []);

  const handleShowDetail = (id) => {
    setExpand(!expand);
    setId(id);
  };
  const handleBook = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const fetchBookingCash = async () => {
    try {
      const response = await axios.get(
        `https://api.marinarajaampat.id/orders/v1/booking-cash`
      );
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleMidtrans = () => {
    fetchBookingCash()
    window.open(
      "https://app.midtrans.com/snap/v3/redirection/4b389d36-4f83-41ad-87ad-13cc89d0a803",
      "_blank"
    );
  };

  return (
    <Layout>
      <div className="container my-4">
        <div className="row">
          <div className="col-lg-5">
            <div className="mb-3 position-relative">
              <Image
                src={thumbnail}
                alt="thumbnail"
                className={`w-100 h-50 ${styles.img}`}
              />
              <div className={styles.date}>
                <span className="me-2">
                  <Image src={clock} width={10} height={10} alt="clock" />
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
                    <Image src={airplane} alt="airplane" />
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
          </div>
          <div className="col-lg-7">
            <div className={styles.itineraryTitle}>Itinerary</div>
            {[...Array(8)].map((item, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => handleShowDetail(idx + 1)}
                  className={styles.itineraryItem}
                >
                  <div className={styles.itineraryDetail}>
                    <div className={styles.number}>{idx + 1}</div>
                    <div>Hari 0{idx + 1}: Jakarta - Kansai</div>
                  </div>
                  {expand && id === idx + 1 && (
                    <div className="p-4">
                      <div>Detail Itinerary</div>
                    </div>
                  )}
                </div>
              );
            })}
            <div id="book">
              <Button variant="contained" onClick={handleBook}>
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none"
        }}
      >
        <Box sx={style}>
          <div
            sx={{
              backgroundColor: "#181818",
              boxShadow: 5,
              padding: 5,
              margin: 2,
              overflowY: "auto",
              height: "-webkit-fill-available"
            }}
          ></div>
          <Typography component="div">
            <Box fontSize={24} lineHeight="32px" fontWeight={500}>
              Lanjut Bayar
            </Box>

            <Box
              fontSize={12}
              marginBottom={2}
              lineHeight="16px"
              fontWeight={400}
            >
              {productData && productData.description}
            </Box>
          </Typography>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex  align-items-center">
              <Box className="me-3">
                <Image
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "15px"
                  }}
                  src={thumbnail}
                />
              </Box>
              <Box>
                <Typography
                  id="tess"
                  fontSize={16}
                  lineHeight="24px"
                  fontWeight={700}
                >
                  {productData && productData.title}
                </Typography>
                <Typography
                  fontSize={12}
                  lineHeight="16px"
                  fontWeight={400}
                  style={{
                    display: "contents"
                  }}
                >
                  {productData && productData.additional_info}
                </Typography>
              </Box>
            </div>
            <div className="d-flex">
              <Typography
                fontSize={20}
                style={{
                  clear: "both"
                }}
                lineHeight="24px"
                fontWeight={700}
              >
                Rp. {productData && productData.base_price}
              </Typography>
            </div>
          </div>
          <Typography>
            <Box fontSize={16} lineHeight="24px" fontWeight={500}>
              Email
            </Box>
          </Typography>

          <input placeholder="Masukkan email kamu" className="mb-0" />
          <Typography
            fontSize={12}
            lineHeight="16px"
            fontWeight={400}
            marginBottom={3}
          >
            *Gunakan email ini
          </Typography>
          <Typography fontSize={16} lineHeight="24px" fontWeight={700}>
            Metode Pembayaran
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Button variant="outlined" onClick={handleMidtrans}>
                Midtrans
              </Button>
            </Grid>
          </Grid>
          <Grid container id="logo-payment" className="mt-5">
            <Grid item xs={8} md={8}>
              <Typography>
                <Box fontSize="12px" lineHeight="16px">
                  Support By
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={2} md={2}>
              <img src={bi.src} alt="bi" />
            </Grid>
            <Grid item xs={2} md={2}>
              <img src={xendit.src} alt="bi" />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Layout>
  );
}
