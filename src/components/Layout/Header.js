import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./Layout.module.scss";
import Link from "next/link";
import logo from "./../../../public/assets/logo/logo.png";
import mail from "./../../../public/assets/icon/mail.svg";
import call from "./../../../public/assets/icon/call.svg";
import menu from "./../../../public/assets/icon/menu.svg";
import PhoneIcon from "@mui/icons-material/Phone";
import Icon from "@mui/material/Icon";
import EmailIcon from "@mui/icons-material/Email";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
const DynamicModal = dynamic(() => import("@mui/material/Modal"), {
  ssr: false
});
import {
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Snackbar
} from "@mui/material";
import { ErrorMessage, Field, Formik } from "formik";
import axios from "axios";
import API from "../../common/api";
import LanguageSwitcher from "./LanguageSwitcher";
import useAuthStore from "../../store/loginStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 4,
  boxShadow: 24,
  p: 1
};
export default function Header(props) {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const { handleShowMenu } = props;
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const {
    isLoggedIn,
    accessToken,
    refreshToken,
    username,
    setLoggedIn,
    setAccessToken,
    setRefreshToken,
    setUsername,
    setEmail
  } = useAuthStore();
  const handleClose = () => setOpen(false);
  useEffect(() => {
    window.onscroll = function () {
      myFunction();
    };

    var header = document.getElementById("header-landing");
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.scrollY > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  }, []);

  const handleLogin = () => {
    setOpen(true);
  };
  // Function to handle logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setEmail("");
    router.push("/");
  };
  const handleProfile = () => {
    router.push("/profile");
  };
  return (
    <div className={styles.header}>
      <div className={styles.contactWrap}>
        <div className="container">
          <div className="d-flex justify-content-end">
            <div className="me-4">
              <span className="me-2">
                <PhoneIcon fontSize="small" style={{ color: "white" }} />
              </span>
              +6221-23509999
            </div>
            <div>
              <span className="me-2">
                <EmailIcon fontSize="small" style={{ fill: "white" }} />
              </span>
              office@bayubuanatravel.com
            </div>
          </div>
        </div>
      </div>
      <div id="header-landing" className={styles.mainHeader}>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-10 col-lg-4">
              <Link href="/" className={`${styles.logoWrap} `}>
                <Image src={logo} alt="logo" width={100} height={40} />
              </Link>
            </div>
            <div
              className={`${styles.navWrap} col-lg-8 col-10 justify-content-end`}
            >
              <div className={styles.navItem}>
                <Link href="/">{t("home")}</Link>
              </div>
              <div className={styles.navItem}>
                <Link href="/about">{t("about")}</Link>
              </div>
              <div className={styles.navItem}>
                <Link href="/packages">{t("packages")}</Link>
              </div>
              {/* <div className={styles.navItem}>
                <Link href="/resort">{t("resort")}</Link>
              </div> */}
              <div className={styles.navItem}>
                <Link href="/gallery">{t("gallery")}</Link>
              </div>
              <div className={styles.navItem}>
                <Link href="/contact-us">{t("contactus")}</Link>
              </div>
              <div className={`${styles.navItem} language-switcher`}>
                <LanguageSwitcher />
              </div>
              {isClient ? (
                <div className={styles.navItem}>
                  {isLoggedIn ? (
                    <div
                      onMouseEnter={() => setShowOptions(true)}
                      onMouseLeave={() => setShowOptions(false)}
                    >
                      {typeof window !== "undefined" && (
                        <span onClick={handleProfile}>
                          <div className={styles.avatarContainer}>
                            <Image
                              src={"/assets/wanna2.png"}
                              alt="User Avatar"
                              width={30}
                              height={30}
                            />
                            {username}
                          </div>
                        </span>
                      )}
                      {/* {showOptions && (
                        <div
                          className={styles.options}
                          style={{
                            position: "absolute",
                            paddingTop: "10px",
                            opacity: 1
                          }}
                        >
                          <div
                            style={{
                              borderRadius: 10,
                              background: "white",
                              display: "flex",
                              flexDirection: "column",
                              padding: "12px 20px",
                              opacity: 1
                            }}
                          >
                            <Button
                              variant="contained"
                              onClick={handleProfile} // Add a function to handle profile
                              suppressHydrationWarning
                              style={{
                                margin: "5px 0",
                                backgroundColor: "#0197da",
                                color: "#fff"
                              }}
                            >
                              Profile
                            </Button>
                            <Button
                              variant="contained"
                              onClick={handleLogout}
                              suppressHydrationWarning
                              style={{
                                margin: "5px 0",
                                backgroundColor: "#fdc202",
                                color: "#fff"
                              }}
                            >
                              {t("logout")}
                            </Button>
                          </div>
                        </div>
                      )} */}
                    </div>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleLogin}
                      suppressHydrationWarning
                      style={{ backgroundColor: "#0197da" }}
                    >
                      {t("login")}
                    </Button>
                  )}
                </div>
              ) : null}
            </div>
            <div
              onClick={handleShowMenu}
              className={`${styles.navWrap__mobile} ${styles.navWrap} col-2`}
            >
              <Image src={menu} alt="menu" />
            </div>
          </div>
        </div>
      </div>
      <DynamicModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                        router.push("/");
                        setAccessToken(res.data.access_token);
                        setRefreshToken(res.data.refresh_token);
                        setUsername(values.email.split("@")[0]);
                        setEmail(values.email);
                        setOpen(false);
                        setLoggedIn(true);
                        setShowButton(false);
                      })
                      .catch((error) => {
                        console.error(error);
                        setSubmitting(false);
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
                      <Field
                        type="text"
                        name="email"
                        placeholder="Your Email"
                      />
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
                        placeholder="Your Password"
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
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          style={{ backgroundColor: "#0197da" }}
                        >
                          Login
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
            {/* <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              autoHideDuration={6000}
              message={this.props.userStore.pesanError}
            /> */}
          </Container>
        </Box>
      </DynamicModal>
    </div>
  );
}
