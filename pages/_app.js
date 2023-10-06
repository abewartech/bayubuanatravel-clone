// Import the necessary modules
import "./../styles/global.scss";

// Define your App component
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// Use the appWithTranslation HOC to wrap your App component
export default MyApp;
