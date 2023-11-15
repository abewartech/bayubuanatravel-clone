import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./Profile.module.scss";
import { useRouter } from "next/router";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
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
  p: 4
};

export default function History(props) {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const [statusTrx, setStatusTrx] = useState("all");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  // Use useEffect to fetch data from the API
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

        const response = await API.get(`orders/v1/client/history`, {
          params: apiParams
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

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

  const handleFilter = (status) => {
    setStatusTrx(status);
  };

  const print = (id) => {
    const printURL = `/printhistory?id=${id}`; // Replace with your URL and parameter
    window.open(printURL, "_blank");
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleDetails = (history) => {
    setSelectedHistory(history);
    toggleModal();
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
                        {item.metadata &&
                          typeof item.metadata === "string" &&
                          JSON.parse(item.metadata)?.product_image && (
                            <Image
                              src={JSON.parse(item.metadata).product_image}
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
                          {item.metadata && typeof item.metadata === "string"
                            ? JSON.parse(item.metadata).product_name
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
                        {numeral(item.price * item.qty - item.amount).format(
                          "0,0"
                        )}
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
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => {
                          if (item.status === "PAID") {
                            print(item.id);
                          } else {
                            handlePayment();
                          }
                        }}
                      >
                        {item.status === "PAID" ? "Print" : "Bayar"}
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
      </div>
      <DynamicModal open={modalOpen} onClose={toggleModal}>
        <Box sx={style}>
          <Container
            maxWidth="sm"
            sx={{ height: "65vh", display: "flex", alignItems: "center" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Typography>
                  <Box fontSize={32} fontWeight={600}>
                    {t("pdetails")}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                {selectedHistory && (
                  <>
                    <div>
                      {dayjs(selectedHistory.created_at).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </div>
                    <div>{selectedHistory.product_id}</div>
                  </>
                )}
              </Grid>
              <Grid item xs={12} md={12}>
                {selectedHistory &&
                  selectedHistory.OrderPayments &&
                  selectedHistory.OrderPayments.length > 0 && (
                    <Timeline position="alternate">
                      {selectedHistory.OrderPayments.map((payment, index) => (
                        <TimelineItem key={index}>
                          <TimelineOppositeContent color="text.secondary">
                            {dayjs(payment.created_at).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot />
                            {index < payment.length - 1 && (
                              <TimelineConnector />
                            )}
                          </TimelineSeparator>
                          <TimelineContent>{payment.status}</TimelineContent>
                          <TimelineContent>
                            Amount: {payment.amount}
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
    </div>
  );
}
