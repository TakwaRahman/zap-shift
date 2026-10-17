import Forbidden from "../Components/Forbidden/Forbidden";
import Loading from "../Components/Loading/Loading";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const RiderRoutes = ({ children }) => {
    const { loading, user } = useAuth();
    const { role, roleIsLoading } = useRole();


    if (loading || !user || roleIsLoading) {
        return <Loading></Loading>
    }


    if (role !== 'rider') {
        return <Forbidden></Forbidden>
    }



    return children;
};

export default RiderRoutes;