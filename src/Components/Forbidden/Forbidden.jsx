
import { useLottie } from "lottie-react";
import forbiddenAnimation from "./forbidden403.json";
import { Link } from "react-router";

const Forbidden = () => {
    const options = {
        animationData: forbiddenAnimation,
        loop: true,
    };

    const { View } = useLottie(options);

    return (
        <div className="flex flex-col justify-center items-center h-screen space-y-3">
            <div className="w-60">
                {View}
            </div>
            <h1 className="text-red-500 text-3xl font-bold">You are Forbidden to access this page</h1>
            <p className="text-gray-500 font-semibold">Please contact the administrator if you believe this is an mirror</p>
            <div className="space-x-3">
                <Link to='/'><button className="btn btn-primary text-black font-bold">Go To Home</button></Link><Link to='/dashboard'><button className="btn btn-secondary">Go To Dashboard</button></Link>
            </div>
        </div>
    );
};

export default Forbidden;