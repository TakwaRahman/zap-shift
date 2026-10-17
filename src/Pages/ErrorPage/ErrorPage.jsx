import { Link } from "react-router";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";



const ErrorPage = () => {



    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="text-center p-30">
                <h1 className="text-6xl font-bold">Error 404</h1>
                <Link to='/'><button className="btn bg-primary font-bold rounded-2xl mt-10">Go Home</button></Link>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default ErrorPage;