// Import the necessary modules
import "./../styles/global.scss";
import Head from "next/head";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ['300'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
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
        <Component {...pageProps} />
      </main>
    </>
  );
}

// Use the appWithTranslation HOC to wrap your App component
export default MyApp;
