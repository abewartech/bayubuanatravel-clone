import Layout from "../src/components/Layout";
import HeaderPage from "../src/components/common/HeaderPage";
import resort from "./../public/assets/resort.jpg";
import useTranslation from "next-translate/useTranslation";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Terms() {
  const { t, lang } = useTranslation("common");
  const breadcrumb = [
    {
      name: "Home"
    },
    {
      name: "Terms & Conditions"
    }
  ];

  return (
    <Layout>
      <HeaderPage
        title="Terms & Conditions"
        breadcrumb={breadcrumb}
        background={resort}
      />
      <Container className="mb-5">
        <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
          <Typography variant="h4">Travel Terms & Conditions</Typography>
          <Typography variant="body1">
            These are the terms and conditions for booking and traveling with
            Marina Raja Ampat Services.
          </Typography>
          <Typography variant="body1">
            By using our travel services, you agree to the following terms and
            conditions:
            <ol>
              <li>
                <strong>Booking and Payments:</strong> All bookings are subject
                to availability. To confirm your reservation, full payment is
                required. We accept various payment methods.
              </li>
              <li>
                <strong>Cancellation Policy:</strong> If you need to cancel your
                reservation, please refer to our cancellation policy for refund
                eligibility.
              </li>
              <li>
                <strong>Travel Insurance:</strong> We recommend purchasing
                travel insurance to cover unforeseen events and emergencies
                during your trip.
              </li>
              <li>
                <strong>Passports and Visas:</strong> Its your responsibility
                to ensure you have the necessary travel documents, including
                valid passports and visas.
              </li>
              <li>
                <strong>Health and Safety:</strong> Follow local health and
                safety guidelines during your travels. Stay informed about any
                travel advisories or warnings.
              </li>
              <li>
                <strong>Changes to Itinerary:</strong> We reserve the right to
                make changes to the travel itinerary due to unforeseen
                circumstances.
              </li>
            </ol>
            Please review our full terms and conditions for detailed information
            and specific policies. Thank you for choosing Bayu Buana Travel
            Services for your travel needs.
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
}
