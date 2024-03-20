// Import the necessary modules
import "./../styles/global.scss";
import Head from "next/head";
import { Poppins } from "next/font/google";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const poppins = Poppins({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap"
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#0899da"
    }
  },
  typography: {
    fontFamily: `"Poppins", "Bricolage Grotesque", sans-serif`
  }
});

// Define your App component
function MyApp({ Component, pageProps }) {
  const defaultTitle = "Marina Raja Ampat";
  return (
    <>
      <Head>
        <title>{pageProps.title || defaultTitle}</title>
        <meta
          name="description"
          content={pageProps.description || "Your default description"}
        />
      </Head>
      <main className={poppins.className}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </>
  );
}

// Use the appWithTranslation HOC to wrap your App component
export default MyApp;
