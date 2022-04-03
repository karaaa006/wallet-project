import axios from "axios";

const BASE_URL = "https://goit-wallet-api.herokuapp.com/api";

export const instance = axios.create({
  baseURL: BASE_URL,
});

const token = localStorage.getItem("token");

instance.defaults.headers.common["Authorization"] = "Bearer " + token;
