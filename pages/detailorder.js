// pages/detailorder.js
import React, { useEffect } from "react";
import Layout from "../src/components/Layout";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";

const DetailOrder = () => {
  const router = useRouter();
  useEffect(() => {
    const sanitizedId = router.query.id?.replace(/\s/g, "");

    try {
      const decodedId = decodeURIComponent(atob(sanitizedId || ""));

      console.log(decodedId);
    } catch (error) {
      console.error("Error decoding ID:", error);
    }
  }, [router.query.id]);

  return (
    <Layout>
      <Box sx={{ my: 4 }}>
        <div className="container">
          <div className="row">
            {/* Title */}
            <div className="col-lg-12 mb-4">
              <Typography variant="h5" textAlign="center">
                Order Details
              </Typography>
            </div>

            {/* Detail Package & Summary Price */}
            <div className="col-lg-7">
              <Box mb={3} sx={{ position: "relative" }}>
                {/* Add your detail package content here */}
                {/* For example: */}
                <Typography variant="h4">Detail Package</Typography>
                {/* ... */}

                {/* Add your summary price content here */}
                {/* For example: */}
                <Typography>Total Price: $100</Typography>
                {/* ... */}
              </Box>
            </div>

            {/* Detail Price & Voucher Field */}
            <div className="col-lg-5">
              <Box mb={3}>
                {/* Add your detail price content here */}
                {/* For example: */}
                <Typography variant="h4">Detail Price</Typography>
                {/* ... */}

                {/* Add your voucher field here */}
                {/* For example: */}
                <TextField
                  label="Voucher Code"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter voucher code"
                />
                {/* ... */}
              </Box>
            </div>
          </div>
        </div>
      </Box>
    </Layout>
  );
};

export default DetailOrder;
