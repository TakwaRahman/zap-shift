import axios from "axios";
import { useContext, useEffect } from "react";
import useAuth from './useAuth';
import { AuthContext } from "../Components/context/AuthContext/AuthContext";
import { useNavigate } from "react-router";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
});





const useAxiosSecure = () => {
    const { user } = useAuth();
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })


        const resInterceptor = axiosSecure.interceptors.response.use(response => {
            return response
        }, (err) => {
            console.log(err)

            const statusCode = err.response?.status;
            if (statusCode === 401 || statusCode === 403) {
                logOut().then(()=>{
                    navigate('login')
                })
            }
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)
        }

    }, [user, logOut, navigate])


    return axiosSecure
};

export default useAxiosSecure;