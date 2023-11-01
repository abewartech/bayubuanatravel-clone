import useTranslation from "next-translate/useTranslation";
import styles from "./Profile.module.scss";
import Image from "next/image";
import useAuthStore from "../../store/loginStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import API from "../../common/api";
import { Button, FormControlLabel, Radio, Typography } from "@mui/material";
import Link from "next/link";

export default function PrivateInformation(props) {
  const { data, handleNavigateMenu, currMenu } = props;
  const { t, lang } = useTranslation("common");
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const currUrl = router.pathname.split("/");
  const {
    isLoggedIn,
    accessToken,
    refreshToken,
    username,
    email,
    setLoggedIn,
    setAccessToken,
    setRefreshToken,
    setUsername
  } = useAuthStore();
  useEffect(() => {
    setUserName(username);
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
    address: "",
    country: "",
    email: email,
    full_name: username,
    gender: "",
    password: "",
  };
  return (
    <div className="col-lg-8">
      <div className={styles.menuShow}>
        <h1 className="mb-4 mb-md-0">Informasi Pribadi</h1>
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
                // Add more validation rules as needed
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                API.post("/users/v1/register", values)
                  .then((res) => {
                    setSubmitting(false);
                    router.push("/");
                  })
                  .catch((err) => {
                    setSubmitting(false);
                    if (err.data.status === "failed") {
                      alert(err.data.message);
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
                isSubmitting,
                /* and other goodies */
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
                    Full Name
                  </Typography>
                  <Field
                    type="text"
                    onChange={handleChange}
                    name="full_name"
                    placeholder="Your Full Name"
                  />
                  <ErrorMessage name="full_name" component="div" />
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
                    Address
                  </Typography>
                  <Field
                    type="text"
                    onChange={handleChange}
                    name="address"
                    placeholder="Your Address"
                  />
                  <ErrorMessage name="address" component="div" />

                  <Typography fontSize={16} fontWeight={500} lineHeight="24px">
                    Country
                  </Typography>
                  <div
                    role="group"
                    className="mb-1"
                    aria-labelledby="my-radio-group"
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          onChange={handleChange}
                          name="country"
                          value="ID"
                          size="small"
                        />
                      }
                      label="Indonesia"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          onChange={handleChange}
                          name="country"
                          size="small"
                          value="US"
                        />
                      }
                      label="United States"
                    />
                  </div>
                  <ErrorMessage name="country" component="div" />

                  <Typography fontSize={16} fontWeight={500} lineHeight="24px">
                    Gender
                  </Typography>
                  <div
                    role="group"
                    className="mb-1"
                    aria-labelledby="my-radio-group"
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          onChange={handleChange}
                          name="gender"
                          size="small"
                          value="l"
                        />
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          onChange={handleChange}
                          name="gender"
                          size="small"
                          value="p"
                        />
                      }
                      label="Female"
                    />
                  </div>
                  <ErrorMessage name="gender" component="div" />

                  

                  {/* <Typography
                    fontSize={16}
                    fontWeight={500}
                    marginBottom={1}
                    lineHeight="24px"
                  >
                    Password
                  </Typography>
                  <Field
                    type="password"
                    onChange={handleChange}
                    name="password"
                    autoComplete="on"
                    placeholder="Password kamu"
                  />
                  <ErrorMessage name="password" component="div" /> */}

                  <div
                    id="btn-login"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginTop: 10,
                    }}
                  >
                    <Button type="submit">Ubah</Button>
                  </div>
                </Form>
              )}
            </Formik>
      </div>
    </div>
  );
}
