// Import the necessary modules
import "./../styles/global.scss";
import Head from "next/head";

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
      <Component {...pageProps} />
    </>
  );
}

// Use the appWithTranslation HOC to wrap your App component
export default MyApp;
