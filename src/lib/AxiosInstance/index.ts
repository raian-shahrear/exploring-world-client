import envConfig from "@/config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: envConfig.API_URL,
});

export default axiosInstance;