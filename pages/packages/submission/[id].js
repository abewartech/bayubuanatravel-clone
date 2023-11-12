import React, { useState } from "react";
import {
  Accordion,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextareaAutosize,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Layout from "../../../src/components/Layout";

export default function Submission() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [itterativeData, setItterativeData] = useState();
  const [edit, setEdit] = useState();
  const guest = 1;
  const price = 1;
  const title = "test";

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const handleChangeIterative = (e) => {
    let newData = { ...itterativeData };
    newData[e.target.id] = e.target.value;
    setItterativeData(newData);
  };

  const doCheckout = async (e) => {};

  const formAccordion = (guest) => {
    return (
      <Accordion sx={{ mt: 2 }} elevation={3}>
        <Accordion.Item eventKey={guest}>
          <Accordion.Header>Jamaah #{guest + 1}</Accordion.Header>
          <Accordion.Body>
            <Grid container spacing={2}>
              <Grid item lg={6} md={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor={`passengers[${guest + 1}][no_ktp]`}>
                    Nomor KTP
                  </InputLabel>
                  <TextField
                    fullWidth
                    type="text"
                    id={`passengers[${guest + 1}][no_ktp]`}
                    onChange={handleChangeIterative}
                    placeholder="Nomor KTP"
                  />
                </FormControl>
              </Grid>
              <Grid item lg={6} md={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor={`passengers[${guest + 1}][foto_ktp]`}>
                    Foto KTP
                  </InputLabel>
                  <Input
                    type="file"
                    id={`passengers[${guest + 1}][foto_ktp]`}
                    onChange={handleChangeIterative}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton color="primary" component="span">
                          <PhotoCamera />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item lg={6} md={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor={`passengers[${guest + 1}][pasfoto]`}>
                    Pas Foto 3x4
                  </InputLabel>
                  <Input
                    type="file"
                    id={`passengers[${guest + 1}][pasfoto]`}
                    onChange={handleChangeIterative}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton color="primary" component="span">
                          <PhotoCamera />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  return (
    <Layout>
    </Layout>
  );
}
