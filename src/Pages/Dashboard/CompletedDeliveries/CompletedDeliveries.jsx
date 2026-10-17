import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user.email, 'parcel-delivered'],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel-delivered`
            )
            return res.data;
        }
    })


    const calculatePayout = (parcel) => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost * 0.8;
        }
        else {
            return parcel.cost * 0.6;
        }
    }

    return (
        <div>
            <h2 className="text-4xl mb-8">
                Completed Deliveries : {parcels.length}
            </h2>

            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Receiver Phone</th>
                            <th>District</th>
                            <th>Delivery Status</th>
                            <th>Cost</th>
                            <th>PayOut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>

                                <th>
                                    {index + 1}
                                </th>

                                <td>
                                    {parcel.parcelName}
                                </td>

                                <td>
                                    {parcel.receiverPhone}
                                </td>

                                <td>
                                    {parcel.receiverPhone}
                                </td>

                                <td>
                                    {parcel.receiverDistrict}
                                </td>

                                <td>
                                    <span className="text-green-500">
                                        {parcel.cost}
                                    </span>
                                </td>

                                <td>
                                    {calculatePayout(parcel)}
                                </td>

                                <td>
                                    <button className="btn btn-primary text-black">
                                        CashOut
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;