import Image from "next/image";
import Layout from "../../src/components/Layout";
import thumbnail from "./../../public/assets/gallery/1.jpg";
import clock from "./../../public/assets/icon/clock.svg";
import airplane from "./../../public/assets/icon/airplane-square.svg";
import styles from "./../../styles/pages/DetailPackages.module.scss";
import { useState } from "react";
import { Button, Modal, Box, Typography, Grid } from "@mui/material";
import bi from "../../public/assets/bi.png";
import xendit from "../../public/assets/xendit.png";

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
  p: 4,
};
export default function DetailPackages() {
  const [expand, setExpand] = useState(false);
  const [id, setId] = useState(0);
  const [open, setOpen] = useState(false);
  const handleShowDetail = (id) => {
    setExpand(!expand);
    setId(id);
  };
  const handleBook = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
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
                4 Days & 3 Nights
              </div>
            </div>
            <div className="mb-5">
              <div className={styles.topLabel}>Lorem ipsum doler sit amet</div>
              <div className={styles.topTitle}>Paket 1 </div>
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
          border: "none",
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
              height: "-webkit-fill-available",
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
              Lorem ipsum
            </Box>
          </Typography>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex  align-items-center">
              <Box className="me-3">
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "15px",
                  }}
                  src="./fotoprofile/default.png"
                />
              </Box>
              <Box>
                <Typography
                  id="tess"
                  fontSize={16}
                  lineHeight="24px"
                  fontWeight={700}
                >
                  Paket 1
                </Typography>
                <Typography
                  fontSize={12}
                  lineHeight="16px"
                  fontWeight={400}
                  style={{
                    display: "contents",
                  }}
                >
                  4 Days & 3 Nights
                </Typography>
              </Box>
            </div>
            <div className="d-flex">
              <Typography
                fontSize={20}
                style={{
                  clear: "both",
                }}
                lineHeight="24px"
                fontWeight={700}
              >
                Rp. 500.000
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
          <Grid container id="logo-payment">
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
