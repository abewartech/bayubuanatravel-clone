const API_URL =
  process.env.APP_ENV === "debug"
    ? "http://localhost:8080/"
    : "https://api.marinarajaampat.id/";
export default API_URL;
