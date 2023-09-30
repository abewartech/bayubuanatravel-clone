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
  Typography
} from "@mui/material";
import axios from "axios";

export default function Register() {
  const router = useRouter();
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
    password: ""
  };
  return (
    <Layout>
      <HeaderPage
        title={"Register"}
        breadcrumb={breadcrumb}
        background={resort}
      />
      <div className="container mb-5">
        <div className="row">
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
              axios
                .post("http://api.marinarajaampat.id/users/v1/register", values)
                .then((res) => {
                  console.log(res);
                  setSubmitting(false);
                  router.push("/");
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
              /* and other goodies */
            }) => (
              <Form
                sx={{ margin: 10, height: "40px" }}
                noValidate
                autoComplete="off"
              >
                <Typography>
                  <Box fontSize={16} fontWeight={700} lineHeight="24px">
                    Full Name
                  </Box>
                </Typography>
                <Field
                  type="text"
                  onChange={handleChange}
                  name="full_name"
                  placeholder="Your Full Name"
                />
                <ErrorMessage name="full_name" component="div" />

                <Typography>
                  <Box fontSize={16} fontWeight={700} lineHeight="24px">
                    Address
                  </Box>
                </Typography>
                <Field
                  type="text"
                  onChange={handleChange}
                  name="address"
                  placeholder="Your Address"
                />
                <ErrorMessage name="address" component="div" />

                <Typography>
                  <Box fontSize={16} fontWeight={700} lineHeight="24px">
                    Country
                  </Box>
                </Typography>
                <div role="group" aria-labelledby="my-radio-group">
                  <FormControlLabel
                    control={
                      <Radio
                        onChange={handleChange}
                        name="country"
                        value="ID"
                      />
                    }
                    label="Indonesia"
                  />
                  <FormControlLabel
                    control={
                      <Radio
                        onChange={handleChange}
                        name="country"
                        value="US"
                      />
                    }
                    label="United States"
                  />
                </div>
                <ErrorMessage name="country" component="div" />

                <Typography>
                  <Box fontSize={16} fontWeight={700} lineHeight="24px">
                    Gender
                  </Box>
                </Typography>
                <div role="group" aria-labelledby="my-radio-group">
                  <FormControlLabel
                    control={
                      <Radio onChange={handleChange} name="gender" value="l" />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    control={
                      <Radio onChange={handleChange} name="gender" value="p" />
                    }
                    label="Female"
                  />
                </div>
                <ErrorMessage name="gender" component="div" />

                <Typography>
                  <Box fontSize={16} fontWeight={700} lineHeight="24px">
                    Email atau Username
                  </Box>
                </Typography>

                <Field
                  type="text"
                  onChange={handleChange}
                  name="email"
                  placeholder="contoh@versinema.com"
                />
                <ErrorMessage name="email" component="div" />

                <Typography>
                  <Box fontSize={16} fontWeight={700} lineHeight="24px">
                    Password
                  </Box>
                </Typography>
                <Field
                  type="password"
                  onChange={handleChange}
                  name="password"
                  autoComplete="on"
                  placeholder="Password kamu"
                />
                <ErrorMessage name="password" component="div" />

                <div
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: 10
                  }}
                >
                  <a href="forgot-password" color="textPrimary" replace>
                    <Typography variant="caption" display="block" gutterBottom>
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
                  <Button type="submit">Register</Button>
                </div>

                <div
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: 10
                  }}
                >
                  <Link href="/login" passHref>
                    <Button component="a">Login</Button>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
}
