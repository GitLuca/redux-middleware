import axios from "axios";

export const base_URL = "https://jsonplaceholder.typicode.com"

const axiosInstance = axios.create({
  baseURL: base_URL,
});

export default axiosInstance;
