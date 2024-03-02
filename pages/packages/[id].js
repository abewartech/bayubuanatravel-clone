import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import { styled } from "@mui/material/styles";
import thumbnail from "./../../public/assets/gallery/1.jpg";
import clock from "./../../public/assets/icon/clock.svg";
import styles from "./../../styles/pages/DetailPackages.module.scss";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Grid,
  Container,
  Snackbar,
  TextField,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardActions,
  Popover,
  Divider,
  IconButton,
  Alert,
  SnackbarContent
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import numeral from "numeral";
import Select from "react-select";
import NumberFormat from "react-number-format";
import DialogActions from "@mui/material/DialogActions";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import DialogContent from "@mui/material/DialogContent";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import DialogContentText from "@mui/material/DialogContentText";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DialogTitle from "@mui/material/DialogTitle";
import bi from "../../public/assets/bi.png";
import useTranslation from "next-translate/useTranslation";
import midtrans from "../../public/assets/midtrans.png";
import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import useAuthStore from "../../src/store/loginStore";
import API from "../../src/common/api";
import { generatePDF } from "../../src/utils/pdfUtils";
import NumberInputIntroduction from "../../src/components/common/NumberInputIntroduction";

dayjs.extend(isSameOrAfter);

const DynamicModal = dynamic(() => import("@mui/material/Modal"), {
  ssr: false
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: 4,
  p: 4
};
const styleModalCustom = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  maxHeight: "85vh", // Set the maximum height to 70% of the viewport height
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: 4,
  p: 4,
  overflowY: "auto" // Enable vertical scrolling if the content exceeds maxHeight
};

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12
    }
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2
  }
}));

