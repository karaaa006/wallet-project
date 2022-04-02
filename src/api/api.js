import axios from "axios";
import { instance } from "./instance";

const BASE_URL = "https://goit-wallet-api.herokuapp.com/api";

axios.defaults.baseURL = BASE_URL;

export const api = {
  login: async (loginData) => {
    try {
      const { data } = await axios.post("/users/login", loginData);

      localStorage.setItem("token", data.token);

      return data;
    } catch (e) {
      console.log(e);
    }
  },
  getTransactions: async () => {
    try {
      const { data } = instance.get("/transactions");

      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
