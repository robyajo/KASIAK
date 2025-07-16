import Axios from "axios";
import https from "https";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",

    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default axios;
