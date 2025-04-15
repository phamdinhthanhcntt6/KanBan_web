import axios from "axios";
import Cookies from "js-cookie"; // Import thư viện js-cookie
import queryString from "query-string";

const IPv4_Address = `192.168.1.15`;
const baseURL = `http://${IPv4_Address}:3001`;

const getAccesstoken = () => {
  const authDataCookie = Cookies.get("authData");

  if (authDataCookie) {
    try {
      const authData = JSON.parse(authDataCookie);
      return authData.token || "";
    } catch (error) {
      console.error("Error cookie:", error);
      return "";
    }
  }

  return "";
};

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});

// eslint-disable-next-line
axiosClient.interceptors.request.use(async (config: any) => {
  const accesstoken = getAccesstoken();
  config.headers = {
    Authorization: `Bearer ${accesstoken}`,
    Accept: "application/json",
    ...config.headers,
  };
  return { ...config, data: config.data ?? null };
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res.data && res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    const { response } = error;
    return Promise.reject(response.data);
  }
);

export default axiosClient;
