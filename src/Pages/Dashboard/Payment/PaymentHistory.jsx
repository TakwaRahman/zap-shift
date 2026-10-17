import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";



const PaymentHistory = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payment = [] } = useQuery({
        queryKey: ['payment', user.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data;
        }
    })


    return (
        <div className="bg-base-100 rounded-2xl p-6 shadow">
            <h2 className="text-4xl font-bold mb-6">
                Payment History ({payment.length})
            </h2>

            <div className="overflow-x-auto border rounded-xl">
                <table className="table">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Number</th>
                            <th>Parcel Info</th>
                            <th>Paid Time</th>
                            <th>Tracking Number</th>
                            <th>Payment Info</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {payment.map((item, index) => (

                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>Takwa Rahman</td>

                                <td>
                                    <h3 className="font-semibold">{new Date(item.paidAt).toLocaleString(undefined)}</h3>

                                </td>

                                <td>{item.transactionId}</td>

                                <td>
                                    <p>৳ {item.amount}</p>
                                    <span className="text-green-600 font-medium">
                                        ({item.paymentStatus})
                                    </span>
                                </td>

                                <td>
                                    <button className="btn btn-sm btn-info text-white">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {payment.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-8">
                                    No payment history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;