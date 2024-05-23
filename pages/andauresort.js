import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import { useEffect, useState } from "react";
import resort from "./../public/assets/resort.jpg";
import andauImage from "./../public/assets/andau/DJI_0701.JPG";
import bg111 from "./../public/image/resort/andauresortdouble.jpeg";
import bg222 from "./../public/image/resort/andauresortdouble1.jpeg";
import bg333 from "./../public/image/resort/andauresorttwin.jpeg";
import image111 from "./../public/image/resort/familyroom.jpeg";
import image222 from "./../public/image/resort/terasandauroom.jpeg";
import image333 from "./../public/image/resort/viewkamar.jpeg";
import bg1 from "./../public/image/andau1.jpeg";
import bg2 from "./../public/image/andau2.jpeg";
import bg3 from "./../public/image/andau3.jpeg";
import image1 from "./../public/image/20230722_190113.jpg";
import image2 from "./../public/image/20230722_191322.jpg";
import image3 from "./../public/image/20230722_203051.jpg";
import image4 from "./../public/image/20230722_222819.jpg";
import image5 from "./../public/image/andau_restaurant.jpg";
import image6 from "./../public/image/gazebo.jpg";
import andauImage2 from "./../public/assets/andau/DJI_0701.JPG";
import useTranslation from "next-translate/useTranslation";
import API from "../src/common/api";
import Head from "next/head";
import Image from "next/image";
import TitleSection from "../src/components/common/TitleSection";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import GalleryList from "../src/components/Home/GalleryList";
import ModalComponent from "../src/components/common/Modal";
import "@splidejs/react-splide/css/core";
import "@splidejs/react-splide/css";
import AndauDouble from "../src/components/Home/AndauDouble";
import AndauKing from "../src/components/Home/AndauKing";
import Family from "../src/components/Home/Family";
import VIPDouble from "../src/components/Home/VIPDouble";
import VIPDoubleExtra from "../src/components/Home/VIPDoubleExtra";
import VIPKing from "../src/components/Home/VIPKing";

export default function AndauResort() {
  const [img, setImg] = useState();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("All");
  const { t, lang } = useTranslation("common");
  const [data, setData] = useState([]); // State to store API response
  const breadcrumb = [
    {
      name: t("home")
    },
    {
      name: "Andau Resort"
    }
  ];

  const handleActive = (menu) => {
    setActive(menu);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("contents/v1?size=999");
        const filteredData = response.data.filter(
          (item) => item.category === "about-us"
        );
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };

    fetchData();
  }, []);

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
        <title>ANDAU RESORT RAJA AMPAT - {t("about")}</title>
        <meta
          name="description"
          content="Andau Vetty is a field operator providing a diverse range of tour services since 2019. Our office is strategically located to facilitate easy access for guests to visit and obtain further information. In addition to tour services, we offer a wide array of facilities, including a restaurant, speedboat dock, speedboat rentals, and a privately managed island for relaxation. With well-maintained and comprehensive facilities, along with experienced and professional staff, we are committed to providing you with the best service and an unforgettable holiday experience in Raja Ampat.Relax in comfortable accommodations at Andau Resort, equipped
                with modern amenities such as 24-hour electricity, WiFi, clean
                water, air conditioning, hot water, and mesmerizing ocean views
                with pristine white sandy beaches."
        />
      </Head>
      <HeaderPage
        title={"Andau Resort"}
        breadcrumb={breadcrumb}
        background={andauImage}
      />
      <div className="container">
        <div className="row">
          <div className="col-8">
            <TitleSection title="Andau Resort" more={false} />
            <h5 className="mt-3 mb-4">
              Relax in comfortable accommodations at Andau Resort, equipped with
              modern amenities such as 24-hour electricity, WiFi, clean water,
              air conditioning, hot water, and mesmerizing ocean views with
              pristine white sandy beaches.
            </h5>
          </div>
          <div className="col-4 align-self-end mb-4">
            <div className="d-flex justify-content-end">
              <Link
                href={`https://wa.me/6281316776671?text=Hi%2C%20${
                  lang === "en"
                    ? "I want to inquire about Andau Island"
                    : "Saya ingin menanyakan detail terkait Pulau Andau"
                }`}
              >
                <button
                  style={{
                    border: "none",
                    backgroundColor: "#01B7F2",
                    color: "#fff",
                    padding: "12px 32px"
                  }}
                >
                  {t("contactus")}
                </button>
              </Link>
            </div>
          </div>
          {/* <iframe src="https://drive.google.com/file/d/1G8m6M5zwABWsAXIKH5zJHFbkJq-X0JUi/preview" width="640" height="480" allow="autoplay"></iframe> */}
          <div className="col-md-4">
            {" "}
            <Image src={bg1} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            {" "}
            <Image src={bg3} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            {" "}
            <Image src={bg2} className="img-fluid mb-5" />
          </div>
          {/* <div className="col-md-4">
            <Image src={image1} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            <Image src={image2} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            <Image src={image3} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            <Image src={image4} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            <Image src={image5} className="img-fluid mb-3" />
          </div>
          <div className="col-md-4">
            <Image src={image6} className="img-fluid mb-3" />
          </div> */}
          {/* <br />
          <div className="col-md-4">
            <Image
              src={bg111}
              className="img-fluid mb-3"
              style={{ height: "311px", objectFit: "cover" }}
            />
            <Typography variant="body2" className="mb-3">
              Andau Resort Double
            </Typography>
          </div>
          <div className="col-md-4">
            <Image src={bg333} className="img-fluid mb-3" />
            <Typography variant="body2" className="mb-3">
              Andau Resort Double
            </Typography>
          </div>
          <div className="col-md-4">
            <Image src={bg222} className="img-fluid mb-3" />
            <Typography variant="body2" className="mb-3">
              Andau Resort Twin
            </Typography>
          </div>
          <div className="col-md-4">
            <Image src={image111} className="img-fluid mb-3" />
            <Typography variant="body2" className="mb-3">
              Family Room
            </Typography>
          </div>
          <div className="col-md-4">
            <Image src={image222} className="img-fluid mb-3" />
            <Typography variant="body2" className="mb-3">
              Teras Andau
            </Typography>
          </div>
          <div className="col-md-4">
            <Image src={image333} className="img-fluid mb-3" />
            <Typography variant="body2" className="mb-3">
              Andau Resort
            </Typography>
          </div> */}
        </div>

        <AndauDouble onClick={handleOpen} />
        <AndauKing onClick={handleOpen} />
        <Family onClick={handleOpen} />
        <VIPDouble onClick={handleOpen} />
        <VIPDoubleExtra onClick={handleOpen} />
        <VIPKing onClick={handleOpen} />
        <div className="row">
          <div className="col-md-12">
            <div className="ratio ratio-16x9 mb-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d37955.16186399516!2d130.252435717325!3d-0.6707242892240801!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d5e3e46d42f1459%3A0xafa9f72bb4ba8b84!2sAndau%20Homestay%20and%20Resort!5e0!3m2!1sen!2sid!4v1716449822924!5m2!1sen!2sid"
                width="800"
                height="450"
                frameborder="0"
                style={{ border: 0 }}
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              />
            </div>
          </div>
        </div>
      </div>
      <ModalComponent open={open} close={handleOpen} content={content} />
    </Layout>
  );
}
