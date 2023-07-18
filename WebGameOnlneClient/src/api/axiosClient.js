import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(
  async (config) => {
      let token;
      try {
         const tokenJson = await localStorage.getItem("token");
         token = JSON.parse(tokenJson);
      } catch (e) { 
        console.log(e)
      }

      if (token !== null) config.headers.Authorization = `Bearer ${token}`;

      return config;
  },
  (error) => {
      Promise.reject(error);
  }
);
// after send request
axiosClient.interceptors.response.use(
  (response) => {
      return response;
  },
  (error) => {
      return Promise.reject(error);
  }
);


export default axiosClient;
