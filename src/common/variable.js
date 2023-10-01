const API_URL =
  process.env.APP_ENV === "debug"
    ? "http://localhost:8080/"
    : "http://api.marinarajaampat.id/";
export default API_URL;
