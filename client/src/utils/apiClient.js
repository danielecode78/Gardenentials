import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

console.log(baseURL);
const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

export default apiClient;
