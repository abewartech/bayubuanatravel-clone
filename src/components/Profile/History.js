import Image from "next/image";
import styles from "./Profile.module.scss";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import API from "../../common/api";
import calendar from "./calendar.svg";

export default function History(props) {
  const router = useRouter();
  const [statusTrx, setStatusTrx] = useState("all");
  const [data, setData] = useState([]);

  // Use useEffect to fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/orders/v1/client");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts.

  const handleFilter = (status) => {
    setStatusTrx(status);
  };

  const print = () => {

  }
  
  return (
    <div className="col-lg-8">
      <div className={styles.menuShow}>
        <h1 className="mb-4 mb-md-0">Transaction History</h1>
        <div className={styles.filterHistory}>
          <div className={styles.historyMainStatus}>Status</div>
          <div
            onClick={() => handleFilter("all")}
            className={`${styles.btnFilter} ${
              statusTrx === "all" && styles.btnFilter__active
            }`}
          >
            All
          </div>
          <div
            onClick={() => handleFilter("done")}
            className={`${styles.btnFilter} ${
              statusTrx === "done" && styles.btnFilter__active
            }`}
          >
            Paid
          </div>
          <div
            className={`${styles.btnFilter} ${
              statusTrx === "unpaid" && styles.btnFilter__active
            }`}
            onClick={() => handleFilter("unpaid")}
          >
            Pending
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
                          Belum Dibayar
                        </div>
                        <div className={styles.historyName}>Paket Umroh 1</div>
                        {/* <div className={styles.history}></div> */}
                      </div>
                    </div>
                    <div className={styles.historyRight}>
                      <div className={styles.historyLabel}>Total Belanja</div>
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
              );
            })
          ) : (
            <div>No Transaction History</div>
          )}
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
                  <div className={styles.historyStatus}>Not Paid</div>
                  <div className={styles.historyName}>Paket Umroh 1</div>
                  {/* <div className={styles.history}></div> */}
                </div>
              </div>
              <div className={styles.historyRight}>
                <div className={styles.historyLabel}>Total Belanja</div>
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
                  <div className={styles.historyStatusPaid}>Paid</div>
                  <div className={styles.historyName}>Paket Umroh 1</div>
                  {/* <div className={styles.history}></div> */}
                </div>
              </div>
              <div className={styles.historyRight}>
                <div className={styles.historyLabel}>Total Belanja</div>
                <div className={styles.historyPrice}>Rp 7.000.000</div>
              </div>
            </div>
            <div className={styles.historyAction}>
              <div className={styles.historyDetail}>
                <Button>Detail Paket</Button>
              </div>
              <div className={styles.historySee}>
                <Button variant="outlined" color="success" onClick={print}>Print</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
