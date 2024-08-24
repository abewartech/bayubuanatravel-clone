import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import { useEffect, useState } from "react";
import resort from "./../public/assets/resort.jpg";
import andauImage from "./../public/image/diving/1.jpg";
import image0 from "./../public/assets/diving/image0.png";
import image1 from "./../public/assets/diving/image1.jpg";
import image2 from "./../public/assets/diving/image2.jpg";
import image3 from "./../public/assets/diving/image3.jpg";
import image4 from "./../public/assets/diving/image4.jpg";
import image5 from "./../public/assets/diving/image5.jpg";
import image6 from "./../public/assets/diving/image6.jpg";
import image7 from "./../public/assets/diving/image7.jpeg";
import image8 from "./../public/assets/diving/image8.jpeg";
import image9 from "./../public/assets/diving/image9.jpg";
import image10 from "./../public/assets/diving/image10.jpeg";
import image11 from "./../public/assets/diving/image11.jpg";
import image12 from "./../public/assets/diving/image12.jpg";
import image13 from "./../public/assets/diving/image13.jpg";
import image14 from "./../public/assets/diving/image14.jpg";
import image15 from "./../public/assets/diving/image15.jpg";
import image16 from "./../public/assets/diving/image16.jpg";
import image17 from "./../public/assets/diving/image17.jpg";
import image18 from "./../public/assets/diving/image18.jpg";
import image19 from "./../public/assets/diving/image19.png";
import image20 from "./../public/assets/diving/image20.png";
import bg111 from "./../public/image/resort/andauresortdouble.jpeg";
import bg222 from "./../public/image/resort/andauresortdouble1.jpeg";
import bg333 from "./../public/image/resort/andauresorttwin.jpeg";
import image111 from "./../public/image/resort/familyroom.jpeg";
import image222 from "./../public/image/resort/terasandauroom.jpeg";
import image333 from "./../public/image/resort/viewkamar.jpeg";
import bg1 from "./../public/image/diving/1.jpg";
import bg2 from "./../public/image/diving/2.jpg";
import bg3 from "./../public/image/diving/3.jpg";
// import image1 from "./../public/image/diving/4.jpg";
// import image2 from "./../public/image/diving/5.jpg";
// import image3 from "./../public/image/diving/6.jpg";
// import image4 from "./../public/image/diving/7.jpg";
// import image5 from "./../public/image/diving/8.jpg";
// import image6 from "./../public/image/diving/9.jpg";
// import image7 from "./../public/image/diving/10.jpg";
// import image8 from "./../public/image/diving/11.jpg";
// import image9 from "./../public/image/diving/12.jpg";
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
      name: t("home"),
    },
    {
      name: "Diving Raja Ampat",
    },
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
        {/* <div className="row">
          <div className="col-8">
            <TitleSection title="Diving Raja Ampat" more={false} />
            <h5 className="mt-3 mb-4">
              Explore the breathtaking underwater world of Raja Ampat with Andau
              Vetty. Dive into crystal-clear waters and discover vibrant coral
              reefs teeming with marine life. Our diving tours are led by
              experienced guides, ensuring a safe and memorable adventure.
              Whether youre a beginner or an experienced diver, Andau Resort
              offers the perfect diving experience in one of the most beautiful
              marine environments on the planet.
            </h5>
          </div>
          <div className="col-4 align-self-end mb-4">
            <div className="d-flex justify-content-end">
              <Link
                href={`https://wa.me/6281316776671?text=Hi%2C%20${
                  lang === "en"
                    ? "I want to inquire about Diving"
                    : "Saya ingin menanyakan detail terkait Diving"
                }`}
              >
                <button
                  style={{
                    border: "none",
                    backgroundColor: "#01B7F2",
                    color: "#fff",
                    padding: "12px 32px",
                  }}
                >
                  {t("contactus")}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <DivingSlide onClick={handleOpen} /> */}
        <div className="row card-custom_diving">
          <div className="col-12 col-md-6 d-flex flex-column align-self-center">
            <div className="title-diving">Discover Paradise at Raja Ampat</div>
            <div className="text-diving">
              Dear adventurer, we thank you for your interest in exploring Raja
              Ampat with us. Let us help you in taking your steps towards
              embarking on this unforgettable journey.
            </div>
          </div>
          <div className="col-12 col-md-5 offset-md-1">
            <div className="image-diving">
              <img src={image15.src} alt="image15" />
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-12">
            <div className="title-diving mb-4">A World of Natural Wonders</div>
          </div>
          <div className="col-12 col-md-7">
            <div className="image-diving mb-3">
              <img src={image1.src} alt="image1" />
            </div>
            <div className="text-diving">
              The Raja Ampat islands are renowned for their stunning
              biodiversity, not just under but also above ocean. Whether you're
              diving, snorkelling, hiking or just simply soaking in the
              breath-taking landscape, Raja Ampat promises an adventure that you
              won't soon forget.{" "}
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="image-diving h-250 mb-3">
              <img src={image2.src} alt="image2" />
            </div>
            <div className="image-diving h-250 mb-3">
              <img src={image3.src} alt="image3" />
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-5">
            <div className="title-diving">Andau Resort</div>
            <div className="text-diving">
              Escape to our Andau Resort, an exclusive retreat nestled on the
              private island of Andau in the Pam Archipelago. Enjoy peace &
              quiet surrounded by pristine sandy beaches & turquoise clear
              waters blessed with marine life.
            </div>
          </div>
          <div className="col-12 col-md-6 offset-md-1">
            <div className="image-diving h-300 mb-4">
              <img src={image4.src} alt="image4" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="image-diving h-300 mb-4">
              <img src={image5.src} alt="image5" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="image-diving h-300 mb-4">
              <img src={image6.src} alt="image6" />
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-12">
            <iframe
              src="https://www.youtube.com/embed/aOICb7gzoL4"
              className="w-100"
              style={{ height: "750px" }} // Set the height here
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-4">
            <div className="image-diving long mb-3">
              <img src={image7.src} alt="image7" />
            </div>
          </div>
          <div className="col-12 col-md-7 offset-md-1">
            <div className="title-diving">Why us?</div>
            <div className="list-diving">
              <div className="list-item">
                {/* <div className="list-item_num">1</div> */}
                <div>
                  <div className="list-item_title">Flexible Packages</div>
                  <div className="list-item_text">
                    We offer flexible packages for both divers & non-divers of
                    all levels. There's some options for you, no matter your
                    preferences.{" "}
                  </div>
                </div>
              </div>
              <div className="list-item">
                {/* <div className="list-item_num">2</div> */}
                <div>
                  <div className="list-item_title">
                    Strategic Private Island
                  </div>
                  <div className="list-item_text">
                    Raja Ampat's icon, Piaynemo Lookout Point & unmissable dive
                    sites such as Melissa's Garden are just a short boat ride
                    away.
                  </div>
                </div>
              </div>
              <div className="list-item">
                {/* <div className="list-item_num">3</div> */}
                <div>
                  <div className="list-item_title">Seamless Transfers</div>
                  <div className="list-item_text mb-0">
                    Experience effortless travel with our fleet of private
                    roofed boats of various sizes. Physical office also
                    available at Sorong.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-12">
            <div className="image-diving mb-3 h-200">
              <img src={image17.src} alt="image17" className="mb-3" />
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="title-diving">Room Type</div>
            <div className="text-diving">
              Our exclusive haven features 18 beautifully appointed wooden rooms
              across three distinct types: Deluxe, Superior & Family Room. All
              rooms are equipped with air conditioner & ensuite private
              bathroom. Our Deluxe & Superior Room also come with hot showers &
              double bed or twin beds options.
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-12">
            <div className="title-diving">Deluxe Room</div>
          </div>
          <div className="col-12 col-md-6">
            <div className="image-diving fixed mb-3">
              <img src={image7.src} alt="image7" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="image-diving fixed mb-3">
              <img src={image8.src} alt="image7" />
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="table-responsive">
              <table>
                <tbody>
                  <tr>
                    <td>1 queen bed or 2 single beds with extra bed option</td>
                    <td>Air conditioner for keeping cool on hot days</td>
                  </tr>
                  <tr>
                    <td>Ensuite bathroom with hot showers & amenities</td>
                    <td>Private ocean view veranda with seating area</td>
                  </tr>
                  <tr>
                    <td>25m² room with 15m² veranda</td>
                    <td>Hardwood fixtures & fittings</td>
                  </tr>
                  <tr>
                    <td>Mini fridge for your chilling needs</td>
                    <td>Complimentary soft drinks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-12">
            <div className="title-diving">Superior Room</div>
          </div>
          <div className="col-12 col-md-6">
            <div className="image-diving fixed mb-3">
              <img src={image9.src} alt="image7" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="image-diving fixed mb-3">
              <img src={image10.src} alt="image7" />
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="table-responsive">
              <table>
                <tr>
                  <td>1 queen bed or 2 single beds with extra bed option</td>

                  <td>Air conditioner for keeping cool on hot days</td>
                </tr>
                <tr>
                  <td>Ensuite bathroom with hot showers & amenities</td>

                  <td>Private ocean view veranda with seating area</td>
                </tr>
                <tr>
                  <td>16m² room with 12m² veranda</td>
                  <td>Hardwood fixtures & fittings</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-12">
            <div className="image-diving"></div>
          </div>
          <div className="col-12 col-md-12">
            <div className="title-diving">Unwind in Paradise</div>
          </div>
          <div className="col-12 col-md-12">
            <div className="row justify-content-between align-items-center _custom">
              <div className="col-12 col-md-4 text-center mb-3">
                <div className="subtitle-diving">
                  <b>Tranquil Beaches</b>
                </div>
                <div className="text-diving">
                  Relax on our white sandy beaches, basking in the warm tropical
                  sun, or unwind under the shade in the gazebos scattered
                  across.
                </div>
              </div>
              <div className="col-12 col-md-4 text-center mb-3">
                <div className="subtitle-diving">
                  <b>Cuisine</b>
                </div>
                <div className="text-diving">
                  Savour cuisines crafted using a variety of locally sourced
                  ingredients, including seafood, poultry, beef, vegetable &
                  fruit.
                </div>
              </div>
              <div className="col-12 col-md-4 text-center mb-3">
                <div className="subtitle-diving">
                  <b>Water Activities</b>
                </div>
                <div className="text-diving">
                  Swim, snorkel, dive, or glide through turquoise waters teeming
                  with marine life with stand up paddle board & transparent
                  kayak.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-12">
            <div className="title-diving mb-4">
              Tailored Packages for Every Traveler
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="subtitle-diving">Diving Packages</div>
            <div className="text-diving  mb-5">
              Dive into the mesmerizing marine world of Raja Ampat, from
              neighbouring Melissa's Garden & Rufas Point, to sites scattered
              across the islands of Batanta, Mansuar, Kri & Wayag, with our
              flexible diving packages.
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="subtitle-diving">Non-Diving Packages</div>
            <div className="text-diving mb-5">
              Experience the awe-inspiring beauty of Raja Ampat from the iconic
              Piaynemo Lookout Point, discover top-notch snorkelling spots &
              engage with local communities in their villages through our
              non-diving packages.
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-5">
            <div className="image-diving fixed mb-3">
              <img src={image11.src} alt="image7" />
            </div>
          </div>
          <div className="col-12 col-md-7">
            <div className="image-diving fixed mb-3">
              <img src={image12.src} alt="image7" />
            </div>
          </div>
          <div className="col-12 col-md-7">
            <div className="image-diving fixed mb-3">
              <img src={image13.src} alt="image7" />
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="image-diving fixed mb-3">
              <img src={image14.src} alt="image7" />
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="image-diving fixed mb-3">
              <img src={image15.src} alt="image7" />
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-3">
            <div
              className="image-diving px-4 long mb-3"
              style={{ backgroundImage: `url(${image16.src})` }}
            >
              <img src={image16.src} alt="image7" />
            </div>
          </div>
          <div className="col-12 col-md-8 offset-md-1">
            <div className="subtitle-diving">Diving Package</div>
            <div className="text-diving mb-3">
              This package includes 3-4 dives per day, focusing on sites across
              North & Central Raja Ampat. This full board package includes:
            </div>
            <ul>
              <li>3-4 guided boat dives per day</li>
              <li>1 dive guide for every 4 divers</li>
              <li>
                Roundtrip boat transfers from airport to island & dive spots
              </li>
              <li>
                Room with air conditioner & ensuite bathroom (double occupancy)
              </li>
              <li>Breakfast, lunch, snack, dinner, water, tea & coffee</li>
              <li>Stable electricity, WiFi & 4G connectivity</li>
            </ul>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Duration</th>
                    <th>Deluxe Room (per person)</th>
                    <th>Superior Room (per person)</th>
                    <th>Number of Dives</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>4 Nights</td>
                    <td>1,520 USD</td>
                    <td>1,320 USD</td>
                    <td>9-14 dives</td>
                  </tr>
                  <tr>
                    <td>5 Nights</td>
                    <td>1,900 USD</td>
                    <td>1,650 USD</td>
                    <td>12-18 dives</td>
                  </tr>
                  <tr>
                    <td>6 Nights</td>
                    <td>2,280 USD</td>
                    <td>1,980 USD</td>
                    <td>15-22 dives</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Extra</th>
                    <th>Status</th>
                    <th>Price per person</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Marine Park Fee</td>
                    <td>Compulsory</td>
                    <td>100 USD </td>
                  </tr>
                  <tr>
                    <td>
                      <div>Equipment Rental</div>
                      <div>(BCD, regulator, mask, wetsuit & fins)</div>
                    </td>
                    <td>Optional</td>
                    <td>25 USD per night</td>
                  </tr>
                  <tr>
                    <td>Suunto Dive Computer Rental</td>
                    <td>Optional</td>
                    <td>25 USD per night</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-3">
            <div
              className="image-diving px-4 long mb-3"
              style={{ backgroundImage: `url(${image17.src})` }}
            >
              <img src={image17.src} alt="image7" />
            </div>
          </div>
          <div className="col-12 col-md-8 offset-md-1">
            <div className="subtitle-diving">Non-Diving Package</div>
            <div className="text-diving mb-3">
              This package includes boat & land tours, focusing on sites across
              North & Central Raja Ampat. This full board package includes:
            </div>
            <ul>
              <li>
                Guided boat & land tours with snorkelling, hiking & village
                visits
              </li>
              <li>Snorkelling gears</li>
              <li>Roundtrip boat transfers from airport to island & spots</li>
              <li>
                Room with air conditioner & ensuite bathroom (double occupancy)
              </li>
              <li>Breakfast, lunch, snack, dinner, water, tea & coffee</li>
              <li>Stable electricity, WiFi & 4G connectivity</li>
            </ul>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Duration</th>
                    <th>Deluxe Room (per person)</th>
                    <th>Superior Room (per person)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>4 Nights</td>
                    <td>1,400 USD</td>
                    <td>1,200 USD</td>
                  </tr>
                  <tr>
                    <td>5 Nights</td>
                    <td>1,750 USD</td>
                    <td>1,500 USD</td>
                  </tr>
                  <tr>
                    <td>6 Nights</td>
                    <td>2,100 USD</td>
                    <td>1,800 USD</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Extra</th>
                    <th>Status</th>
                    <th>Price per person</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Marine Park Fee</td>
                    <td>Compulsory</td>
                    <td>100 USD </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-12">
            <div className="title-diving">Discounts</div>
            <div className="text-diving">
              <b>Children Policy</b>
            </div>
            <div className="table-responsive">
              <table className="mb-4">
                <tbody>
                  <tr>
                    <td className="w-50">Infants 1 - 4 years old</td>
                    <td>Free of Charge</td>
                  </tr>
                  <tr>
                    <td className="w-50">Children 5 - 9 years old</td>
                    <td>50%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-diving">
              <b>Returning Guests</b>
            </div>
            <div className="table-responsive">
              <table>
                <tbody>
                  <tr>
                    <td className="w-50">Infants 1 - 4 years old</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td className="w-50">2nd time & more</td>
                    <td>13%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-6">
            <div className="title-diving">Convenient Payment Options</div>
            <div className="table-responsive">
              <table>
                <tbody>
                  <tr>
                    <td>Cash</td>
                    <td>EUR, USD, IDR</td>
                  </tr>
                  <tr>
                    <td>Wise</td>
                    <td>Convenient & cost-effective option</td>
                  </tr>
                  <tr>
                    <td>Bank Transfer</td>
                    <td>Recommended for avoiding extra charges</td>
                  </tr>
                  <tr>
                    <td>Credit Card</td>
                    <td>Accepted but subject to potential fees{/*  */}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-12 col-md-5 offset-md-1">
            <div
              className="image-diving px-4 long mb-3"
              style={{ backgroundImage: `url(${image18.src})` }}
            >
              <img src={image18.src} alt="image7" />
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-12">
            <div className="title-diving">General Booking Procedure</div>
          </div>
          <div className="col-12 col-md-12">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="square-item"></div>
              <div className="text-diving larger mb-0">
                Contact us for more information & clarification
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="square-item"></div>

              <div className="text-diving larger mb-0">
                Confirm pax & availability
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="square-item"></div>

              <div className="text-diving larger mb-0">
                Receive agreed itinerary & invoice with total amount payable,
                payment details as well as terms & conditions
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="square-item"></div>

              <div className="text-diving larger mb-0">
                Pay 30% from total amount as deposit to confirm booking, deposit
                refundable for cancellations more than 60 days prior{" "}
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="square-item"></div>

              <div className="text-diving larger mb-0">
                Pay remaining amount at least 30 days before booking date
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="square-item"></div>

              <div className="text-diving larger mb-0">
                Arrive at Sorong airport, let us take care of everything & have
                fun!
              </div>
            </div>
          </div>
        </div>
        <div className="row card-custom_diving">
          <div className="col-12 col-md-12">
            <div className="title-diving">Getting Here</div>
            <div className="text-diving">
              The airport you should be landing at is Domine Eduard Osok Airport
              (IATA​: SOQ, ICAO: WASS), located in Sorong, West Papua,
              Indonesia. There is no direct international flight to Sorong, so
              you would need to first travel to either Jakarta or Bali before
              flying to Sorong.{" "}
            </div>
            <div className="text-diving">
              We recommend choosing Jakarta as there are more direct flight
              options from Jakarta. You would typically arrive at Sorong in the
              early morning, around 6:00am to 7:00am, in which we will be
              standing by to pick you up. We will have simple breakfast at our
              restaurant at the departing harbour, before departing for the
              resort by boat. The boat journey takes 2 to 3 hours.
            </div>
            <div className="text-diving mb-4">
              For telecommunication purpose, we recommend purchasing a Telkomsel
              sim card at Jakarta or Bali airport, as other telcos might be less
              reliable at Raja Ampat. Stable WiFi & 4G connectivity are both
              available on the island, so no worries about losing contact while
              on the island.
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="image-diving payment mb-3">
              <img src={image19.src} alt="image7" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="image-diving payment mb-3">
              <img src={image20.src} alt="image7" />
            </div>
          </div>
        </div>

        <div className="row card-custom_diving">
          <div className="col-12 col-md-12">
            <div className="image-diving h-200 mb-3">
              <img src={image12.src} alt="image7" />
            </div>
            <div className="title-diving mb-4">Contact Us Today</div>
          </div>
          <div className="row">
            <div className="col-4 col-md-4">
              <div></div>
              <div className="subtitle-diving">
                <a href="mailto:info@marinarajaampat.com">
                  info@marinarajaampat.com
                </a>
              </div>
              <div className="text-diving">
                Contact us via email for inquiries and booking information.
              </div>
            </div>
            <div className="col-4 col-md-4">
              <div></div>
              <div className="subtitle-diving">
                (+62) 813 1677 6671 / 821 9531 8542
              </div>
              <div className="text-diving">
                Reach out to our dedicated team for personalized assistance.
              </div>
            </div>
            <div className="col-4 col-md-4">
              <div></div>
              <div className="subtitle-diving">
                <a href="www.marinarajaampat.com">www.marinarajaampat.com</a>
              </div>
              <div className="text-diving">
                Visit our website for information about our packages and
                amenities.
              </div>
            </div>
            <div className="col-3 col-md-3">
              <img />
            </div>
            <div className="col-3 col-md-3">
              <img />
            </div>
            <div className="col-3 col-md-3">
              <img />
            </div>
            <div className="col-3 col-md-3">
              <img />
            </div>
          </div>
        </div>
      </div>
      {/* <div class="ratio ratio-16x9 w-100 mb-2" style={{ height: "600px" }}>
                    <iframe
                        src="https://marinarajaampat-31hnwcc.gamma.site/"
                        allowFullScreen
                    ></iframe>
                </div> */}
      <ModalComponent open={open} close={handleOpen} content={content} />
    </Layout>
  );
}
