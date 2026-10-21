import axios from "axios";
import { useContext, useEffect } from "react";
import useAuth from "./useAuth";
import { AuthContext } from "../Components/context/AuthContext/AuthContext";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: "https://zap-shift-server-x22u.vercel.app",
});

const useAxiosSecure = () => {
    const { user } = useAuth();
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }

                return config;
            }
        );

        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.error("Axios error:", error);

                const statusCode = error.response?.status;

                if (statusCode === 401 || statusCode === 403) {
                    try {
                        await logOut();
                        navigate("/login");
                    } catch (logoutError) {
                        console.error("Logout error:", logoutError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;