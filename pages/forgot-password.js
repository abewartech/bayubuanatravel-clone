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

export default function ForgotPassword() {
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
  const breadcrumb = [
    {
      name: "Home"
    },
    {
      name: "Forgot Password"
    }
  ];
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  };
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState("email");

  const handleStepChange = (nextStep) => {
    setCurrentStep(nextStep);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("a");
    // Add logic based on the current step
    if (currentStep === "email") {
      // Add logic to send OTP to the provided email address
      // You can use an API call to generate and send the OTP
      // For simplicity, let's assume the API call is successful
      handleStepChange("otp");
    } else if (currentStep === "otp") {
      // Add logic to verify the OTP
      // If the OTP is valid, move to the next step (creating a new password)
      // If the OTP is invalid, display an error message
      handleStepChange("newPassword");
    } else if (currentStep === "newPassword") {
      // Add logic to submit the new password
      // After successfully resetting the password, you can redirect the user
      setSubmitting(false);
      router.push("/login"); // Redirect to the login page
    }
  };
  return (
    <Layout>
      <HeaderPage
        title={"Forgot Password"}
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
                if (currentStep === "newPassword") {
                  if (!values.password) {
                    errors.password = "Required";
                  } else if (values.password.length < 6) {
                    errors.password =
                      "Password must be at least 6 characters long";
                  } else if (!/[A-Z]/.test(values.password)) {
                    errors.password =
                      "Password must contain at least one capital letter";
                  }
                }

                if (values.password !== values.confirmPassword) {
                  errors.confirmPassword = "Passwords do not match";
                }
                return errors;
              }}
              onSubmit={handleSubmit}
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
                  onSubmit={handleSubmit}
                >
                  {currentStep === "email" && (
                    <>
                      <Typography
                        fontSize={16}
                        fontWeight={500}
                        marginBottom={1}
                        lineHeight="24px"
                      >
                        Please enter your email below. We will send you
                        instructions to recover your password.
                      </Typography>

                      <div
                        style={{ position: "relative", marginBottom: "16px" }}
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
                            backgroundColor: "rgb(254, 247, 247)"
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
                    </>
                  )}

                  {currentStep === "otp" && (
                    <>
                      <Typography
                        fontSize={16}
                        fontWeight={500}
                        marginBottom={1}
                        lineHeight="24px"
                      >
                        Please enter the OTP sent to your email.
                      </Typography>
                      <div
                        style={{ position: "relative", marginBottom: "16px" }}
                      >
                        <Typography
                          fontSize={16}
                          fontWeight={500}
                          marginBottom={1}
                          lineHeight="24px"
                        >
                          OTP
                        </Typography>
                        <Field
                          type="text"
                          onChange={handleChange}
                          name="otp"
                          placeholder="Enter OTP"
                          className={
                            touched.otp && errors.otp ? "error-input" : ""
                          }
                          style={{
                            height: "50px",
                            borderRadius: "4px",
                            padding: "8px",
                            width: "100%",
                            backgroundColor: "rgb(254, 247, 247)"
                          }}
                        />
                        {errors.otp && touched.otp && (
                          <div
                            style={{
                              color: "red",
                              position: "absolute",
                              bottom: "-13px"
                            }}
                          >
                            {errors.otp}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {currentStep === "newPassword" && (
                    <>
                      <Typography
                        fontSize={16}
                        fontWeight={500}
                        marginBottom={1}
                        lineHeight="24px"
                      >
                        Please enter a new password.
                      </Typography>
                      <div
                        style={{ position: "relative", marginBottom: "16px" }}
                      >
                        <Typography
                          fontSize={16}
                          fontWeight={500}
                          marginBottom={1}
                          lineHeight="24px"
                        >
                          New Password
                        </Typography>
                        <Field
                          type={showPassword ? "text" : "password"}
                          onChange={handleChange}
                          name="password"
                          placeholder="Enter new password"
                          className={
                            touched.password && errors.password
                              ? "error-input"
                              : ""
                          }
                          style={{
                            height: "50px",
                            borderRadius: "4px",
                            padding: "8px",
                            width: "100%",
                            backgroundColor: "rgb(254, 247, 247)"
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {errors.password && touched.password && (
                          <div
                            style={{
                              color: "red",
                              position: "absolute",
                              bottom: "-13px"
                            }}
                          >
                            {errors.password}
                          </div>
                        )}
                      </div>

                      <div
                        style={{ position: "relative", marginBottom: "16px" }}
                      >
                        <Typography
                          fontSize={16}
                          fontWeight={500}
                          marginBottom={1}
                          lineHeight="24px"
                        >
                          Confirm Password
                        </Typography>
                        <Field
                          type={showPassword ? "text" : "password"}
                          onChange={handleChange}
                          name="confirmPassword"
                          placeholder="Confirm new password"
                          className={
                            touched.confirmPassword && errors.confirmPassword
                              ? "error-input"
                              : ""
                          }
                          style={{
                            height: "50px",
                            borderRadius: "4px",
                            padding: "8px",
                            width: "100%",
                            backgroundColor: "rgb(254, 247, 247)"
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <div
                            style={{
                              color: "red",
                              position: "absolute",
                              bottom: "-13px"
                            }}
                          >
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <div
                    id="btn-login"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginTop: 10
                    }}
                  >
                    <Button type="submit">Next</Button>
                  </div>

                  <div
                    id="btn-regist"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginTop: 10
                    }}
                  >
                    Don&apos;t Have Account?
                    <Link href="/register" passHref>
                      <Button>Sign Up</Button>
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
