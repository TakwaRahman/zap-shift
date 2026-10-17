import Forbidden from "../Components/Forbidden/Forbidden";
import Loading from "../Components/Loading/Loading";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleIsLoading } = useRole();


    if (loading || roleIsLoading) {
        return <Loading></Loading>
    }


    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }



    return children;
};

export default AdminRoute;