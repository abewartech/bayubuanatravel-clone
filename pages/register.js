import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import resort from "./../public/assets/resort.jpg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import axios from "axios";
import API from "../src/common/api";

export default function Register() {
  const router = useRouter();
  // const typePage = currUrl.query.type;
  const breadcrumb = [
    {
      name: "Home",
    },
    {
      name: "Register",
    },
  ];
  const initialValues = {
    address: "",
    country: "",
    email: "",
    full_name: "",
    gender: "",
    password: "",
  };
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
                    console.log(err.data.status);
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

                  <Typography
                    fontSize={16}
                    fontWeight={500}
                    marginBottom={1}
                    lineHeight="24px"
                  >
                    Email atau Username
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
                    Password
                  </Typography>
                  <Field
                    type="password"
                    onChange={handleChange}
                    name="password"
                    autoComplete="on"
                    placeholder="Password kamu"
                  />
                  <ErrorMessage name="password" component="div" />

                  {/* <div
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginTop: 10,
                    }}
                  >
                    <a href="forgot-password" color="textPrimary" replace>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Forget Password ?
                      </Typography>
                    </a>
                  </div> */}

                  <div
                    id="btn-login"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginTop: 10,
                    }}
                  >
                    <Button type="submit">Register</Button>
                  </div>

                  <div
                    id="btn-regist"
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginTop: 10,
                    }}
                  >
                    Sudah punya akun?
                    <Link href="/login" passHref>
                      <Button>Login</Button>
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
