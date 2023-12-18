import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import resort from "./../public/assets/resort.jpg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  Typography,
  TextField,
  TextareaAutosize,
  Container,
  Grid
} from "@mui/material";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import axios from "axios";
import API from "../src/common/api";
import useAuthStore from "../src/store/loginStore";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useMemo, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { MuiPhone } from "../src/components/common/MuiPhone";
import LoginForm from "../src/components/Layout/LoginForm";

const DynamicModal = dynamic(() => import("@mui/material/Modal"), {
  ssr: false
});

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

export default function Register() {
  const router = useRouter();
  const { t, lang } = useTranslation("common");
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
  // const typePage = currUrl.query.type;
  const breadcrumb = [
    {
      name: "Home"
    },
    {
      name: "Register"
    }
  ];
  const initialValues = {
    address: "",
    country: "",
    email: "",
    full_name: "",
    gender: "",
    password: "",
    phone_number: "",
    confirmPassword: ""
  };
  const options = useMemo(() => countryList().getData(), []);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const handleLogin = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <Layout>
      <HeaderPage
        title={"Register"}
        breadcrumb={breadcrumb}
        background={resort}
      />
      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-5 p-4">
            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Required";
                } else if (values.password.length < 6) {
                  errors.password =
                    "Password must be at least 6 characters long";
                } else if (!/[A-Z]/.test(values.password)) {
                  errors.password =
                    "Password must contain at least one capital letter";
                }
                console.log(values);
                if (
                  !values.phone_number ||
                  !/^\+\d{3,}$/.test(values.phone_number.trim())
                ) {
                  errors.phone_number = "Required";
                }

                if (values.password !== values.confirmPassword) {
                  errors.confirmPassword = "Password doesn't match";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                API.post("/users/v1/register", values)
                  .then((res) => {
                    API.post("/users/v1/login", values)
                      .then((res) => {
                        setAccessToken(res.data.access_token);
                        setRefreshToken(res.data.refresh_token);
                        setUsername(values.email.split("@")[0]);
                        setEmail(values.email);
                        setSubmitting(false);
                        setLoggedIn(true);
                        router.push("/");
                      })
                      .catch((error) => {
                        console.error(error);
                        setSubmitting(false);
                      });
                  })
                  .catch((err) => {
                    setSubmitting(false);
                    if (err) {
                      console.log(err);
                    }
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
                <Form
                  sx={{ margin: 10, height: "40px" }}
                  noValidate
                  autoComplete="off"
                >
                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    marginBottom={1}
                    lineHeight="24px"
                  >
                    {t("fullname")}
                  </Typography>
                  <Field
                    type="text"
                    onChange={handleChange}
                    name="full_name"
                    placeholder={t("yfullname")}
                    style={{ height: "50px", backgroundColor: "#e9f0fe" }}
                  />
                  <ErrorMessage name="full_name" component="div" />

                  <Typography fontSize={16} fontWeight={500} lineHeight="24px">
                    {t("country")}
                  </Typography>
                  <Field
                    name="country"
                    render={({ field, form }) => (
                      <div
                        style={{ height: "50px", backgroundColor: "#e9f0fe" }}
                      >
                        <Select
                          options={options}
                          value={options.find(
                            (option) => option.value === field.value
                          )}
                          onChange={(option) =>
                            form.setFieldValue(field.name, option.value)
                          }
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              height: 50,
                              backgroundColor: "#e9f0fe"
                            })
                          }}
                        />
                      </div>
                    )}
                  />
                  <ErrorMessage name="country" component="div" />

                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    lineHeight="24px"
                    className="mt-2"
                  >
                    {t("gender")}
                  </Typography>
                  <div
                    role="group"
                    className="mb-1"
                    aria-labelledby="my-radio-group"
                    style={{ height: "50px" }}
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          type="radio"
                          name="gender"
                          value="l"
                          checked={values.gender === "l"}
                          onChange={handleChange}
                        />
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          type="radio"
                          name="gender"
                          value="p"
                          checked={values.gender === "p"}
                          onChange={handleChange}
                        />
                      }
                      label="Female"
                    />
                  </div>
                  <ErrorMessage name="gender" component="div" />

                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    marginBottom={1}
                    lineHeight="24px"
                  >
                    Email
                  </Typography>

                  <div style={{ position: "relative", marginBottom: "16px" }}>
                    <Field
                      type="text"
                      onChange={handleChange}
                      name="email"
                      placeholder="contoh@example.com"
                      className={
                        touched.email && errors.email ? "error-input" : ""
                      }
                      style={{
                        height: "50px",
                        borderRadius: "4px",
                        padding: "8px",
                        width: "100%",
                        backgroundColor: "#e9f0fe"
                      }}
                    />
                    {errors.email && touched.email && (
                      <div
                        style={{
                          color: "red",
                          position: "absolute",
                          bottom: "-13px"
                        }}
                      >
                        {errors.email}
                      </div>
                    )}
                  </div>
                  {/* <ErrorMessage name="email" component="div" /> */}

                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    marginBottom={1}
                    lineHeight="24px"
                  >
                    {t("pnumber")}
                  </Typography>

                  <Field name="phone_number">
                    {({ field, form }) => (
                      <div
                        style={{ height: "50px", backgroundColor: "#e9f0fe" }}
                      >
                        {/* <PhoneInput
                          defaultCountry="id"
                          value={field.value}
                          onChange={(value) =>
                            form.setFieldValue("phone_number", value)
                          }
                          onBlur={field.onBlur}
                          className="form-control"
                          style={{ height: "50px", backgroundColor: "#e9f0fe" }}
                        /> */}

                        <MuiPhone
                          defaultCountry="id"
                          value={field.value}
                          onChange={(value) =>
                            form.setFieldValue("phone_number", value)
                          }
                          fullWidth
                          onBlur={field.onBlur}
                          className={
                            touched.password && errors.password
                              ? "error-input"
                              : ""
                          }
                        />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    style={{
                      color: "red",
                      marginTop: 10,
                      fontSize: 11,
                      fontWeight: "bold"
                    }}
                  />

                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    marginBottom={1}
                    lineHeight="24px"
                    className="mt-3"
                  >
                    Password
                  </Typography>
                  <Field name="password">
                    {({ field, form }) => (
                      <TextField
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => {
                          form.handleChange(e);
                          form.setFieldValue("password", e.target.value);
                        }}
                        onBlur={() => form.handleBlur("password")}
                        value={field.value}
                        autoComplete="on"
                        placeholder={t("ypassword")}
                        fullWidth
                        className={
                          touched.password && errors.password
                            ? "error-input"
                            : ""
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        style={{ backgroundColor: "#e9f0fe" }}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{
                      color: "red",
                      marginTop: 10,
                      fontSize: 11,
                      fontWeight: "bold"
                    }}
                  />

                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    marginBottom={1}
                    lineHeight="24px"
                    className="mt-2"
                  >
                    {t("cpassword")}
                  </Typography>
                  <Field name="confirmPassword">
                    {({ field, form }) => (
                      <TextField
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => {
                          form.handleChange(e);
                          form.setFieldValue("confirmPassword", e.target.value);
                        }}
                        onBlur={() => form.handleBlur("confirmPassword")}
                        value={field.value}
                        autoComplete="on"
                        className={
                          touched.password && errors.password
                            ? "error-input"
                            : ""
                        }
                        placeholder={t("cpassword")}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        style={{ backgroundColor: "#e9f0fe" }}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    style={{
                      color: "red",
                      marginTop: 10,
                      fontSize: 11,
                      fontWeight: "bold"
                    }}
                  />

                  <div
                    id="btn-login"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginTop: 10
                    }}
                  >
                    <Button type="submit">{t("register")}</Button>
                  </div>

                  <div
                    id="btn-regist"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    {t("ahaccount?")}
                    <Button
                      variant="text"
                      onClick={handleLogin}
                      suppressHydrationWarning
                    >
                      {t("login")}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
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
                <LoginForm />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </DynamicModal>
    </Layout>
  );
}
