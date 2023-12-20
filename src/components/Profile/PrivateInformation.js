import useTranslation from "next-translate/useTranslation";
import styles from "./Profile.module.scss";
import Image from "next/image";
import useAuthStore from "../../store/loginStore";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import API from "../../common/api";
import {
  Button,
  FormControlLabel,
  Radio,
  Typography,
  TextareaAutosize
} from "@mui/material";
import { PhoneInput } from "react-international-phone";
import Select from "react-select";
import countryList from "react-select-country-list";
import "react-international-phone/style.css";

export default function PrivateInformation(props) {
  const { data, handleNavigateMenu, currMenu } = props;
  const { t, lang } = useTranslation("common");
  const [userName, setUserName] = useState("");
  const [dataUser, setDataUser] = useState(null);
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
    setEmail,
    loginData
  } = useAuthStore();
  useEffect(() => {
    setUserName(username);
  }, []);
  useEffect(() => {
    API.get(`/users/v1/${loginData.id}`)
      .then((response) => {
        const userData = response.data;
        setDataUser(userData)
      })
      .catch((error) => {
        console.error("Error fetching user details", error);
      });
  }, []);
  const navigationMenu = (url, curr, param, active, unActive, text) => {
    return (
      <div
        onClick={() => handleNavigateMenu(url)}
        className={`${styles.navItem} ${
          currMenu === url && styles.navItem__active
        }`}
      >
        <Image src={currMenu === url ? active : unActive} alt="personal" />
        {text}
      </div>
    );
  };
  const initialValues = {
    address: loginData?.address,
    country: "",
    email: email,
    full_name: loginData?.full_name,
    gender: "",
    password: ""
  };
  return (
    <div className="col-lg-8 mb-5">
      <div className={styles.menuShow}>
        <h1 className="mb-4 mb-md-0">{t("personal")}</h1>
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
              errors.password = "Password must be at least 6 characters long";
            } else if (!/[A-Z]/.test(values.password)) {
              errors.password =
                "Password must contain at least one capital letter";
            }

            if (values.password !== values.confirmPassword) {
              errors.confirmPassword = "Passwords do not match";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            API.post("users/v1/", values)
              .then((res) => {
                API.post("/users/v1/login", values)
                  .then((res) => {
                    setAccessToken(res.data.access_token);
                    setRefreshToken(res.data.refresh_token);
                    setUsername(values.email.split("@")[0]);
                    setEmail(values.email);
                    setLoginData(res.data.user_data);
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
                    style={{ width: "100%", padding: 10 }}
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

              <div
                id="btn-login"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginTop: 10
                }}
              >
                <Button type="submit">Update info</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
