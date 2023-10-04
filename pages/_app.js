// Import the necessary modules
import './../styles/global.scss';
import { appWithTranslation } from 'next-i18next';

// Define your App component
function MyApp({ Component, pageProps }) {
  console.log(appWithTranslation)
  return <Component {...pageProps} />;
}

// Use the appWithTranslation HOC to wrap your App component
export default appWithTranslation(MyApp);
