import axios from "axios";

export const BASE_URL = "https://goit-wallet-api.herokuapp.com/api";

axios.defaults.baseURL = BASE_URL;

export const apiTokenConfig = {
  set(token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  },
  unset() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};

export const api = {
  user: {
    login: async (loginData) => {
      try {
        const { data } = await axios.post("/users/login", loginData);

        apiTokenConfig.set(data.token);

        return data;
      } catch (e) {
        console.log(e);
      }
    },
    logout: async () => {
      try {
        await axios.get("/users/logout");

        apiTokenConfig.unset();
      } catch (e) {
        console.log(e);
      }
    },
    getUserData: async () => {
      try {
        const { data } = await axios.get("/users/current");

        return data;
      } catch (e) {
        console.log(e);
      }
    },
    registration: async (registrationData) => {
      try {
        const { data } = await axios.post("/users", registrationData)

        apiTokenConfig.set(data.token)

        return data
      } catch (e) {
        console.log(e)
      }
    },
  },
  // transactions: {
  //   getTransactions: async () => {
  //     try {
  //       const {data} = axios.get("/transactions");
  //       // console.log("api: ", response);
  //       return data;
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   },
  // },
};
