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
      const { data } = await axios.post("/users/login", loginData);

      apiTokenConfig.set(data.token);

      return data;
    },

    // login: async (loginData) => {
    //   try {
    //     const { data } = await axios.post("/users/login", loginData);

    //     apiTokenConfig.set(data.token);

    //     return data;
    //   } catch (e) {
    //     return e;
    //   }
    // },

    logout: async () => {
      try {
        await axios.get("/users/logout");

        apiTokenConfig.unset();
      } catch (e) {
        return e;
      }
    },

    getUserData: async () => {
      const { data } = await axios.get("/users/current");

      return data;
    },
    registration: async (registrationData) => {
      const { data } = await axios.post("/users", registrationData);

      apiTokenConfig.set(data.token);

      return data;
    },
  },
  transactions: {
    getTransactions: async (page = 1, size = 5) => {
      try {
        const { data } = await axios.get("/transactions", {
          params: { page, size },
        });

        return data;
      } catch (e) {
        return e;
      }
    },
    addTransaction: async (transactionData) => {
      try {
        const { data } = await axios.post("/transactions", transactionData);

        return data;
      } catch (e) {
        return e;
      }
    },
    getStatistics: async ({ month, year }) => {
      const { data } = await axios.get("/transactions/statistics", {
        params: { month, year },
      });

      return data;
    },
  },
  categories: {
    getCategories: async () => {
      try {
        const { data } = await axios.get("/categories");

        return data;
      } catch (e) {
        return e;
      }
    },
  },
};
