import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";


const PrivateRoutes = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(location)

    if (loading) {
        return <div>
            <span className="loading loading-spinner loading-xl"></span>
        </div>
    }

    if (!user) {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoutes;