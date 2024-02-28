// pages/detailorder.js
import React, { useEffect, useState } from "react";
import Layout from "../src/components/Layout";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Grid,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses
} from "@mui/lab/TimelineOppositeContent";
import { useRouter } from "next/router";
import BackIcon from "@mui/icons-material/ArrowBack";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import numeral from "numeral";
import Card from "../src/components/common/Card";
import API from "../src/common/api";

const DetailOrder = () => {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const [decodedInfo, setDecodedInfo] = useState(null);
  const [productData, setProductData] = useState(null);
  const [itineraryItems, setItineraryItems] = useState(Array(8).fill(null));
  const [selectedItinerary, setSelectedItinerary] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [pesanError, setPesanError] = useState("");
  const [activitiesAll, setActivitiesAll] = useState([]);

  useEffect(() => {
    const sanitizedId = router.query.id?.replace(/\s/g, "");

    try {
      const decodedId = decodeURIComponent(atob(sanitizedId || ""));
      const decodedData = JSON.parse(decodedId);

      setDecodedInfo(decodedData);
      fetchProductData(decodedData.product_id);
      setPromoCode(decodedData.voucher_code);
    } catch (error) {
      console.error("Error decoding ID:", error);
    }
  }, [router.query.id]);

  useEffect(() => {
    let intervalId; // Define intervalId here

    const fetchData = async () => {
      setOpenSnackbar(false);
      setOpenDialog(false);
      try {
        if (transactionId) {
          const response = await API.get(`orders/v1/client/${transactionId}`);
          if (response.data.status !== "INITIATED") {
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

  const handleBack = () => {
    router.back(); // Go back to the previous page
  };

  const successPayment = () => {
    setOpenDialog(false);
    router.push("/profile?menu=history");
  };

  const groupActivitiesByDays = (activities) => {
    const groupedActivities = {};
    activities.forEach((activity) => {
      const { activity_days } = activity;
      if (!groupedActivities[activity_days]) {
        groupedActivities[activity_days] = [];
      }
      groupedActivities[activity_days].push(activity);
    });
    return groupedActivities;
  };

  useEffect(() => {
    const filteredActivities = activitiesAll.filter((activity) =>
      decodedInfo?.activities.includes(activity.activity_id)
    );
    console.log(filteredActivities);
    setGroupedActivities(groupActivitiesByDays(filteredActivities));
  }, [activitiesAll, decodedInfo]);

  const [groupedActivities, setGroupedActivities] = useState({});

  const fetchProductData = async (productId) => {
    try {
      const response = await axios.get(
        `https://api.marinarajaampat.id/products/v1/external/${productId}`
      );
      setProductData(response.data.data);
      if (response.data.data && response.data.data.activities) {
        const updatedItineraryItems = response.data.data.activities.map(
          (sub) => {
            return {
              title: sub.name, // You can modify this based on your product_sub structure
              description:
                lang === "en" ? sub.description_en : sub.description_id
              // Add other properties as needed
            };
          }
        );

        if (response.data.data && response.data.data.activities) {
          const activities = response.data.data.activities;
          setActivitiesAll(activities);
        }

        setItineraryItems(updatedItineraryItems);
        const productSubIds = response.data.data.activities.map(
          (sub) => sub.activity_id
        );
        setSelectedItinerary(productSubIds);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleApplyPromoCode = () => {
    // Add logic to apply the promo code
    console.log("Promo code applied:", promoCode);
  };

  const handlePayment = async () => {
    try {
      const stringifiedMetadata = JSON.stringify(decodedInfo.metadata);
      const stringifiedAddtionalInfo = JSON.stringify(
        decodedInfo.additional_info
      );
      const response = await API.post("orders/v1/client", {
        ...decodedInfo,
        additional_info: stringifiedAddtionalInfo,
        metadata: stringifiedMetadata
      });

      if (response.data) {
        setTransactionId(response.data.order.id);
        window.open(`${response.data.link.redirect_url}`, "_blank");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <Layout>
      <Box sx={{ my: 4 }}>
        <div className="container">
          <div className="row">
            {/* Back Button */}
            <div className="col-lg-1 mb-4">
              <IconButton onClick={handleBack} aria-label="back">
                <BackIcon />
              </IconButton>
            </div>

            {/* Title */}
            <div className="col-lg-11 mb-4">
              <Typography variant="h5" textAlign="center">
                Order Details
              </Typography>
            </div>

            {/* Detail Package & Summary Price */}
            <div className="col-lg-8">
              <Box mb={3} sx={{ position: "relative" }}>
                {/* Add your detail package content here */}
                {/* For example: */}
                {/* <Typography variant="h6">Promo Kode Voucher</Typography>
                <TextField
                  fullWidth
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={handleApplyPromoCode} variant="text">
                          Apply
                        </Button>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Masukan Kode Voucher"
                /> */}
                <Divider />

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className="mt-4"
                >
                  <Grid item>
                    <Typography variant="h6">{t("cost")}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      Harga dalam {lang === "en" ? `USD` : `IDR`}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className="mt-2"
                >
                  <Grid item>
                    <Typography variant="body1">{`${decodedInfo?.additional_info.product_name}`}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {lang === "en"
                        ? `USD ${numeral(decodedInfo?.totalPriceFix).format(
                            "0,0.00"
                          )}`
                        : `Rp. ${numeral(decodedInfo?.totalPriceFix).format(
                            "0,0"
                          )}`}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className="mt-2"
                >
                  <Grid item>
                    {decodedInfo?.metadata.adult > 0 && (
                      <Typography variant="body1">{`Adult (x${decodedInfo?.metadata.adult})`}</Typography>
                    )}
                    {decodedInfo?.metadata.child > 0 && (
                      <Typography variant="body1">{`Child (x${decodedInfo?.metadata.child})`}</Typography>
                    )}
                    {decodedInfo?.metadata.single > 0 && (
                      <Typography variant="body1">{`Single (x${decodedInfo?.metadata.single})`}</Typography>
                    )}
                    {decodedInfo?.metadata.double > 0 && (
                      <Typography variant="body1">{`Double (x${decodedInfo?.metadata.double})`}</Typography>
                    )}
                    {decodedInfo?.metadata.triple > 0 && (
                      <Typography variant="body1">{`Triple (x${decodedInfo?.metadata.triple})`}</Typography>
                    )}
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className="mt-2"
                >
                  <Grid item>
                    <Typography variant="h6">{t("total")}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      {lang === "en"
                        ? `USD ${numeral(decodedInfo?.totalPriceFix).format(
                            "0,0.00"
                          )}`
                        : `Rp. ${numeral(decodedInfo?.totalPriceFix).format(
                            "0,0"
                          )}`}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className="mt-4"
                >
                  <Grid item>
                    <Typography variant="h6">{t("total")}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      {lang === "en"
                        ? `USD ${numeral(decodedInfo?.amount).format("0,0.00")}`
                        : `Rp. ${numeral(decodedInfo?.amount).format("0,0")}`}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className="mt-3"
                >
                  <Grid item>
                    <Typography variant="body1">{t("remaining")}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">
                      {lang === "en"
                        ? `USD ${numeral(
                            decodedInfo?.totalPriceFix - decodedInfo?.amount
                          ).format("0,0.00")}`
                        : `Rp. ${numeral(
                            decodedInfo?.totalPriceFix - decodedInfo?.amount
                          ).format("0,0")}`}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className="mt-3"
                >
                  <Grid item>
                    <Typography variant="caption">
                      {t("theremaining")}
                    </Typography>
                  </Grid>
                </Grid>

                {/* {decodedInfo && (
                  <div>
                    <Typography variant="h6">Decoded Information:</Typography>
                    <pre>{JSON.stringify(decodedInfo, null, 2)}</pre>
                  </div>
                )} */}

                <Divider className="mt-4 border" />

                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  className="mt-3"
                >
                  <Grid item>
                    <Typography variant="h6" className="text-center">
                      Trip Summary
                    </Typography>
                    <Typography variant="body2">{`(${decodedInfo?.additional_info.selectedTourDate})`}</Typography>
                  </Grid>
                </Grid>

                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0
                    }
                  }}
                >
                  {Object.entries(groupedActivities).map(
                    ([day, activities]) => (
                      <TimelineItem key={day}>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <p>Day {day}</p>
                          {activities.map((activity) => (
                            <p key={activity.activity_id}>{activity.name}</p>
                          ))}
                        </TimelineContent>
                      </TimelineItem>
                    )
                  )}
                </Timeline>
              </Box>
            </div>

            {/* Detail Price & Voucher Field */}
            <div className="col-lg-4">
              <Box mb={3}>
                {productData && <Card type="common" data={productData} />}
                <Divider variant="middle" />
                <Typography variant="h6">
                  DP |{" "}
                  {lang === "en"
                    ? `USD ${numeral(decodedInfo?.amount).format("0,0.00")}`
                    : `Rp. ${numeral(decodedInfo?.amount).format("0,0")}`}
                </Typography>
                <div className="row">
                  <div className="col">
                    <Typography
                      variant="h6"
                      style={{ color: "#F26F49", fontWeight: "bold" }}
                    >
                      Total Bayar |{" "}
                      {lang === "en"
                        ? `USD ${numeral(decodedInfo?.totalPriceFix).format(
                            "0,0.00"
                          )}`
                        : `Rp. ${numeral(decodedInfo?.totalPriceFix).format(
                            "0,0"
                          )}`}
                    </Typography>
                  </div>
                </div>

                <Button
                  className="mt-2"
                  variant="contained"
                  onClick={handlePayment}
                >
                  {t("proceedtopayment")}
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </Box>
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
            {t("thankyou")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={successPayment}>Close</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default DetailOrder;
