import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const PaymentSucces = () => {

    const [searchParams] = useSearchParams();
    const axiosSecure = useAxiosSecure();
    const [paymentId, setPaymentId] = useState({})

    const sessionId = searchParams.get('session_id');


    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    setPaymentId({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
        }
    }, [sessionId, axiosSecure])



    return (
        <div>
            <h1 className="text-4xl">Payment Succes</h1>
            <p>Payment Transaction : {paymentId.transactionId}</p>
            <p>Payment Tracking : {paymentId.trackingId}</p>
        </div>
    );
};

export default PaymentSucces;