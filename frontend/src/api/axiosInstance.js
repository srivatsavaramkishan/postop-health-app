import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-User-Role': 'Patient'  // ✅ add this manually for now
  },
});

export default axiosInstance;
