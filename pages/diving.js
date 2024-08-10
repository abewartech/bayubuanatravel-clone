import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import { useEffect, useState } from "react";
import resort from "./../public/assets/resort.jpg";
import andauImage from "./../public/image/diving/1.jpg";
import bg111 from "./../public/image/resort/andauresortdouble.jpeg";
import bg222 from "./../public/image/resort/andauresortdouble1.jpeg";
import bg333 from "./../public/image/resort/andauresorttwin.jpeg";
import image111 from "./../public/image/resort/familyroom.jpeg";
import image222 from "./../public/image/resort/terasandauroom.jpeg";
import image333 from "./../public/image/resort/viewkamar.jpeg";
import bg1 from "./../public/image/diving/1.jpg";
import bg2 from "./../public/image/diving/2.jpg";
import bg3 from "./../public/image/diving/3.jpg";
import image1 from "./../public/image/diving/4.jpg";
import image2 from "./../public/image/diving/5.jpg";
import image3 from "./../public/image/diving/6.jpg";
import image4 from "./../public/image/diving/7.jpg";
import image5 from "./../public/image/diving/8.jpg";
import image6 from "./../public/image/diving/9.jpg";
import image7 from "./../public/image/diving/10.jpg";
import image8 from "./../public/image/diving/11.jpg";
import image9 from "./../public/image/diving/12.jpg";
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
import DivingSlide from "../src/components/Home/DivingSlide";

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
            name: "Diving Raja Ampat"
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
                <title>DIVING RAJA AMPAT - {t("about")}</title>
                <meta
                    name="description"
                    content="Explore the breathtaking underwater world of Raja Ampat with Andau Vetty. Dive into crystal-clear waters and discover vibrant coral reefs teeming with marine life. Our diving tours are led by experienced guides, ensuring a safe and memorable adventure. Whether you're a beginner or an experienced diver, Andau Resort offers the perfect diving experience in one of the most beautiful marine environments on the planet."
                />
            </Head>
            <HeaderPage
                title={"Diving Raja Ampat"}
                breadcrumb={breadcrumb}
                background={andauImage}
            />
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <TitleSection title="Diving Raja Ampat" more={false} />
                        <h5 className="mt-3 mb-4">
                            Explore the breathtaking underwater world of Raja Ampat with Andau Vetty. Dive into crystal-clear waters and discover vibrant coral reefs teeming with marine life. Our diving tours are led by experienced guides, ensuring a safe and memorable adventure. Whether youre a beginner or an experienced diver, Andau Resort offers the perfect diving experience in one of the most beautiful marine environments on the planet.
                        </h5>
                    </div>
                    <div className="col-4 align-self-end mb-4">
                        <div className="d-flex justify-content-end">
                            <Link
                                href={`https://wa.me/6281316776671?text=Hi%2C%20${lang === "en"
                                    ? "I want to inquire about Diving"
                                    : "Saya ingin menanyakan detail terkait Diving"
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
                </div>
                <DivingSlide onClick={handleOpen} />
                <div className="iframe-container mb-10">
                    <iframe
                        src="https://marinarajaampat-31hnwcc.gamma.site/"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            <ModalComponent open={open} close={handleOpen} content={content} />
            <style jsx>{`
                .iframe-container {
                    position: relative;
                    overflow: hidden;
                    padding-top: 56.25%; /* 16:9 Aspect Ratio */
                }
                .iframe-container iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </Layout>
    );
}