const blue = {
  100: "#daecff",
  200: "#b6daff",
  300: "#66b2ff",
  400: "#3399ff",
  500: "#007fff",
  600: "#0072e5",
  700: "#0059B2",
  800: "#004c99"
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025"
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === "dark" ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: "increment"
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />
        }
      }}
      {...props}
      ref={ref}
    />
  );
});

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default function DetailPackages() {
  const { t, lang } = useTranslation("common");
  const [expand, setExpand] = useState(false);
  const [id, setId] = useState(0);
  const [amountChanges, setAmountChanges] = useState(0);
  const [qty, setQty] = useState(1);
  const [totalGuest, setTotalGuest] = useState(0);
  const [totalRoom, setTotalRoom] = useState(0);
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [stockId, setStockId] = useState(null);
  const [single, setSingle] = useState(0);
  const [double, setDouble] = useState(0);
  const [selectedTourDate, setSelectedTourDate] = useState("");
  const [triple, setTriple] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModalCustom, setOpenModalCustom] = useState(false);
  const [errorAmount, setErrorAmount] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [productData, setProductData] = useState(null);
  const [itineraryItems, setItineraryItems] = useState(Array(8).fill(null));
  const [checkedItinerary, setCheckedItinerary] = useState(
    Array.from({ length: itineraryItems.length }, () => Array(8).fill(true))
  );

  const [selectedItinerary, setSelectedItinerary] = useState([]);
  const [expandedItems, setExpandedItems] = useState(
    Array(itineraryItems.length).fill(false)
  );
  const [orderStatus, setOrderStatus] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElRoom, setAnchorElRoom] = useState(null);
  const [pesanError, setPesanError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);
  const [isDisableBook, setIsDisableBook] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [stocks, setStocks] = useState([]);
  const [totalPrice, setTotalPrice] = useState(
    productData
      ? lang === "en" && productData.base_price_usd !== null
        ? productData.base_price_usd
        : productData.base_price
      : 0
  );
  const [totalPriceFix, setTotalPriceFix] = useState(
    productData
      ? lang === "en" && productData.base_price_usd !== null
        ? productData.base_price_usd
        : productData.base_price
      : 0
  );
  const router = useRouter();

  const handleOpenGuest = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseGuest = () => {
    setAnchorEl(null);
  };

  const handleOpenRoom = (event) => {
    setAnchorElRoom(event.currentTarget);
  };

  const handleCloseRoom = () => {
    setAnchorElRoom(null);
  };

  const openGuest = Boolean(anchorEl);
  const openRoom = Boolean(anchorElRoom);

  const successPayment = () => {
    setOpenDialog(false);
    router.push("/profile?menu=history");
  };

  useEffect(() => {
    let intervalId; // Define intervalId here

    const fetchData = async () => {
      setOpenSnackbar(false);
      setOpenDialog(false);
      try {
        if (transactionId) {
          const response = await API.get(`orders/v1/client/${transactionId}`);
          console.log("Response data:", response.data);
          if (response.data.status !== "INITIATED") {
            // If it's "ORDERED," stop the interval
            clearInterval(intervalId);
            setPesanError("Order Success");
            setOpenSnackbar(true);
            setOpenDialog(true);
            setOpen(false);
          }
          setOrderStatus(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setOpenSnackbar(false);
        setOpenDialog(false);
      }
    };

    if (transactionId) {
      fetchData();
      intervalId = setInterval(fetchData, 5000); // Set intervalId
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [transactionId]);

  const toggleExpandedItem = (idx) => {
    const updatedExpandedItems = [...expandedItems];
    updatedExpandedItems[idx] = !updatedExpandedItems[idx];
    setExpandedItems(updatedExpandedItems);
  };

  const {
    isLoggedIn,
    accessToken,
    refreshToken,
    username,
    setLoggedIn,
    setAccessToken,
    setRefreshToken,
    setUsername,
    setLoginData
  } = useAuthStore();

  const handleQtyChange = (e, val) => {
    setQty(val);
  };

  const updateTotalCounts = () => {
    const totalAdults = adult;
    const totalChildren = child;
    const totalSingleRooms = single;
    const totalDoubleRooms = double;
    const totalTripleRooms = triple;

    const newTotalGuest = totalAdults + totalChildren;
    const newTotalRoom = totalSingleRooms + totalDoubleRooms + totalTripleRooms;
    setTotalGuest(newTotalGuest);
    setTotalRoom(newTotalRoom);
  };

  // Define a separate debounced function for checking guests vs rooms
  const debounceCheckGuestsVsRooms = debounce(() => {
    const newTotalGuest = totalGuest;
    const forjustchecknewTotalGuest = single * 1 + double * 2 + triple * 3;

    if (forjustchecknewTotalGuest !== newTotalGuest) {
      setIsDisableBook(true);
      setPesanError("The number of guests does not match the number of rooms!");
      setOpenSnackbarError(true);
    } else {
      setIsDisableBook(false);
    }
  }, 1200);

  useEffect(() => {
    updateTotalCounts();
    debounceCheckGuestsVsRooms();
  }, [adult, child, single, double, triple]);

  const handleAdultChange = (e, val) => {
    if (val >= 0) {
      setAdult(val);
      updateTotalCounts();
    } else {
      // If the new value is less than 1, set it to 1
      setAdult(1);
      updateTotalCounts();
    }
  };

  const handleChildChange = (e, val) => {
    if (val >= 0) {
      setChild(val);
      updateTotalCounts();
    }
  };

  const handleSingleChange = (e, val) => {
    if (val >= 0) {
      setSingle(val);
      updateTotalCounts();
    }
  };

  const handleDoubleChange = (e, val) => {
    if (val >= 0) {
      setDouble(val);
      updateTotalCounts();
    }
  };

  const handleTripleChange = (e, val) => {
    if (val >= 0) {
      setTriple(val);
      updateTotalCounts();
    }
  };

  useEffect(() => {
    setTotalPriceFix(parseFloat((totalPrice * qty).toFixed(2)));
  }, [qty]);

  const groupActivitiesByDays = (activities) => {
    const groupedActivities = {};
    activities.forEach((activity) => {
      const { activity_days } = activity;
      if (!groupedActivities[activity_days]) {
        groupedActivities[activity_days] = [];
      }
      groupedActivities[activity_days].push(activity);
    });
    return groupedActivities;
  };

  const handleCheckboxChange = (idx, idxact) => {
    const updatedCheckedItinerary = [...checkedItinerary];
    updatedCheckedItinerary[idx][idxact] =
      !updatedCheckedItinerary[idx][idxact];
    setCheckedItinerary(updatedCheckedItinerary);

    if (updatedCheckedItinerary[idx][idxact]) {
      const activities = productData?.activities;
      if (activities) {
        const groupedActivities = groupActivitiesByDays(activities);
        const selectedActivity = groupedActivities[idx]?.[idxact];
        if (selectedActivity) {
          const productSubIdToAdd = selectedActivity.activity_id;
          setSelectedItinerary((prevSelected) => [
            ...prevSelected,
            productSubIdToAdd
          ]);
        }
      }

      const productSubPrice =
        (lang === "en" && productData.activities[idx].price_usd !== null
          ? productData.activities[idx].price_usd
          : productData.activities[idx].price) * qty;
      setTotalPrice((prevTotalPrice) => prevTotalPrice + productSubPrice);
      setTotalPriceFix((prevTotalPrice) => prevTotalPrice + productSubPrice);
    } else {
      const activities = productData?.activities;
      if (activities) {
        const groupedActivities = groupActivitiesByDays(activities);
        const selectedActivity = groupedActivities[idx]?.[idxact];
        if (selectedActivity) {
          const productSubIdToRemove = selectedActivity.activity_id;
          setSelectedItinerary((prevSelected) =>
            prevSelected.filter((item) => item !== productSubIdToRemove)
          );
        }
      }

      const productSubsPrice = productData.activities.reduce(
        (acc, sub, subIdx) =>
          updatedCheckedItinerary[subIdx][idxact]
            ? acc +
              (lang === "en" && sub.price_usd !== null
                ? sub.price_usd
                : sub.price) *
                qty
            : acc,
        0
      );
      setTotalPrice(productSubsPrice);
      setTotalPriceFix(productSubsPrice);
    }
  };

  const fetchProductData = async (productId) => {
    try {
      const response = await axios.get(
        `https://api.marinarajaampat.id/products/v1/external/${productId}`
      );
      setProductData(response.data.data);
      setStocks(response.data.data.stocks);
      if (response.data.data && response.data.data.activities) {
        const groupedData = response.data.data.activities.reduce(
          (acc, curr) => {
            const { activity_days, ...rest } = curr;
            if (!acc[activity_days]) {
              acc[activity_days] = [];
            }
            acc[activity_days].push(rest);
            return acc;
          },
          {}
        );

        const groupedDataArray = Object.entries(groupedData).map(
          ([activity_days, activities]) => ({
            activity_days: parseInt(activity_days),
            activities
          })
        );

        const updatedItineraryItems = groupedDataArray.map((sub) => {
          return {
            title: `Day ${sub.activity_days}`,
            activities: sub.activities, // You can modify this based on your product_sub structure
            description: lang === "en" ? sub.description_en : sub.description_id
            // Add other properties as needed
          };
        });

        setItineraryItems(updatedItineraryItems);
        const productSubIds = response.data.data.activities.map(
          (sub) => sub.activity_id
        );
        setSelectedItinerary(productSubIds);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    // When the component mounts, fetch product data for a specific ID (e.g., 1)
    const { id } = router.query;

    fetchProductData(id); // You can replace 1 with the actual ID you want to fetch

    // ... your other useEffect code ...
  }, []);

  useEffect(() => {
    // Calculate total price whenever productData changes
    if (productData && productData.activities) {
      const productSubsPrice = productData.activities.reduce(
        (acc, sub) =>
          acc +
          (lang === "en" && sub.base_price_usd !== null
            ? sub.base_price_usd
            : sub.base_price),
        0
      );
      setTotalPrice(productSubsPrice);
      setTotalPriceFix(productSubsPrice);
    }
  }, [productData, lang]);

  const handleShowDetail = (id) => {
    toggleExpandedItem(id);
    // setExpand(!expand);
    setId(id);
    // // Create a new array based on the current state
    // const updatedExpandedItems = [...expandedItems];
    // // Toggle the expanded state for the clicked item
    // updatedExpandedItems[id] = !updatedExpandedItems[id];
    // // Update the state with the new array
    // setExpandedItems(updatedExpandedItems);
  };
  const handleBook = () => {
    if (isLoggedIn) {
      setOpen(true);
    } else {
      setOpenModalLogin(true);
    }
  };
  const handleCloseLogin = () => setOpenModalLogin(false);
  const handleClose = () => setOpen(false);
  const handleCloseModalCustom = () => setOpenModalCustom(false);

  const amountChange = (e) => {
    if (productData && productData.minimum_down_payment) {
      const minimumPaymentPercentage = productData.minimum_down_payment;
      const calculatedMinimumAmount =
        (minimumPaymentPercentage / 100) * totalPriceFix;

      setErrorAmount(e.target.value < calculatedMinimumAmount);
    }

    setAmountChanges(e.target.value);
  };

  const handleMidtrans = () => {
    if (amountChanges) {
      if (stockId) {
        if (selectedItinerary.length > 0 && selectedItinerary) {
          const queryParams = {
            amount: parseFloat(amountChanges),
            product_id: parseInt(router.query.id, 10),
            stock_id: parseInt(productData.stock_id, 10),
            activities: selectedItinerary,
            voucher_code: promoCode,
            // qty: qty,
            additional_info: {
              product_name: productData.title,
              product_image: productData.image_url,
              nama: username,
              no_hp: "",
              no_identitas: "",
              email: "",
              alamat: "",
              selectedTourDate
            },
            currency: lang === "en" ? "USD" : "IDR",
            price: productData.price,
            totalPriceFix,
            metadata: {
              adult,
              child,
              single,
              double,
              triple
            }
          };

          const queryParamsString = btoa(JSON.stringify(queryParams));

          router.push({
            pathname: "/detailorder",
            query: { id: queryParamsString }
          });
        } else {
          setPesanError("Select Itinerary");
          setOpenSnackbar(true);
        }
      } else {
        setPesanError("Select Tour Date");
        setOpenSnackbar(true);
      }
    } else {
      setPesanError(t("amountk"));
      setOpenSnackbar(true);
    }
  };

  const handlePromo = async () => {
    try {
      const response = await API.get(
        `promo/v1/ex/eligibility?promo_code=${promoCode}`
      );

      console.log("Response data:", response.data);
      if (response.data) {
        console.log("a");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const print = () => {
    const { id } = router.query;
    // const printURL = `/printpdfpackage?id=${id}`; // Replace with your URL and parameter
    if (lang === "id") {
      const printURL = `/id/printpdfpackage?id=${id}`;
      window.open(printURL, "_blank");
    } else {
      const printURL = `/printpdfpackage?id=${id}`;
      window.open(printURL, "_blank");
    }
  };

  const handleDownloadPDF = () => {
    if (productData) {
      const { title, description, image_url, activities } = productData;
      const qty = 1; // Update with your actual quantity
      const totalPrice =
        productData.base_price_usd !== null
          ? productData.base_price_usd
          : productData.base_price;

      generatePDF(
        { title, description, image_url, activities, lang },
        qty,
        totalPrice,
        itineraryItems, // Pass itineraryItems here
        (pdf) => {
          pdf.save(`${title}.pdf`);
        }
      );
    }
  };

  return (
    <Layout>
      <div className="container my-4">
        <div className="row">
          <div className="col-lg-5">
            <div className="mb-3 position-relative">
              {productData && productData.image_url && (
                <Image
                  src={productData && productData.image_url}
                  alt="thumbnail"
                  className={`w-100 h-50 ${styles.img}`}
                  width={500}
                  height={200}
                />
              )}
              <div className={styles.date}>
                <span className="me-2">
                  <Image src={clock} width={10} height={10} alt="clock" />
                </span>
                {productData && productData.duration} Days
              </div>
            </div>
            <div className="mb-3">
              <div
                className={styles.topLabel}
                style={{ fontSize: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "500" }}>Base Price :</span>
                {lang === "en"
                  ? ` USD ${
                      (productData && productData.base_price_usd) ||
                      productData?.base_price
                    }`
                  : `Rp. ${
                      productData &&
                      numeral(productData.base_price).format("0,0")
                    }`}
              </div>

              <div className={styles.topTitle}>
                {productData && productData.title}
              </div>
            </div>
            <div>
              {lang === "en" ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: productData?.description_en
                  }}
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: productData?.description_id
                  }}
                />
              )}
            </div>
            <div className={styles.itineraryTitle}>{t("itinerary")}</div>
            {/* <p className="mb-3">{t("customize")} </p> */}
            {itineraryItems.map((item, idx) => {
              return (
                <div key={idx} className={styles.itineraryItem}>
                  <div className={styles.itineraryDetail}>
                    <div className={styles.number}>{idx + 1}</div>
                    <div
                      onClick={() => handleShowDetail(idx)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>{item?.title}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    />
                    {item &&
                      item.activities.map((activity, idxact) => (
                        <Typography className="" key={idxact}>
                          {activity.name}
                        </Typography>
                      ))}
                  </div>
                </div>
              );
            })}
            <div className="mt-2">
              <Button
                variant="contained"
                onClick={handleDownloadPDF}
                style={{ backgroundColor: "#feed13", color: "#0197da" }}
              >
                Download PDF
              </Button>
            </div>
          </div>
          <div className="col-lg-7">
            <Card className="mb-5 p-3" sx={{ maxWidth: 575 }}>
              <CardContent>
                <div className="row mb-4">
                  <div className="col-12">
                    <Typography className="mb-1 mt-1">
                      Select Tour Date
                    </Typography>
                    <Select
                      options={stocks
                        .filter((stock) =>
                          dayjs(stock.start_date).isSameOrAfter(dayjs(), "day")
                        )
                        .map((stock) => ({
                          value: stock.id,
                          label: `${dayjs(stock.start_date).format(
                            "DD MMMM YYYY"
                          )} - ${dayjs(stock.end_date).format("DD MMMM YYYY")}`,
                          isDisabled: dayjs(stock.start_date).isBefore(
                            dayjs(),
                            "day"
                          ) // Disable if start_date is before today
                        }))}
                      placeholder="Select available dates"
                      onChange={(val) => {
                        if (val) {
                          // Check if val is not null or undefined
                          setStockId(val.value);
                          setSelectedTourDate(val.label);
                        } else {
                          setStockId(null); // Reset stockId if no value is selected
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <Typography className="mb-1">Guests</Typography>
                    <NumberInputIntroduction
                      onClick={handleOpenGuest}
                      onFocus={handleOpenGuest}
                      onMouseDown={handleOpenGuest}
                      aria-describedby={"guests"}
                      value={totalGuest}
                      disabled
                    />
                    <Popover
                      id={"guests"}
                      open={openGuest}
                      anchorEl={anchorEl}
                      onClose={handleCloseGuest}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                      }}
                    >
                      <Grid
                        container
                        sx={{ p: 1.5 }}
                        direction="column"
                        spacing={2}
                      >
                        <Grid item>
                          <Typography>Guests:</Typography>
                          <Divider />
                        </Grid>
                        <Grid item>
                          <Grid container direction="row" spacing={2}>
                            <Grid item xs={6}>
                              <Typography className="mb-1">Adults:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <NumberInputIntroduction
                                min={0}
                                max={999}
                                value={adult}
                                onChange={handleAdultChange}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row" spacing={2}>
                            <Grid item xs={6}>
                              <Typography className="mb-1">
                                Childrens:
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <NumberInputIntroduction
                                min={0}
                                max={999}
                                value={child}
                                onChange={handleChildChange}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={handleCloseGuest}
                          >
                            Confirm
                          </Button>
                        </Grid>
                      </Grid>
                    </Popover>
                  </div>
                  <div className="col-6">
                    <Typography className="mb-1">Rooms</Typography>
                    <NumberInputIntroduction
                      onClick={handleOpenRoom}
                      onFocus={handleOpenRoom}
                      onMouseDown={handleOpenRoom}
                      aria-describedby={"rooms"}
                      value={totalRoom}
                      disabled
                    />
                    <Popover
                      id={"rooms"}
                      open={openRoom}
                      anchorEl={anchorElRoom}
                      onClose={handleCloseRoom}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                      }}
                    >
                      <Grid
                        container
                        sx={{ p: 1.5 }}
                        direction="column"
                        spacing={2}
                      >
                        <Grid item>
                          <Typography>Rooms:</Typography>
                          <Divider />
                        </Grid>
                        <Grid item>
                          <Grid container direction="row" spacing={2}>
                            <Grid item xs={6}>
                              <Typography className="mb-1">Single:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <NumberInputIntroduction
                                min={0}
                                max={999}
                                value={single}
                                onChange={handleSingleChange}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row" spacing={2}>
                            <Grid item xs={6}>
                              <Typography className="mb-1">Double:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <NumberInputIntroduction
                                min={0}
                                max={999}
                                value={double}
                                onChange={handleDoubleChange}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="row" spacing={2}>
                            <Grid item xs={6}>
                              <Typography className="mb-1">Triple:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <NumberInputIntroduction
                                min={0}
                                max={999}
                                value={triple}
                                onChange={handleTripleChange}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={handleCloseRoom}
                          >
                            Confirm
                          </Button>
                        </Grid>
                      </Grid>
                    </Popover>
                  </div>
                </div>
              </CardContent>
              <CardActions className="mb-2">
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => setOpenModalCustom(true)}
                    >
                      Customize
                    </Button>
                  </Grid>
                  <Grid item xs={8}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleBook}
                      disabled={isDisableBook}
                    >
                      {t("booknow")}
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>

            {/* <div className="row">
              <div class="col-auto me-auto"></div>
              <div class="col-auto">
                <NumberInput
                  aria-label="Quantity Input"
                  min={1}
                  max={999}
                  value={qty}
                  onChange={handleQtyChange}
                />
              </div>
            </div> */}
            {/* <div class="row mt-3">
              <div class="col-auto me-auto"></div>
              <div class="col-auto">
                <div>{t("totalprice")}</div>
                <div style={{ fontWeight: "bold" }}>
                  {lang === "en"
                    ? `USD ${numeral(totalPriceFix).format("0,0.00")}`
                    : `Rp. ${numeral(totalPriceFix).format("0,0")}`}
                </div>
              </div>
            </div> */}
            {/* <div id="book" className="mt-2">
              <Button
                variant="contained"
                onClick={handleBook}
                style={{ backgroundColor: "#0197da" }}
              >
                {t("booknow")}
              </Button>
            </div> */}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none"
        }}
      >
        <Box sx={style}>
          <div
            sx={{
              backgroundColor: "#181818",
              boxShadow: 5,
              padding: 5,
              margin: 2,
              overflowY: "auto",
              height: "-webkit-fill-available"
            }}
          ></div>
          <Typography component="div">
            <Box fontSize={24} lineHeight="32px" fontWeight={500}>
              {t("continuepaying")}
            </Box>

            <Box
              fontSize={12}
              marginBottom={2}
              lineHeight="16px"
              fontWeight={400}
            >
              {productData && productData.description}
            </Box>
          </Typography>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex  align-items-center">
              <Box className="me-3">
                <Image
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "15px"
                  }}
                  src={thumbnail}
                  alt="productThumb"
                />
              </Box>
              <Box>
                <Typography
                  id="tess"
                  fontSize={16}
                  lineHeight="24px"
                  fontWeight={700}
                >
                  {productData && productData.title}
                </Typography>
                <Typography
                  fontSize={12}
                  lineHeight="16px"
                  fontWeight={400}
                  style={{
                    display: "contents"
                  }}
                >
                  {productData && productData.additional_info}
                </Typography>
              </Box>
            </div>
            <div className="d-flex">
              <Typography
                fontSize={20}
                style={{
                  clear: "both"
                }}
                lineHeight="24px"
                fontWeight={700}
              >
                {lang === "en"
                  ? `USD ${numeral(totalPriceFix).format("0,0.00")}`
                  : `Rp. ${numeral(totalPriceFix).format("0,0")}`}
              </Typography>
            </div>
          </div>
          <TextField
            error={errorAmount}
            label={t("amount")}
            type="number"
            onChange={amountChange}
            fullWidth
          />
          {/* <NumberFormat
      customInput={TextField}
      error={errorAmount}
      label={t("amount")}
      type="tel" // 'tel' allows entering only numeric values
      onChange={amountChange}
      fullWidth
      thousandSeparator // Add thousand separator
      value={amountChanges}
    /> */}
          <Typography
            fontSize={12}
            lineHeight="16px"
            fontWeight={400}
            marginBottom={3}
            className="mt-2"
          >
            {`*${t("Jumlahminimumyangperludibayarkan")}
            ${productData && productData.minimum_down_payment}
            %`}
          </Typography>
          {/* <Grid container spacing={2}>
            <Grid item xs={8} md={8}>
              <TextField
                label={t("promocode")}
                variant="outlined"
                size="small"
                fullWidth
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <Button variant="outlined" onClick={handlePromo}>
                {t("usepromo")}
              </Button>
            </Grid>
          </Grid> */}
          <Grid container spacing={2} className="mt-2">
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                onClick={handleMidtrans}
                disabled={errorAmount}
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid container id="logo-payment" className="mt-5">
            <Grid item xs={8} md={8}>
              <Typography>
                <Box fontSize="12px" lineHeight="16px">
                  Support By
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={2} md={2}>
              <img src={bi.src} alt="bi" />
            </Grid>
            <Grid item xs={2} md={2}>
              <img src={midtrans.src} alt="bi" />
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <DynamicModal
        open={openModalLogin}
        onClose={handleCloseLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "10px"
            }}
          >
            <IconButton onClick={handleCloseLogin} color="primary">
              <CloseIcon />
            </IconButton>
          </div>
          <Container
            maxWidth="sm"
            sx={{ height: "65vh", display: "flex", alignItems: "center" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Typography>
                  <Box fontSize={32} fontWeight={600}>
                    {t("login")}
                  </Box>
                  <Box fontSize={12} fontWeight={400} lineHeight="16px">
                    {t("welcomeback")}
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = "Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    API.post("/users/v1/login", values)
                      .then((res) => {
                        setSubmitting(false);
                        setAccessToken(res.data.access_token);
                        setRefreshToken(res.data.refresh_token);
                        setLoginData(res.data.user_data);
                        setUsername(values.email.split("@")[0]);
                        setOpen(true);
                        setOpenModalLogin(false);
                        setLoggedIn(true);
                      })
                      .catch((error) => {
                        console.error(error);
                        setSubmitting(false);
                        setPesanError("Email dan Password salah");
                        setOpenSnackbarError(true);
                      });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                  }) => (
                    <form
                      sx={{ margin: 10, height: "40px" }}
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit}
                    >
                      <Typography
                        fontSize={16}
                        fontWeight={500}
                        marginBottom={1}
                        lineHeight="24px"
                      >
                        Email
                      </Typography>
                      <Field type="text" name="email" placeholder="Email" />
                      <ErrorMessage name="email" component="div" />

                      <Typography
                        fontSize={16}
                        fontWeight={500}
                        marginBottom={1}
                        lineHeight="24px"
                      >
                        Password
                      </Typography>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                      <ErrorMessage name="password" component="div" />

                      <div
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          marginTop: 1
                        }}
                      >
                        <a color="textPrimary" href="forgot-password" replace>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            {t("forgot")}
                          </Typography>
                        </a>
                      </div>
                      <div
                        id="btn-login"
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          marginTop: 16
                        }}
                      >
                        <Button type="submit" disabled={isSubmitting}>
                          {t("login")}
                        </Button>
                      </div>
                      <div
                        id="btn-regist"
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start"
                        }}
                      >
                        {t("dont")}
                        <Link href="/register" passHref>
                          <Button>{t("register")}</Button>
                        </Link>
                      </div>
                    </form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DynamicModal>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        message={pesanError}
        onClose={() => setOpenSnackbar(false)}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={openSnackbarError}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbarError(false)}
      >
        <SnackbarContent
          message={pesanError}
          style={{ backgroundColor: "#ff0000" }} // You can customize the color
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
      <Modal
        open={openModalCustom}
        onClose={handleCloseModalCustom}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none"
        }}
      >
        <Box sx={styleModalCustom}>
          <div
            sx={{
              backgroundColor: "#181818",
              boxShadow: 5,
              padding: 5,
              margin: 2,
              overflowY: "auto",
              height: "-webkit-fill-available"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                margin: "10px"
              }}
            >
              <IconButton onClick={handleCloseModalCustom} color="primary">
                <CloseIcon />
              </IconButton>
            </div>
            <Typography variant="h5" gutterBottom className="text-center">
              Customize Tour
            </Typography>
            <Divider className="mb-5" />
            <div className={styles.itineraryTitle}>{t("itinerary")}</div>
            <p className="mb-3">{t("customize")} </p>
            {itineraryItems.map((item, idx) => {
              return (
                <div key={idx} className={styles.itineraryItem}>
                  <div className={styles.itineraryDetail}>
                    <div className={styles.number}>{idx + 1}</div>
                    <div
                      onClick={() => handleShowDetail(idx)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>{item?.title}</span>
                      <span
                        className={`${styles.arrowIcon} ${
                          expandedItems[idx] ? styles.active : ""
                        }`}
                      >
                        {expandedItems[idx] ? "▲" : "▼"}
                      </span>
                    </div>
                  </div>
                  {expandedItems[idx] && (
                    <div className="p-4">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item?.description
                        }}
                      />
                      {item &&
                        item.activities.map((activity, idxact) => (
                          <div key={idxact} className="mt-2">
                            <FormControlLabel
                              key={idxact}
                              control={
                                <Android12Switch
                                  checked={
                                    checkedItinerary[idx] &&
                                    checkedItinerary[idx][idxact]
                                  }
                                  disabled={activity.is_mandatory}
                                  onChange={() =>
                                    handleCheckboxChange(idx, idxact)
                                  }
                                />
                              }
                              label={`${activity.name}`}
                              className="mt-2"
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="mt-5" style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={handleCloseModalCustom}
                className="w-25"
              >
                Update
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </Layout>
  );
}
