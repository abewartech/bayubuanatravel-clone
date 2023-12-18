import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Box,
  Typography,
  Container,
  Grid,
  Snackbar,
  SnackbarContent,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import Visibility from "@mui/icons-material/Visibility";
import useTranslation from "next-translate/useTranslation";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import API from "../../common/api";
import { useRouter } from "next/router";
import useAuthStore from "../../store/loginStore";

const LoginForm = () => {
  const { t, lang } = useTranslation("common");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
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
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
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
              setLoggedIn(true);
            })
            .catch((error) => {
              console.error(error);
              setSubmitting(false);
              setSnackbarMessage("Email dan Password salah");
              setSnackbarOpen(true);
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

            {/* <Field type="text" name="email" placeholder="Email" />
                      <ErrorMessage name="email" component="div" /> */}

            <div style={{ position: "relative", marginBottom: "16px" }}>
              <Field
                type="text"
                onChange={handleChange}
                name="email"
                placeholder="Email"
                className={touched.email && errors.email ? "error-input" : ""}
                style={{
                  height: "60px",
                  backgroundColor: "#e9f0fe"
                }}
              />
              {errors.email && touched.email && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    bottom: "-2px",
                    fontSize: 11,
                    fontWeight: "bold"
                  }}
                >
                  {errors.email}
                </div>
              )}
            </div>

            <Typography
              fontSize={16}
              fontWeight={500}
              marginBottom={1}
              lineHeight="24px"
            >
              Password
            </Typography>

            <div style={{ position: "relative", marginBottom: "16px" }}>
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
                    name="password"
                    placeholder="Password"
                    className={
                      touched.password && errors.password ? "error-input" : ""
                    }
                    fullWidth
                    style={{ backgroundColor: "#e9f0fe" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{ backgroundColor: "white" }}
                        >
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              </Field>
              {errors.password && touched.password && (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    bottom: "-2px",
                    fontSize: 11,
                    fontWeight: "bold"
                  }}
                >
                  {errors.password}
                </div>
              )}
            </div>

            {/* <Field
                        type="password"
                        name="password"
                        placeholder="Your Password"
                      />
                      <ErrorMessage name="password" component="div" /> */}

            <div
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: 1
              }}
            >
              <a color="textPrimary" href="forgot-password" replace>
                <Typography variant="caption" display="block" gutterBottom>
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
              <LoadingButton
                loading={isSubmitting}
                loadingIndicator={
                  <CircularProgress
                    color="inherit"
                    size={22}
                    style={{ color: "white" }}
                  />
                }
                type="submit"
                style={{
                  backgroundColor: "#0197da",
                  color: isSubmitting ? "grey" : "white"
                }}
              >
                {t("login")}
              </LoadingButton>
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
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{ backgroundColor: "#ff0000" }} // You can customize the color
        />
      </Snackbar>
    </>
  );
};

export default LoginForm;
