import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import { styled } from "@mui/material/styles";
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
  Snackbar,
  TextField,
  Switch,
  FormControlLabel
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12
    }
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2
  }
}));
export default function DetailPackages() {
  const { t, lang } = useTranslation("common");
  const [expand, setExpand] = useState(false);
  const [id, setId] = useState(0);
  const [amountChanges, setAmountChanges] = useState(0);
  const [open, setOpen] = useState(false);
  const [errorAmount, setErrorAmount] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [productData, setProductData] = useState(null);
  const [itineraryItems, setItineraryItems] = useState(Array(8).fill(null));
  const [checkedItinerary, setCheckedItinerary] = useState(
    new Array(8).fill(true)
  );
  const [selectedItinerary, setSelectedItinerary] = useState([]);
  const [expandedItems, setExpandedItems] = useState(
    Array(itineraryItems.length).fill(false)
  );
  const [orderStatus, setOrderStatus] = useState(null);
  const [pesanError, setPesanError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(
    productData
      ? lang === "en" && productData.base_price_usd !== null
        ? productData.base_price_usd
        : productData.base_price
      : 0
  );
  const router = useRouter();

  const successPayment = () => {
    setOpenDialog(false);
    router.push("profile?menu=history");
  };

  useEffect(() => {
    let intervalId; // Define intervalId here

    const fetchData = async () => {
      setOpenSnackbar(false);
      setOpenDialog(false);
      try {
        if (transactionId) {
          const response = await API.get(`orders/v1/client/${transactionId}`);
          console.log("Response data:", response.data);
          if (response.data.status !== "INITIATED") {
            // If it's "ORDERED," stop the interval
            clearInterval(intervalId);
            setPesanError("Order Success");
            setOpenSnackbar(true);
            setOpenDialog(true);
            setOpen(false);
          }
          setOrderStatus(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setOpenSnackbar(false);
        setOpenDialog(false);
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

  const toggleExpandedItem = (idx) => {
    const updatedExpandedItems = [...expandedItems];
    updatedExpandedItems[idx] = !updatedExpandedItems[idx];
    setExpandedItems(updatedExpandedItems);
  };

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
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice +
          (productData
            ? lang === "en" && productData.product_subs[idx].price_usd !== null
              ? productData.product_subs[idx].price_usd
              : productData.product_subs[idx].price
            : 0)
      );
    } else {
      // Item is unchecked, remove it from the selectedItinerary state
      const productSubIdToRemove = productData.product_subs[idx].id; // assuming id is the product sub id
      setSelectedItinerary((prevSelected) =>
        prevSelected.filter((item) => item !== productSubIdToRemove)
      );

      const productSubsPrice = productData.product_subs.reduce(
        (acc, sub, subIdx) =>
          updatedCheckedItinerary[subIdx]
            ? acc +
              (lang === "en" && sub.price_usd !== null
                ? sub.price_usd
                : sub.price)
            : acc,
        0
      );
      setTotalPrice(productSubsPrice);
    }
  };

  const fetchProductData = async (productId) => {
    try {
      const response = await axios.get(
        `https://api.marinarajaampat.id/products/v1/external/${productId}`
      );
      setProductData(response.data.data);
      if (response.data.data && response.data.data.product_subs) {
        const updatedItineraryItems = response.data.data.product_subs.map(
          (sub) => {
            return {
              title: sub.title, // You can modify this based on your product_sub structure
              description:
                lang === "en" ? sub.description_en : sub.description_id
              // Add other properties as needed
            };
          }
        );

        setItineraryItems(updatedItineraryItems);
        const productSubIds = response.data.data.product_subs.map(
          (sub) => sub.id
        );
        setSelectedItinerary(productSubIds);
      }
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

  useEffect(() => {
    // Calculate total price whenever productData changes
    if (productData) {
      const productSubsPrice = productData.product_subs.reduce(
        (acc, sub) =>
          acc +
          (lang === "en" && sub.price_usd !== null ? sub.price_usd : sub.price),
        0
      );
      setTotalPrice(productSubsPrice);
    }
  }, [productData, lang]);

  const handleShowDetail = (id) => {
    toggleExpandedItem(id);
    // setExpand(!expand);
    setId(id);
    // // Create a new array based on the current state
    // const updatedExpandedItems = [...expandedItems];
    // // Toggle the expanded state for the clicked item
    // updatedExpandedItems[id] = !updatedExpandedItems[id];
    // // Update the state with the new array
    // setExpandedItems(updatedExpandedItems);
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
    if (productData && productData.minimum_payment) {
      const minimumPaymentPercentage = productData.minimum_payment;
      const basePrice =
        lang === "en" && productData.base_price_usd !== null
          ? productData.base_price_usd
          : productData.base_price;
      const calculatedMinimumAmount =
        (minimumPaymentPercentage / 100) * basePrice;

      setErrorAmount(e.target.value < calculatedMinimumAmount);
    }

    setAmountChanges(e.target.value);
  };

  const fetchBookingCash = async () => {
    try {
      console.log(selectedItinerary);
      const { id } = router.query;
      const payload = {
        amount: parseInt(amountChanges, 10), // Parse 'amountChanges' to an integer
        product_id: parseInt(id, 10), // Parse 'id' to an integer
        product_subs: selectedItinerary,
        voucher_code: ""
      };

      const response = await API.post("orders/v1/client", payload);

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
    if (amountChanges) {
      fetchBookingCash();
    } else {
      setPesanError(t("amountk"));
      setOpenSnackbar(true);
    }
  };

  const handlePromo = async () => {
    try {
      const response = await API.get(
        `promo/v1/ex/eligibility?promo_code=${promoCode}`
      );

      console.log("Response data:", response.data);
      if (response.data) {
        console.log("a");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const print = () => {
    const { id } = router.query;
    // const printURL = `/printpdfpackage?id=${id}`; // Replace with your URL and parameter
    if (lang === "id") {
      const printURL = `/id/printpdfpackage?id=${id}`;
      window.open(printURL, "_blank");
    } else {
      const printURL = `/printpdfpackage?id=${id}`;
      window.open(printURL, "_blank");
    }
  };

  return (
    <Layout>
      <div className="container my-4">
        <div className="row">
          <div className="col-lg-5">
            <div className="mb-3 position-relative">
              {productData && productData.image_url && (
                <Image
                  src={productData && productData.image_url}
                  alt="thumbnail"
                  className={`w-100 h-50 ${styles.img}`}
                  width={500}
                  height={200}
                />
              )}
              <div className={styles.date}>
                <span className="me-2">
                  <Image src={clock} width={10} height={10} alt="clock" />
                </span>
                {productData && productData.additional_info}
              </div>
            </div>
            <div className="mb-5">
              <div
                className={styles.topLabel}
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                {lang === "en"
                  ? `USD ${
                      (productData && productData.base_price_usd) ||
                      productData?.base_price
                    }`
                  : `Rp. ${productData && productData.base_price}`}
              </div>

              <div className={styles.topTitle}>
                {productData && productData.title}
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
            <div className="mt-2">
              <Button
                variant="contained"
                onClick={print}
                style={{ backgroundColor: "#feed13", color: "#0197da" }}
              >
                Download PDF
              </Button>
            </div>
          </div>
          <div className="col-lg-7">
            <div className={styles.itineraryTitle}>{t("itinerary")}</div>
            <p className="mb-3">{t("customize")} </p>
            {itineraryItems.map((item, idx) => {
              return (
                <div key={idx} className={styles.itineraryItem}>
                  <div className={styles.itineraryDetail}>
                    <div className={styles.number}>{idx + 1}</div>
                    <div
                      onClick={() => handleShowDetail(idx)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>{item?.title}</span>
                      <span
                        className={`${styles.arrowIcon} ${
                          expandedItems[idx] ? styles.active : ""
                        }`}
                      >
                        {expandedItems[idx] ? "▲" : "▼"}
                      </span>
                    </div>
                  </div>
                  {expandedItems[idx] && (
                    <div className="p-4">
                      <div
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      />
                      <FormControlLabel
                        control={
                          <Android12Switch
                            checked={checkedItinerary[idx]}
                            onChange={() => handleCheckboxChange(idx)}
                          />
                        }
                        label={`${t("iwill")} ${item?.title}`}
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
              );
            })}
            <div
              sx={{
                backgroundColor: "#f0f0f0", // Background color
                padding: 2, // Padding
                borderRadius: 4, // Border radius
                display: "flex", // Display as a flex container
                justifyContent: "space-between", // Space between items
                alignItems: "center" // Center vertically
              }}
            >
              <div
                sx={{
                  fontSize: 16, // Font size
                  fontWeight: 600 // Font weight
                }}
              >
                {t("totalprice")}
              </div>
              <div
                sx={{
                  fontSize: 16, // Font size
                  fontWeight: 600 // Font weight
                }}
              >
                {lang === "en" ? `USD` : `Rp.`} {totalPrice}
              </div>
            </div>
            <div id="book" className="mt-2">
              <Button
                variant="contained"
                onClick={handleBook}
                style={{ backgroundColor: "#0197da" }}
              >
                {t("booknow")}
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
              {t("continuepaying")}
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
                {lang === "en" ? `USD` : `Rp.`} {totalPrice}
              </Typography>
            </div>
          </div>
          <TextField
            error={errorAmount}
            label={t("amount")}
            type="number"
            onChange={amountChange}
            fullWidth
          />
          <Typography
            fontSize={12}
            lineHeight="16px"
            fontWeight={400}
            marginBottom={3}
            className="mt-2"
          >
            {`*${t("Jumlahminimumyangperludibayarkan")}
            ${productData && productData.minimum_payment}
            %`}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={8} md={8}>
              <TextField
                label={t("promocode")}
                variant="outlined"
                size="small"
                fullWidth
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <Button variant="outlined" onClick={handlePromo}>
                {t("usepromo")}
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="mt-2">
            <Grid item xs={12} md={6}>
              <Button variant="contained" onClick={handleMidtrans} disabled={errorAmount}>
                {t("proceedtopayment")}
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
                          {t('login')}
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
      <Dialog
        open={openDialog}
        onClose={successPayment}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("transactionsuccess")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('thankyou')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={successPayment}>Close</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
