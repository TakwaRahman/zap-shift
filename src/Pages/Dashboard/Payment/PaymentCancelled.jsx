import { Link } from "react-router";


const PaymentCancelled = () => {
    return (
        <div>
            <h1 className="text-4xl">Payment Cancel , Please try again</h1>
            <Link to='/dashboard/my-parcel'><button className="btn btn-primary text-black">Try again</button></Link>
        </div>
    );
};

export default PaymentCancelled;