import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import styles from "./Profile.module.scss";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import API from "../../common/api";
import calendar from "./calendar.svg";

export default function History(props) {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const [statusTrx, setStatusTrx] = useState("all");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

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
                    <span>
                      <Image src={calendar} alt="calendar" />
                    </span>
                    12 Juli 2023 23:00
                  </div>
                  <div className={styles.historyContainer}>
                    <div className={styles.historyLeft}>
                      <div className={styles.historyImg}></div>
                      <div className={styles.historyWrap}>
                        <div className={styles.historyStatus}>
                          {item.status === "PAID" ? "Lunas" : "Belum Lunas"}
                        </div>
                        <div className={styles.historyName}>Paket Umroh 1</div>
                      </div>
                    </div>
                    <div className={styles.historyRight}>
                      <div className={styles.historyLabel}>{t("samount")}</div>
                      <div className={styles.historyPrice}>Rp 7.000.000</div>
                    </div>
                  </div>
                  <div className={styles.historyAction}>
                    <div className={styles.historyDetail}>
                      <Button>{t("pdetails")}</Button>
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
          {/* <div className={styles.historyItem}>
            <div className={styles.historyDate}>
              <span>
                <Image src={calendar} alt="calendar" />
              </span>
              12 Juli 2023 23:00
            </div>
            <div className={styles.historyContainer}>
              <div className={styles.historyLeft}>
                <div className={styles.historyImg}></div>
                <div className={styles.historyWrap}>
                  <div className={styles.historyStatus}>{t('notpaid')}</div>
                  <div className={styles.historyName}>Paket Umroh 1</div>
                </div>
              </div>
              <div className={styles.historyRight}>
                <div className={styles.historyLabel}>{t('samount')}</div>
                <div className={styles.historyPrice}>Rp 7.000.000</div>
              </div>
            </div>
            <div className={styles.historyAction}>
              <div className={styles.historyDetail}>
                <Button>Detail Paket</Button>
              </div>
              <div className={styles.historySee}>
                <Button>Bayar</Button>
              </div>
            </div>
          </div>
          <div className={styles.historyItem}>
            <div className={styles.historyDate}>
              <span>
                <Image src={calendar} alt="calendar" />
              </span>
              12 Juli 2023 23:00
            </div>
            <div className={styles.historyContainer}>
              <div className={styles.historyLeft}>
                <div className={styles.historyImg}></div>
                <div className={styles.historyWrap}>
                  <div className={styles.historyStatusPaid}>{t('paid')}</div>
                  <div className={styles.historyName}>Paket Umroh 1</div>
                </div>
              </div>
              <div className={styles.historyRight}>
                <div className={styles.historyLabel}>{t('samount')}</div>
                <div className={styles.historyPrice}>Rp 7.000.000</div>
              </div>
            </div>
            <div className={styles.historyAction}>
              <div className={styles.historyDetail}>
                <Button>{t('pdetails')}</Button>
              </div>
              <div className={styles.historySee}>
                <Button variant="outlined" color="success" onClick={print}>
                  Print
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
