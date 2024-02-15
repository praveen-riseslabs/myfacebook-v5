import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_BASE_API_V1;
// const baseURL = "";

const userApi = axios.create({
  baseURL: baseURL + "/user",
});

const authApi = axios.create({
  baseURL: baseURL + "/user",
});

authApi.interceptors.response.use((response) => {
  const user = JSON.stringify({
    token: response.data?.token,
  });
  localStorage.setItem("user", user);
  return response;
});

export { userApi, authApi };
