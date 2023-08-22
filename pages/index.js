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
import { useState } from "react";
import Image from "next/image";
export default function Homepage() {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState();
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
      <HeroShot />
      <div className="container">
        <div className="row">
          <PromoBigBanner />
          {/* <PromoSmallBanner /> */}
          <TourList />
          <Videotron />
        </div>
      </div>
      <Client />
      <TestimoniList />
      <GalleryList onClick={handleOpen} />
      <ModalComponent open={open} close={handleOpen} content={content} />
    </Layout>
  );
}
