import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";


export const axiosSecure = axios.create({
  baseURL: "https://assignment-12-server-jet-six.vercel.app",
});
const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
          const token = localStorage.getItem('access-token');
          if (token) {
            config.headers.Authorization = `Bearer ${ token }`
          }
          return config;
        });
    axiosSecure.interceptors.response.use(
          (response) => response,
          async (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
              await logOut();
              navigate('/login')
            }
            return Promise.reject(error)
          }
        )
    
      }, [logOut, navigate])

  return axiosSecure;
};

export default useAxiosSecure;
