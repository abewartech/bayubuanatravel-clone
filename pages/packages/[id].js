import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import thumbnail from "./../../public/assets/gallery/1.jpg";
import clock from "./../../public/assets/icon/clock.svg";
import airplane from "./../../public/assets/icon/airplane-square.svg";
import styles from "./../../styles/pages/DetailPackages.module.scss";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Grid,
  Container,
  Snackbar
} from "@mui/material";
import bi from "../../public/assets/bi.png";
import useTranslation from "next-translate/useTranslation";
import midtrans from "../../public/assets/midtrans.png";
import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import Link from "next/link";
import useAuthStore from "../../src/store/loginStore";
import API from "../../src/common/api";

const DynamicModal = dynamic(() => import("@mui/material/Modal"), {
  ssr: false
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: 4,
  p: 4
};
export default function DetailPackages() {
  const { t, lang } = useTranslation("common");
  const [expand, setExpand] = useState(false);
  const [id, setId] = useState(0);
  const [amountChanges, setAmountChanges] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [productData, setProductData] = useState(null);
  const [itineraryItems, setItineraryItems] = useState(Array(8).fill(null));
  const [checkedItinerary, setCheckedItinerary] = useState(
    new Array(8).fill(true)
  );
  const [selectedItinerary, setSelectedItinerary] = useState([
    ...Array(8).keys()
  ]);
  const [orderStatus, setOrderStatus] = useState(null);
  const [pesanError, setPesanError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let intervalId; // Define intervalId here

    const fetchData = async () => {
      setOpenSnackbar(false);
      try {
        if (transactionId) {
          const response = await API.get(
            `https://api.marinarajaampat.id/orders/v1/client/${transactionId}`
          );
          console.log("Response data:", response.data);
          if (response.data.status !== "INITIATED") {
            // If it's "ORDERED," stop the interval
            clearInterval(intervalId);
            setPesanError("Order Success");
            setOpenSnackbar(true);
          }
          setOrderStatus(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setOpenSnackbar(false);
      }
    };

    if (transactionId) {
      fetchData();
      intervalId = setInterval(fetchData, 5000); // Set intervalId
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [transactionId]);

  const {
    isLoggedIn,
    accessToken,
    refreshToken,
    username,
    setLoggedIn,
    setAccessToken,
    setRefreshToken,
    setUsername
  } = useAuthStore();

  const handleCheckboxChange = (idx) => {
    const updatedCheckedItinerary = [...checkedItinerary];
    updatedCheckedItinerary[idx] = !updatedCheckedItinerary[idx];
    setCheckedItinerary(updatedCheckedItinerary);

    if (updatedCheckedItinerary[idx]) {
      // Item is checked, no need to modify the selectedItinerary state
    } else {
      // Item is unchecked, remove it from the selectedItinerary state
      setSelectedItinerary((prevSelected) =>
        prevSelected.filter((item) => item !== idx)
      );
    }
  };

  const fetchProductData = async (productId) => {
    try {
      const response = await axios.get(
        `https://api.marinarajaampat.id/products/v1/external/${productId}`
      );
      setProductData(response.data.data); // Store the product data in state
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    // When the component mounts, fetch product data for a specific ID (e.g., 1)
    const { id } = router.query;

    fetchProductData(id); // You can replace 1 with the actual ID you want to fetch

    // ... your other useEffect code ...
  }, []);

  const handleShowDetail = (id) => {
    setExpand(!expand);
    setId(id);
  };
  const handleBook = () => {
    if (isLoggedIn) {
      setOpen(true);
    } else {
      setOpenModalLogin(true);
    }
  };
  const handleCloseLogin = () => setOpenModalLogin(false);
  const handleClose = () => setOpen(false);

  const amountChange = (e) => {
    setAmountChanges(e.target.value);
  };

  const fetchBookingCash = async () => {
    try {
      console.log(selectedItinerary);
      const { id } = router.query;
      const payload = {
        amount: parseInt(amountChanges, 10), // Parse 'amountChanges' to an integer
        product_id: parseInt(id, 10), // Parse 'id' to an integer
        product_subs: [],
        voucher_code: ""
      };

      const response = await API.post(
        "https://api.marinarajaampat.id/orders/v1/client",
        payload
      );

      // Handle the response data here
      console.log("Response data:", response.data);
      if (response.data) {
        setTransactionId(response.data.order.id);
        window.open(`${response.data.link.redirect_url}`, "_blank");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleMidtrans = () => {
    fetchBookingCash();
    // window.open(
    //   "https://app.midtrans.com/snap/v3/redirection/4b389d36-4f83-41ad-87ad-13cc89d0a803",
    //   "_blank"
    // );
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
            {itineraryItems.map((item, idx) => {
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
                  <input
                    type="checkbox"
                    checked={checkedItinerary[idx]}
                    onChange={() => handleCheckboxChange(idx)}
                    style={{
                      marginLeft: "10px", // Adjust the spacing as needed
                      verticalAlign: "middle" // Align the checkbox with text
                    }}
                  />
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
                  alt="productThumb"
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
              Amount
            </Box>
          </Typography>

          <input
            placeholder="Masukkan amount"
            className="mb-0"
            type="number"
            onChange={amountChange}
          />
          <Typography
            fontSize={12}
            lineHeight="16px"
            fontWeight={400}
            marginBottom={3}
          >
            *Jumlah minimum yang perlu dibayarkan adalah Rp.{" "}
            {productData && productData.minimum_payment}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Button variant="outlined" onClick={handleMidtrans}>
                Lanjut ke Pembayaran
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
              <img src={midtrans.src} alt="bi" />
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <DynamicModal
        open={openModalLogin}
        onClose={handleCloseLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container
            maxWidth="sm"
            sx={{ height: "65vh", display: "flex", alignItems: "center" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Typography>
                  <Box fontSize={32} fontWeight={600}>
                    {t("login")}
                  </Box>
                  <Box fontSize={12} fontWeight={400} lineHeight="16px">
                    {t("welcomeback")}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    API.post("/users/v1/login", values)
                      .then((res) => {
                        setSubmitting(false);
                        setAccessToken(res.data.access_token);
                        setRefreshToken(res.data.refresh_token);
                        setUsername(values.email.split("@")[0]);
                        setOpen(true);
                        setOpenModalLogin(false);
                        setLoggedIn(true);
                      })
                      .catch((error) => {
                        console.error(error);
                        setSubmitting(false);
                      });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                  }) => (
                    <form
                      sx={{ margin: 10, height: "40px" }}
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit}
                    >
                      <Typography
                        fontSize={16}
                        fontWeight={500}
                        marginBottom={1}
                        lineHeight="24px"
                      >
                        Email
                      </Typography>
                      <Field
                        type="text"
                        name="email"
                        placeholder="Your Email"
                      />
                      <ErrorMessage name="email" component="div" />

                      <Typography
                        fontSize={16}
                        fontWeight={500}
                        marginBottom={1}
                        lineHeight="24px"
                      >
                        Password
                      </Typography>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Your Password"
                      />
                      <ErrorMessage name="password" component="div" />

                      <div
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          marginTop: 1
                        }}
                      >
                        <a color="textPrimary" href="forgot-password" replace>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            {t("forgot")}
                          </Typography>
                        </a>
                      </div>
                      <div
                        id="btn-login"
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          marginTop: 16
                        }}
                      >
                        <Button type="submit" disabled={isSubmitting}>
                          Login
                        </Button>
                      </div>
                      <div
                        id="btn-regist"
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start"
                        }}
                      >
                        {t("dont")}
                        <Link href="/register" passHref>
                          <Button>{t("register")}</Button>
                        </Link>
                      </div>
                    </form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DynamicModal>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        message={pesanError}
        onClose={() => setOpenSnackbar(false)}
      />
    </Layout>
  );
}
