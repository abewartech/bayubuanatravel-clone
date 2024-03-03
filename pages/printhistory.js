import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Divider
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../src/common/api";
import useTranslation from "next-translate/useTranslation";
import dayjs from "dayjs";
import numeral from "numeral";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
export default function PrintHistory() {
  const { t, lang } = useTranslation("common");
  const [orderData, setOrderData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [decodedInfo, setDecodedInfo] = useState(null);
  const [activitiesAll, setActivitiesAll] = useState([]);
  const router = useRouter();
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
    if (productData) {
      if (!window.__PRINT_STARTED__) {
        window.__PRINT_STARTED__ = true;
        setTimeout(() => window.print(), 2000);
      }
    }
  }, [productData]);

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
    setGroupedActivities(groupActivitiesByDays(filteredActivities));
  }, [activitiesAll, decodedInfo]);

  const [groupedActivities, setGroupedActivities] = useState({});

  useEffect(() => {
    const fetchOrderData = async () => {
      if (router.query.id) {
        try {
          const response = await API.get(
            `/orders/v1/client/${router.query.id}`
          );
          setOrderData(response.data);
          console.log(response.data);
          setDecodedInfo(response.data);
          // Make the second API call
          if (response.data && response.data.product_id) {
            const productResponse = await API.get(
              `/products/v1/external/${response.data.product_id}`
            );
            setProductData(productResponse.data);
            if (productResponse.data && productResponse.data.activities) {
              const activities = productResponse.data.activities;
              setActivitiesAll(activities);
            }
          }
        } catch (error) {
          console.error("Error fetching order data:", error);
        }
      }
    };

    fetchOrderData();
  }, [router.query.id]);

  return (
    <>
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
                KWITANSI PEMBAYARAN
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Kode Booking :</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{orderData && orderData.id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="right">Tanggal :</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {orderData &&
                      dayjs(orderData.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Kontak Booking :</Typography>
                </TableCell>
                <TableCell>
                  <Typography>admin@marinarajaampat.com</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="right">Status :</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {orderData && orderData.status
                      ? orderData.status === "PAID"
                        ? t("paidoff")
                        : orderData.status === "FAILED"
                        ? "Failed"
                        : t("notyet")
                      : "Status not available"}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1">Nomor Kontak :</Typography>
                </TableCell>
                <TableCell>
                  <Typography>081316776671</Typography>
                </TableCell>
                <TableCell>
                  <Typography align="right"></Typography>
                </TableCell>
                <TableCell>
                  <Typography></Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ borderBottom: "1pt solid #999999" }}>
                  <Typography variant="subtitle1">{t("pdetails")}</Typography>
                </TableCell>
                <TableCell style={{ borderBottom: "1pt solid #999999" }}>
                  <Typography>
                    <br />
                  </Typography>
                </TableCell>
                <TableCell style={{ borderBottom: "1pt solid #999999" }}>
                  <Typography>
                    <br />
                  </Typography>
                </TableCell>
                <TableCell style={{ borderBottom: "1pt solid #999999" }}>
                  <Typography>
                    <br />
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} className="mb-3 p-4">
          <div className="col-lg-8">
            <Box mb={3} sx={{ position: "relative" }}>
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
                  <Typography variant="body1">Harga dalam IDR</Typography>
                </Grid>
              </Grid>

              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                className="mt-2"
              >
                <Grid item>
                  <Typography variant="body1">{`${productData?.title}`}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {`Rp. ${numeral(productData?.base_price).format("0,0")}`}
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
                  {decodedInfo?.metadata &&
                    JSON.parse(decodedInfo?.metadata)?.adult > 0 && (
                      <Typography variant="body1">{`Adult (x${
                        JSON.parse(decodedInfo?.metadata)?.adult
                      })`}</Typography>
                    )}
                  {decodedInfo?.metadata &&
                    JSON.parse(decodedInfo?.metadata)?.child > 0 && (
                      <Typography variant="body1">{`Child (x${
                        JSON.parse(decodedInfo?.metadata)?.child
                      })`}</Typography>
                    )}
                  {decodedInfo?.metadata &&
                    JSON.parse(decodedInfo?.metadata)?.single > 0 && (
                      <Typography variant="body1">{`Single (x${
                        JSON.parse(decodedInfo?.metadata)?.single
                      })`}</Typography>
                    )}
                  {decodedInfo?.metadata &&
                    JSON.parse(decodedInfo?.metadata)?.double > 0 && (
                      <Typography variant="body1">{`Double (x${
                        JSON.parse(decodedInfo?.metadata)?.double
                      })`}</Typography>
                    )}
                  {decodedInfo?.metadata &&
                    JSON.parse(decodedInfo?.metadata)?.triple > 0 && (
                      <Typography variant="body1">{`Triple (x${
                        JSON.parse(decodedInfo?.metadata)?.triple
                      })`}</Typography>
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
                  <Typography variant="h6">Base Price</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    {`Rp. ${numeral(productData?.base_price).format("0,0")}`}
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
                    {`Rp. ${numeral(decodedInfo?.amount).format("0,0")}`}
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
                    {`Rp. ${numeral(
                      decodedInfo?.price - decodedInfo?.amount
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
                  <Typography variant="caption">{t("theremaining")}</Typography>
                </Grid>
              </Grid>

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
                  {decodedInfo?.additional_info?.selectedTourDate && (
                    <Typography variant="body2">
                      {`(${decodedInfo.additional_info.selectedTourDate})`}
                    </Typography>
                  )}
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
                {Object.entries(groupedActivities).map(([day, activities]) => (
                  <TimelineItem key={day}>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <p style={{ fontWeight: "bold" }}>Day {day}</p>
                      {activities.map((activity) => (
                        <p key={activity.activity_id}>{activity.name}</p>
                      ))}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Box>
          </div>
        </TableContainer>

        <Typography variant="h6" className="mt-4 mb-1">
          History Pembayaran
        </Typography>

        <Grid item xs={12} md={12} className="mt-1">
          {orderData &&
            orderData.OrderPayments &&
            orderData.OrderPayments.length > 0 && (
              <Timeline position="alternate">
                {orderData.OrderPayments.map((payment, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      color="text.secondary"
                    >
                      {dayjs(payment.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        {payment.status}
                      </Typography>
                      <Typography>Amount: {payment.amount}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            )}
        </Grid>
      </Container>
    </>
  );
}
