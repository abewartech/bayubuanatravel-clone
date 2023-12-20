import useTranslation from "next-translate/useTranslation";
import styles from "./Profile.module.scss";
import useAuthStore from "../../store/loginStore";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import API from "../../common/api";
import {
  Button,
  Typography,
  TextField,
  Snackbar,
  SnackbarContent
} from "@mui/material";
import countryList from "react-select-country-list";
import "react-international-phone/style.css";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordChange(props) {
  const { data, handleNavigateMenu, currMenu } = props;
  const { t, lang } = useTranslation("common");
  const [userName, setUserName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const router = useRouter();
  const currUrl = router.pathname.split("/");
  const options = useMemo(() => countryList().getData(), []);
  const {
    isLoggedIn,
    accessToken,
    refreshToken,
    username,
    email,
    setLoggedIn,
    setAccessToken,
    setRefreshToken,
    setUsername,
    setLoginData,
    setEmail
  } = useAuthStore();
  useEffect(() => {
    setUserName(username);
  }, []);
  useEffect(() => {
    API.get("/users/v1/detail")
      .then((response) => {
        const userData = response.data;
      })
      .catch((error) => {
        console.error("Error fetching user details", error);
      });
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    current_password: "",
    new_password: "",
    confirmPassword: "",
    condition: "change_password"
  };
  return (
    <div className="col-lg-8 mb-5">
      <div className={styles.menuShow}>
        <h1 className="mb-4 mb-md-0">{t("personal")}</h1>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.current_password) {
              errors.current_password = "Required";
            }
            if (!values.new_password) {
              errors.new_password = "Required";
            } else if (values.new_password.length < 6) {
              errors.new_password =
                "New Password must be at least 6 characters long";
            } else if (!/[A-Z]/.test(values.new_password)) {
              errors.new_password =
                "New Password must contain at least one capital letter";
            }

            if (values.new_password !== values.confirmPassword) {
              errors.confirmPassword = "Passwords do not match";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            API.post("users/v1/change-password", values)
              .then((res) => {
                if (res.message === "success") {
                  setSnackbarMessage("Password has been changed successfully");
                  setSnackbarOpen(true);
                  setSubmitting(false);
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }
              })
              .catch((err) => {
                setSubmitting(false);
                if (err) {
                  if (err.data.message === "invalid password") {
                    setSnackbarMessage("Current password is incorrect");
                    setSnackbarOpen(true);
                  }
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
                className="mt-2"
              >
                Current Password
              </Typography>
              <Field name="current_password">
                {({ field, form }) => (
                  <TextField
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      form.handleChange(e);
                      form.setFieldValue("current_password", e.target.value);
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
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              </Field>
              <ErrorMessage name="current_password" component="div" />
              <Typography
                fontSize={16}
                fontWeight={500}
                marginBottom={1}
                lineHeight="24px"
                className="mt-2"
              >
                New Password
              </Typography>
              <Field name="new_password">
                {({ field, form }) => (
                  <TextField
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      form.handleChange(e);
                      form.setFieldValue("new_password", e.target.value);
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
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              </Field>
              <ErrorMessage name="new_password" component="div" />

              <Typography
                fontSize={16}
                fontWeight={500}
                marginBottom={1}
                lineHeight="24px"
                className="mt-2"
              >
                Confirm New Password
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
                            {showPassword ? <Visibility /> : <VisibilityOff />}
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
                <Button type="submit">Change Password</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <SnackbarContent message={snackbarMessage} />
      </Snackbar>
    </div>
  );
}
