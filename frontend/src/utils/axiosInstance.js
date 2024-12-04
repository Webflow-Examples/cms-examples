import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://localhost:${
    import.meta.env.VITE_BACKEND_PORT || "8000"
  }/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = `http://localhost:${
        import.meta.env.VITE_BACKEND_PORT || "8000"
      }/auth`;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
