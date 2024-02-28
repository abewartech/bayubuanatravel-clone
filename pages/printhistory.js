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
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../src/common/api";
import useTranslation from "next-translate/useTranslation";
import dayjs from "dayjs";
import numeral from "numeral";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
export default function PrintHistory() {
  const { t, lang } = useTranslation("common");
  const [orderData, setOrderData] = useState(null);
  const [productData, setProductData] = useState(null);
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
    setTimeout(() => window.print(), 1000); //uncomment print
  }, []);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (router.query.id) {
        try {
          const response = await API.get(
            `/orders/v1/client/${router.query.id}`
          );
          setOrderData(response.data);

          // Make the second API call
          if (response.data && response.data.product_id) {
            const productResponse = await API.get(
              `/products/v1/external/${response.data.product_id}`
            );
            setProductData(productResponse.data);
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
                  <Typography align="right">Jumlah :</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{1}</Typography>
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

        <TableContainer component={Paper} className="mb-3">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Keterangan</TableCell>
                <TableCell>Biaya</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Sub Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData &&
                productData.activities.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {row.name}
                    </TableCell>
                    <TableCell>
                      {" "}
                      Rp. {numeral(row.base_price).format("0,0")}
                    </TableCell>
                    <TableCell>{1}</TableCell>
                    <TableCell>
                      {" "}
                      Rp. {numeral(row.base_price).format("0,0")}
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Total Paket</TableCell>
                <TableCell>
                  {orderData && orderData.price
                    ? `Rp. ${numeral(orderData.price).format(
                        "0,0"
                      )}`
                    : "Price not available"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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

        {/* <Typography variant="h6" className="mt-3">
          Syarat & Ketentuan
        </Typography>
        <Typography variant="subtitle1">Umrah :</Typography>
        <List>
          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                1. Biaya booking seat Umrah sebesar Rp. 2.000.000 per pax / per
                jemaah untuk mengkonfirmasi kursi keberangkatan.
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                2. Pembayaran kedua Umrah minimal senilai Rp. 10.000.000
                dibayarkan paling lambat 2 bulan sebelum keberangkatan, dan
                pelunasan Umrah dibayarkan paling lambat 45 hari sebelum
                keberangkatan.
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                3. Harga paket tidak termasuk: biaya kelebihan bagasi, tour dan
                transportasi diluar paket, telepon, telex, faximili, minuman,
                cucian dan biaya lain-lain yang bersifat pribadi.
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                4. Pembatalan Umrah 30 hari sebelum keberangkatan dikenakan
                biaya 25% dari harga paket, 15 hari sebelum hari keberangkatan
                dikenakan biaya 50% dari harga paket, 5 hari sebelum
                keberangkatan dikenakan biaya 75% dari harga paket, dan uang
                paket umrah anda akan hangus jika pembatalan 2 hari sebelum
                keberangkatan.
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                5. Pembatalan umrah Ramadhan sejak pendaftaran s/d 15 hari
                sebelum keberangkatan dikenakan biaya 50% dari harga paket,
                sejak 10 hari s/d tanggal keberangkatan dikenakan biaya 85% dari
                harga paket, dan uang paket umrah anda akan hangus jika
                pembatalan 2 hari sebelum keberangkatan.
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="body1">
                6. Harap melengkapi dokumen keberangkatan maksimal 1 bulan
                sebelum keberangkatan, keterlambatan dalam melengkapi dokumen
                dapat membatalkan keberangkatan.
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Box>
          <Typography
            className="s6"
            sx={{ pt: 3, lineHeight: "223%", textAlign: "left" }}
          >
            Saya telah membaca dan menyetujui{" "}
            <strong>Syarat & Ketentuan</strong> yang diberikan oleh PERCAYA
            UMROH Travel
          </Typography>
          <Typography
            className="s6 mb-3"
            sx={{ pt: 3, lineHeight: "223%", textAlign: "left" }}
          >
            Jakarta, 20-Jul-2023
          </Typography>
          <Grid container spacing={0} className="mt-2">
            <Grid item xs={4}>
              <Typography
                className="s6 mb-5"
                sx={{ pl: 10, textAlign: "left" }}
              >
                Tanda Tangan Pelanggan
              </Typography>
              <Typography
                className="s6 mt-5"
                sx={{ pl: 10, textAlign: "left" }}
              >
                ( <strong>RAJA Travel - Hendra</strong> )
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                className="s6 mb-5"
                sx={{ pl: 10, textAlign: "left" }}
              >
                Customer Service
              </Typography>
              <Typography
                className="s6 mt-5"
                sx={{ pl: 10, textAlign: "left" }}
              >
                ( <strong>Leiga Adilawati</strong> )
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                className="s6 mb-5"
                sx={{ pl: 10, textAlign: "center" }}
              >
                Kasir
              </Typography>
              <Typography
                className="s6 mt-5"
                sx={{ pl: 10, textAlign: "center" }}
              >
                ( )
              </Typography>
            </Grid>
          </Grid>
          <Typography sx={{ pt: 5, textAlign: "left" }}>
            ** Harap membawa slip ini atau memberikan kode booking pada saat
            pengambilan perlengkapan keberangkatan
          </Typography>
        </Box> */}
      </Container>
    </>
  );
}
