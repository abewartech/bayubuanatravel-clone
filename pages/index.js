import Layout from "../src/components/Layout";
import HeroShot from "../src/components/Home/HeroShot";
import PromoBigBanner from "../src/components/Home/PromoBigBanner";
import PromoSmallBanner from "../src/components/Home/PromoSmallBanner";
import TourList from "../src/components/Home/TourList";
import Videotron from "../src/components/Home/Videotron";
import TestimoniList from "../src/components/Home/TestimoniList";
import GalleryList from "../src/components/Home/GalleryList";
import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css";
export default function Homepage() {
  return (
    <Layout>
      <HeroShot />
      <div className="container">
        <div className="row">
          <PromoBigBanner />
          <PromoSmallBanner />
          <TourList />
          <Videotron />
        </div>
      </div>
      <TestimoniList />
      <GalleryList />
    </Layout>
  );
}
