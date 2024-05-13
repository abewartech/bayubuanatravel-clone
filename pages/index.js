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
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import map from "./../public/image/map.jpeg";
import image1 from "./../public/image/index/1.jpeg";
import image2 from "./../public/image/index/2.jpeg";
import image3 from "./../public/image/index/3.jpeg";
import image4 from "./../public/image/index/4.jpeg";
import image5 from "./../public/image/index/5.jpeg";
import image6 from "./../public/image/index/6.jpeg";
import {
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  SnackbarContent
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
  const [orderId, setOrderId] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [pesanError, setPesanError] = useState("");
  const successPayment = () => {
    setOpenDialog(false);
    router.push("/profile?menu=history");
  };

  useEffect(() => {
    const { query } = router;
    if (query.order_id) {
      console.log(query.order_id);
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
      {/* <Client /> */}

      <div className="col-lg-12">

        <div className="text-center container">
          <div className="row g-5 mb-2 p-3">
            <div className="col-md-6">
              <Image src={image5} alt="image-5" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <Image src={image4} alt="image-4" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <Image src={image1} alt="image-1" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <Image src={image2} alt="image-2" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <Image src={image3} alt="image-3" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <Image src={image6} alt="image-6" className="img-fluid" />
            </div>
          </div>
        </div>
        
        <div className="text-center mt-2">
          <Image src={map} alt="map" className="img-fluid mb-5 mt-4" />
        </div>
      </div>
      <Videotron />
      <ModalComponent open={open} close={handleOpen} content={content} />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <SnackbarContent
          message={pesanError}
          style={{ backgroundColor: "green" }} // You can customize the color
        />
      </Snackbar>
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
