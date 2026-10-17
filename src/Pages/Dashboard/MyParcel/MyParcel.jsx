import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaCreditCard, FaRegTrashAlt } from "react-icons/fa";
import { MdDetails } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router";
// import { Link } from "react-router";



const MyParcel = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcel', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })


    const handleDeleteParcel = async (id) => {
        axiosSecure.delete(`/parcels/${id}`).then(res => {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed)


                    if (res.data.deletedCount) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }


            });
        })


    }


    const handlePayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
            trackingId: parcel.trackingId
        }


        const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
        window.location.assign(res.data.url)
    }


    return (
        <div>
            <h1>data length is : {parcels.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>TrackingId</th>
                            <th>cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            parcels.map((parcel, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td><Link to={`/parcel-track/${parcel.trackingId}`}>{parcel.trackingId}</Link></td>
                                <td>{parcel.cost}</td>
                                <td>
                                    {
                                        parcel.paymentStatus === 'paid' ? <span className="text-green-400">Paid</span> : <button onClick={() => handlePayment(parcel)} className="btn btn-primary text-black">Pay</button>
                                    }
                                </td>
                                <td>{parcel.deliveryStatus}</td>
                                <td>
                                    <button className="btn btn-square hover:bg-primary"><FaCreditCard /></button>
                                    <button className="btn btn-square hover:bg-primary mx-2"><MdDetails /></button>
                                    <button className="btn btn-square hover:bg-primary" onClick={() => handleDeleteParcel(parcel._id)}><FaRegTrashAlt /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcel;