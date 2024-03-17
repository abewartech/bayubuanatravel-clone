import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./Profile.module.scss";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
  Table,
  TableBody,
  TableRow,
  IconButton,
  TableCell,
  TextField
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import Pagination from "@mui/material/Pagination";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import CloseIcon from "@mui/icons-material/Close";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import API from "../../common/api";
import numeral from "numeral";
import calendar from "./calendar.svg";
import dayjs from "dayjs";
import "dayjs/locale/id";

const DynamicModal = dynamic(() => import("@mui/material/Modal"), {
  ssr: false
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: 4,
  p: 4,
  overflow: "auto" // Add this line to enable scrolling
};

export default function History(props) {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const [statusTrx, setStatusTrx] = useState("all");
  const [transactionId, setTransactionId] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenBayar, setModalOpenBayar] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [errorAmount, setErrorAmount] = useState(false);
  const [amountChanges, setAmountChanges] = useState(0);
  const [productData, setProductData] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProductData = async (productId) => {
    try {
      const response = await axios.get(
        `https://api.marinarajaampat.id/products/v1/external/${productId}`
      );
      setProductData(response.data.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);
      const apiParams = {
        page: page,
        limit: 10,
        start_date: startDate.toISOString().slice(0, 10),
        end_date: endDate.toISOString().slice(0, 10)
      };

      const response = await API.get(`orders/v1/client/history`, {
        params: apiParams
      });
      setData(response.data);

      const totalItems = response.totalData.total;
      console.log(totalItems);
      const calculatedTotalPages = Math.ceil(totalItems / 10);
      console.log(calculatedTotalPages);
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Use useEffect to fetch data from the API
  useEffect(() => {
    fetchData();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
        const apiParams = {
          page: page,
          limit: 10,
          start_date: startDate.toISOString().slice(0, 10),
          end_date: endDate.toISOString().slice(0, 10)
        };

        if (statusTrx === "all") {
          delete apiParams.status;
        } else if (statusTrx === "done") {
          apiParams.status = "PAID";
        } else if (statusTrx === "unpaid") {
          apiParams.status = "INITIATED";
        }

        const response = await API.get(`orders/v1/client/history`, {
          params: apiParams
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [page, statusTrx]);

  const handlePageChange = (event, pageNumber) => {
    setPage(pageNumber)
    fetchData();
  };

  const handleFilter = (status) => {
    setStatusTrx(status);
  };

  const amountChange = (e) => {
    if (productData && productData.minimum_down_payment) {
      const minimumPaymentPercentage = productData.minimum_down_payment;
      const calculatedMinimumAmount =
        (minimumPaymentPercentage / 100) * totalPriceFix;

      setErrorAmount(e.target.value < calculatedMinimumAmount);
    }

    setAmountChanges(e.target.value);
  };

  const print = (id) => {
    const printURL = `/printhistory?id=${id}`; // Replace with your URL and parameter
    window.open(printURL, "_blank");
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleModalBayar = () => {
    setModalOpenBayar(!modalOpenBayar);
  };

  const onBayar = (item) => {
    toggleModalBayar();
    setSelectedOrder(item);
  };

  const handleDetails = (history) => {
    // Output: 14 March 2024 - 17 March 2024
    setSelectedHistory(history);
    toggleModal();
  };

  const metadataEntries =
    selectedHistory && Object.entries(JSON.parse(selectedHistory?.metadata));

  const stringToView = [
    { key: "product_name", label: "Product Name" },
    { key: "product_image", label: "Product Image" },
    { key: "nama", label: "Nama" },
    { key: "selectedTourDate", label: "Tour Date" },
    { key: "total_price", label: "Total Price" },
    { key: "min_dp", label: "Minimal DP" },
    { key: "adult", label: "Adult" },
    { key: "child", label: "Child" },
    { key: "double", label: "Double" },
    { key: "single", label: "Single" },
    { key: "triple", label: "Triple" }
  ];

  const getDisplayedKey = (key) => {
    const formattedKey = key.trim().toLowerCase();
    const matchingItem = stringToView.find((item) => item.key === formattedKey);
    return matchingItem
      ? matchingItem.label
      : key === "selectedTourDate"
      ? "Tour Date"
      : key;
  };

  // Sort metadataEntries based on the order defined in stringToView
  let sortedMetadataEntries = [];

  if (metadataEntries) {
    sortedMetadataEntries = metadataEntries.sort((a, b) => {
      const indexA = stringToView.findIndex(
        (item) => item.key === a[0].trim().toLowerCase()
      );
      const indexB = stringToView.findIndex(
        (item) => item.key === b[0].trim().toLowerCase()
      );
      return indexA - indexB;
    });
  }

  const handlePayment = async () => {
    const item = selectedOrder;
    const data = {
      amount: amountChanges,
      currency: "IDR"
    };
    try {
      const response = await API.put(`orders/v1/client/pay/${item.id}`, data);

      if (response.data) {
        setTransactionId(response.data.order.id);
        window.open(`${response.data.link.redirect_url}`, "_blank");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  return (
    <div className="col-lg-8">
      <div className={styles.menuShow}>
        <h1 className="mb-4 mb-md-0">{t("thistory")}</h1>
        <div className={styles.filterHistory}>
          <div className={styles.historyMainStatus}>Status</div>
          <div
            onClick={() => handleFilter("all")}
            className={`${styles.btnFilter} ${
              statusTrx === "all" && styles.btnFilter__active
            }`}
          >
            {t("all")}
          </div>
          <div
            onClick={() => handleFilter("done")}
            className={`${styles.btnFilter} ${
              statusTrx === "done" && styles.btnFilter__active
            }`}
          >
            {t("paid")}
          </div>
          <div
            className={`${styles.btnFilter} ${
              statusTrx === "unpaid" && styles.btnFilter__active
            }`}
            onClick={() => handleFilter("unpaid")}
          >
            {t("pending")}
          </div>
        </div>
        <div className={styles.historyList}>
          {data?.length > 0 ? (
            data.map((item, idx) => {
              return (
                <div className={styles.historyItem} key={idx}>
                  <div className={styles.historyDate}>
                    {dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </div>
                  <div className={styles.historyContainer}>
                    <div className={styles.historyLeft}>
                      <div className={styles.historyImg}>
                        {item.additional_info &&
                          typeof item.additional_info === "string" &&
                          JSON.parse(item.additional_info)?.product_image && (
                            <Image
                              src={
                                JSON.parse(item.additional_info).product_image
                              }
                              alt="thumbnail"
                              className={`${styles.img}`}
                              width={62}
                              height={50}
                            />
                          )}
                      </div>
                      <div className={styles.historyWrap}>
                        <div className={styles.historyStatus}>
                          {item.status === "PAID"
                            ? t("paidoff")
                            : item.status === "FAILED"
                            ? "Failed"
                            : t("notyet")}
                        </div>
                        <div className={styles.historyName}>
                          {item.additional_info &&
                          typeof item.additional_info === "string"
                            ? JSON.parse(item.additional_info).product_name
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div className={styles.historyRight}>
                      <div className={styles.historyLabel}>
                        {t("samount")} Rp.{numeral(item.price).format("0,0")}
                      </div>
                      <div>
                        {t("remainingpayment")}: Rp.
                        {numeral(item.price - item.amount).format("0,0")}
                      </div>
                    </div>
                  </div>
                  <div className={styles.historyAction}>
                    <div className={styles.historyDetail}>
                      <Button onClick={() => handleDetails(item)}>
                        {t("pdetails")}
                      </Button>
                    </div>
                    <div className={styles.historySee}>
                      {/* {item.status !== "PAID" && (
                        <Button
                          variant="outlined"
                          color="success"
                          className="m-2"
                          onClick={() => {
                            onBayar(item);
                          }}
                        >
                          Bayar
                        </Button>
                      )} */}
                      <Button
                        variant="outlined"
                        className={styles.historySeekecil}
                        color="success"
                        onClick={() => print(item.id)}
                      >
                        Detail Order Pesanan
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No {t("thistory")}</div>
          )}
        </div>
        <div className="d-flex justify-content-center mt-4 mb-3">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <DynamicModal open={modalOpen} onClose={toggleModal}>
        <Box
          sx={{
            ...style
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 45,
              margin: "10px"
            }}
          >
            <IconButton onClick={toggleModal} color="primary">
              <CloseIcon />
            </IconButton>
          </div>
          <Container
            maxWidth="sm"
            sx={{
              overflow: "auto",
              maxHeight: "75vh",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Typography>
                  <Box fontSize={32} fontWeight={600} className="text-center">
                    {t("pdetails")}
                  </Box>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center"
                  }}
                  className="mt-4"
                >
                  {(() => {
                    switch (selectedHistory?.status) {
                      case "INITIATED":
                        return (
                          <Image
                            src={"/assets/loading.png"}
                            alt="loading"
                            width={115}
                            height={100}
                          />
                        );
                      case "ORDERED":
                      case "PAID":
                        return (
                          <Image
                            src={"/assets/check.png"}
                            alt="check"
                            width={115}
                            height={100}
                          />
                        );
                      case "FAILED":
                        return (
                          <Image
                            src={"/assets/silang.png"}
                            alt="silang"
                            width={115}
                            height={100}
                          />
                        );
                      default:
                        return null;
                    }
                  })()}
                  <Typography style={{ fontWeight: "bold" }} className="mt-2">
                    {selectedHistory?.status}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                {selectedHistory && (
                  <>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>
                            {dayjs(selectedHistory.created_at).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Status</TableCell>
                          <TableCell
                            style={{
                              color:
                                selectedHistory.status === "PAID"
                                  ? "#00854C"
                                  : selectedHistory.status === "FAILED"
                                  ? "red"
                                  : "#0199da"
                            }}
                          >
                            {selectedHistory.status}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Amount</TableCell>
                          <TableCell>{`Rp. ${numeral(
                            selectedHistory.amount
                          ).format("0,0")}`}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Order ID</TableCell>
                          <TableCell style={{ color: "#0199da" }}>
                            {selectedHistory.id}
                          </TableCell>
                        </TableRow>
                        {selectedHistory.additional_info &&
                          Object.entries(
                            JSON.parse(selectedHistory.additional_info)
                          ).map(
                            ([key, value], index) =>
                              key !== "product_image" &&
                              value !== "" && (
                                <TableRow key={index}>
                                  <TableCell>{getDisplayedKey(key)}</TableCell>
                                  <TableCell>
                                    {key === "selectedTourDate" ? value : value}
                                  </TableCell>
                                </TableRow>
                              )
                          )}

                        {sortedMetadataEntries.map(([key, value]) => {
                          // Skip rendering if value is 0
                          if (value === 0) return null;

                          let displayValue = value;

                          // Append appropriate suffix based on the key
                          if (key === "min_dp") {
                            displayValue =
                              value === 1 ? `${value}%` : `${value}%`;
                          } else if (key === "adult" || key === "child") {
                            displayValue =
                              value === 1
                                ? `${value} person`
                                : `${value} people`;
                          } else if (
                            key === "double" ||
                            key === "single" ||
                            key === "triple"
                          ) {
                            displayValue =
                              value === 1 ? `${value} room` : `${value} rooms`;
                          }

                          return (
                            <TableRow key={key}>
                              <TableCell>{getDisplayedKey(key)}:</TableCell>
                              <TableCell>
                                {key === "total_price"
                                  ? `Rp. ${numeral(value).format("0,0")}`
                                  : displayValue}
                              </TableCell>
                            </TableRow>
                          );
                        })}

                        {/* <TableRow>
                          <TableCell>Qty</TableCell>
                          <TableCell>{selectedHistory.qty || "N/A"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Voucher Code</TableCell>
                          <TableCell>
                            {selectedHistory.voucher_code || "N/A"}
                          </TableCell>
                        </TableRow> */}
                      </TableBody>
                    </Table>
                    <Divider />
                  </>
                )}
              </Grid>

              <Grid item xs={12} md={12} className="mt-1">
                {selectedHistory &&
                  selectedHistory.OrderPayments &&
                  selectedHistory.OrderPayments.length > 0 && (
                    <Timeline position="alternate">
                      {selectedHistory.OrderPayments.map((payment, index) => (
                        <TimelineItem key={index}>
                          <TimelineOppositeContent
                            sx={{ m: "auto 0" }}
                            color="text.secondary"
                          >
                            {dayjs(payment.created_at).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
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
            </Grid>
          </Container>
        </Box>
      </DynamicModal>
      <DynamicModal open={modalOpenBayar} onClose={toggleModalBayar}>
        <Box
          sx={{
            ...style
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 1,
              margin: "10px"
            }}
          >
            <IconButton onClick={toggleModalBayar} color="primary">
              <CloseIcon />
            </IconButton>
          </div>
          <Container
            maxWidth="sm"
            sx={{
              overflow: "auto",
              maxHeight: "75vh",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6} md={6}>
                <Grid item xs={12} md={12} className="mt-3">
                  <TextField
                    error={errorAmount}
                    label={t("amount")}
                    type="number"
                    onChange={amountChange}
                    fullWidth
                  />
                </Grid>
                <Grid container spacing={2} className="mt-2">
                  <Grid item xs={12} md={12}>
                    <Button
                      variant="contained"
                      onClick={handlePayment}
                      disabled={errorAmount}
                    >
                      bayar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} md={6} className="mt-3">
                <div>
                  <Typography variant="body1" gutterBottom>
                    {t("samount")} Rp.{" "}
                    {numeral(selectedOrder?.price).format("0,0")}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {t("remainingpayment")}: Rp.{" "}
                    {numeral(
                      selectedOrder?.price - selectedOrder?.amount
                    ).format("0,0")}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DynamicModal>
    </div>
  );
}
