import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const DeliveriesRider = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver-assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver-assigned`)
            return res.data;
        }
    })


    const handleAction = (parcel, status) => {
        const statusInfo = { deliveryStatus: status, riderId: parcel.riderId, trackingId: parcel.trackingId };

        const message = `Parcel status is updated with ${status.split('-').join(' ')}`

        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo).then(res => {
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: "success",
                    title: message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }


    return (
        <div>
            <h2 className="text-4xl">
                Pending Parcel Rider : {parcels.length}
            </h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            parcels.map((parcel, i) => <tr key={parcel._id}>
                                <th>{i + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.deliveryStatus === 'driver-assigned' ? <>
                                    <button className="btn btn-primary text-black" onClick={() => handleAction(parcel, 'rider-arriving')}>Action</button> <button className="btn btn-secondary">Reject</button> </> : <span>Delivery Accepted</span>

                                }</td>
                                <td>{parcel.deliveryStatus}</td>
                                <td>
                                    <button className="btn btn-primary text-black" onClick={() => handleAction(parcel, 'parcel-picked-up')}>Mark as Picked Up</button>
                                    <button className="btn btn-primary text-black mx-3" onClick={() => handleAction(parcel, 'parcel-delivered')}>Mark as Delivered</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeliveriesRider;