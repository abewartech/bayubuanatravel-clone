import Image from "next/image";
import styles from "./Layout.module.scss";
import Link from "next/link";
import logo from "./../../../public/assets/logo/logo.png";
import mail from "./../../../public/assets/icon/mail.svg";
import call from "./../../../public/assets/icon/call.svg";
import menu from "./../../../public/assets/icon/menu.svg";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Container,
  Grid,
  Snackbar
} from "@mui/material";
import { Formik } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};
export default function Header(props) {
  const { handleShowMenu } = props;
  const [open, setOpen] = useState(false);
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
  return (
    <div className={styles.header}>
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
                <Link href="/">Home</Link>
              </div>
              <div className={styles.navItem}>
                <Link href="/about">About</Link>
              </div>
              <div className={styles.navItem}>
                <Link href="/packages">Packages</Link>
              </div>
              <div className={styles.navItem}>
                <Link href="/resort">Resort</Link>
              </div>
              <div className={styles.navItem}>
                <Link href="/gallery">Gallery</Link>
              </div>
              <div className={styles.navItem}>
                <Link href="/contact-us">Contact Us</Link>
              </div>
              <div className={styles.navItem}>
                <Button variant="contained" onClick={handleLogin}>
                  Login
                </Button>
              </div>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container
            maxWidth="sm"
            sx={{ height: "58vh", display: "flex", alignItems: "center" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Typography>
                  <Box fontSize={32}>Login</Box>
                  <Box fontSize={12} fontWeight={400} lineHeight="16px">
                    Welcome back!
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
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
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
                    /* and other goodies */
                  }) => (
                    <form
                      sx={{ margin: 10, height: "40px" }}
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit}
                    >
                      <Typography>
                        <Box fontSize={16} fontWeight={700} lineHeight="24px">
                          Email atau Username
                        </Box>
                      </Typography>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="username"
                        placeholder="contoh@versinema.com"
                      />
                      <Typography>
                        <Box fontSize={16} fontWeight={700} lineHeight="24px">
                          Password
                        </Box>
                      </Typography>
                      <input
                        type="password"
                        onChange={handleChange}
                        name="password"
                        autoComplete="on"
                        placeholder="Password kamu"
                      />
                      <div
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          marginTop: 10
                        }}
                      >
                        <a color="textPrimary" href="forgot-password" replace>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Forget Password ?
                          </Typography>
                        </a>
                      </div>
                      <div
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          marginTop: 10
                        }}
                      >
                        <Button type="submit">Masuk</Button>
                      </div>
                      <div
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          marginTop: 10
                        }}
                      >
                        <Link href="/register" passHref>
                          <Button component="a">Register</Button>
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
      </Modal>
    </div>
  );
}
