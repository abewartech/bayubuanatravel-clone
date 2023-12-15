import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import resort from "./../public/assets/resort.jpg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  Typography,
  TextField,
  TextareaAutosize
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
                } else if (
                  !/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(values.password)
                ) {
                  errors.password =
                    "Password must contain at least one capital letter and one symbol";
                }

                if (values.password !== values.confirmPassword) {
                  errors.confirmPassword = "Passwords do not match";
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
                  />
                  <ErrorMessage name="full_name" component="div" />

                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    marginBottom={1}
                    lineHeight="24px"
                  >
                    {t("address")}
                  </Typography>
                  <Field
                    type="text"
                    onChange={handleChange}
                    name="address"
                    render={({ field, form }) => (
                      <TextareaAutosize
                        {...field}
                        minRows={3} // Set the number of rows as needed
                        placeholder={t("yaddress")}
                        style={{ width: "100%" }}
                      />
                    )}
                  />
                  <ErrorMessage name="address" component="div" />

                  <Typography fontSize={16} fontWeight={500} lineHeight="24px">
                    {t("country")}
                  </Typography>
                  <Field
                    name="country"
                    render={({ field, form }) => (
                      <Select
                        options={options}
                        value={options.find(
                          (option) => option.value === field.value
                        )}
                        onChange={(option) =>
                          form.setFieldValue(field.name, option.value)
                        }
                      />
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

                  <Field
                    type="text"
                    onChange={handleChange}
                    name="email"
                    placeholder="contoh@example.com"
                  />
                  <ErrorMessage name="email" component="div" />

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
                      <PhoneInput
                        defaultCountry="id"
                        value={field.value}
                        onChange={(value) =>
                          form.setFieldValue("phone_number", value)
                        }
                        onBlur={field.onBlur}
                        className="form-control"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="phone_number" component="div" />

                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    marginBottom={1}
                    lineHeight="24px"
                    className="mt-2"
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
                      />
                    )}
                  </Field>
                  <ErrorMessage name="password" component="div" />

                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    marginBottom={1}
                    lineHeight="24px"
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
                      />
                    )}
                  </Field>
                  <ErrorMessage name="confirmPassword" component="div" />

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
                      marginTop: 10
                    }}
                  >
                    {t("ahaccount?")}
                    <Link href="/login" passHref>
                      <Button>{t("login")}</Button>
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
}
