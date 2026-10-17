import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const Payment = () => {

    const { parcelId } = useParams()
    const axiosSecure = useAxiosSecure()

    const { isLoading, data: parcel } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

    if (isLoading) {
        return <div>
            <span className="loading loading-spinner loading-xl"></span>
        </div>
    }


    const handlePayment = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
        console.log(res.data)
    }

    return (
        <div>
            <h1>Please pay ${parcel.cost} for: {parcel?.parcelName}</h1>
            <button className="btn btn-primary text-black" onClick={handlePayment}>Pay</button>
        </div>
    );
};

export default Payment;