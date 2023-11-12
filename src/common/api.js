import axios from "axios";
import API_URL from "./variable";
import useAuthStore from "../store/loginStore";

// Create an Axios instance with the base URL
const API = axios.create({
  baseURL: API_URL,
  rejectUnauthorized: false
  // You can add additional configuration options here if needed
});

// Add a request interceptor
API.interceptors.request.use(
  function (config) {
    // Do something before the request is sent

    const isLogin = JSON.parse(localStorage.getItem("auth")).state.isLoggedIn;
    if (isLogin) {
      const accessToken = JSON.parse(localStorage.getItem("auth")).state
        .accessToken;
      config.headers.Authorization = localStorage.getItem("auth")
        ? `Bearer ${accessToken}` // Use template literals for string concatenation
        : "";
    }

    return config;
  },
  function (error) {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
API.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response?.data ? response?.data : response;
  },
  function (error) {
    if (error?.response?.status === 403) {
      const redirectTo = API_URL;
      useAuthStore.setState({
				isLoggedIn:false,
				username:''
			})
			window.location.href = '/';
      // You may want to handle the redirection logic here
      // Example: window.location.replace(redirectTo + "login");
    }
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response);
  }
);

export default API;
