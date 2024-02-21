import Layout from "../src/components/Layout";
import HeroShot from "../src/components/Home/HeroShot";
import PromoBigBanner from "../src/components/Home/PromoBigBanner";
// import PromoSmallBanner from "../src/components/Home/PromoSmallBanner";
import TourList from "../src/components/Home/TourList";
import Videotron from "../src/components/Home/Videotron";
import TestimoniList from "../src/components/Home/TestimoniList";
import GalleryList from "../src/components/Home/GalleryList";
import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css";
import Client from "../src/components/common/Client";
import ModalComponent from "../src/components/common/Modal";
import { useEffect,useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from 'next/router';
import {
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import API from "../src/common/api";
export default function Homepage() {
  const { t, lang } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState();
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [pesanError, setPesanError] = useState("");
  const successPayment = () => {
    setOpenDialog(false);
    router.push("/profile?menu=history");
  };

  useEffect(() => {
    const { query } = router;
    if (query.order_id) {
      console.log(query.order_id)
      setOrderId(query.order_id);
    }
    if (query.transaction_status) {
      setTransactionStatus(query.transaction_status);
    }
  }, [router.query]);
  useEffect(() => {
    let intervalId; // Define intervalId here

    const fetchData = async () => {
      setOpenSnackbar(false);
      setOpenDialog(false);
      try {
        if (orderId) {
          const response = await API.get(`orders/v1/client/${orderId}`);
          if (response.data.status !== "INITIATED") {
            clearInterval(intervalId);
            setPesanError("Order Success");
            setOpenSnackbar(true);
            setOpenDialog(true);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setOpenSnackbar(false);
        setOpenDialog(false);
      }
    };

    if (orderId) {
      fetchData();
      intervalId = setInterval(fetchData, 15000); // Set intervalId
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [orderId]);
  const handleOpen = (currImg) => {
    setImg(currImg);
    setOpen(!open);
  };

  const content = (
    <div>
      <Image src={img} alt="img-show" />
    </div>
  );
  return (
    <Layout>
      <Head>
        <title>Marina Raja Ampat</title>
        <meta
          name="description"
          content="Marina Raja Ampat is a breathtaking waterfront destination nestled in the heart of the enchanting Raja Ampat archipelago, Indonesia. Surrounded by turquoise waters and lush greenery"
        />
      </Head>
      <HeroShot />
      <div className="container">
        <div className="row">
          <PromoBigBanner />
          <TourList />
        </div>
      </div>
      <TestimoniList />
      <GalleryList onClick={handleOpen} />
      <Videotron />
      <Client />
      <ModalComponent open={open} close={handleOpen} content={content} />
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
}
