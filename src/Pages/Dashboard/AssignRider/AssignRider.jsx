import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useRef, useState } from "react";
import Swal from "sweetalert2";



const AssignRider = () => {
    const axiosSecure = useAxiosSecure();
    const refModal = useRef();
    const [selectedParcel, setSelectedParcel] = useState();


    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
            return res.data;
        }
    })


    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`)
            console.log(res.data)
            return res.data;

        }
    })


    const openModal = parcel => {
        setSelectedParcel(parcel)
        refModal.current.showModal();
    }

    const handleAssignRider = rider => {
        const riderAssignInfo = {
            riderId: rider._id,
            riderName: rider.name,
            riderEmail: rider.email,
            parcelId: selectedParcel._id,
            trackingId: selectedParcel.trackingId
        }
        axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refModal.current.close()
                    Swal.fire({
                        title: `rider has been assigned`,
                        position: "top-end",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000

                    })
                }
            })
    }

    return (
        <div>
            <h1 className="text-5xl">Assign Rider : {parcels.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Created At</th>
                            <th>Pickup District</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            parcels.map((parcel, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>
                                    <button onClick={() => openModal(parcel)} className="btn btn-primary text-black">Assign Rider</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>


                <dialog ref={refModal} id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Rider : {riders.length}</h3>
                        <div className="modal-action">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Job</th>
                                            <th>Favorite Color</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            riders.map((rider, i) => <tr>
                                                <th>{i + 1}</th>
                                                <td>{rider.name}</td>
                                                <td>{rider.email}</td>

                                                <td>
                                                    <button onClick={() => handleAssignRider(rider)} className="btn btn-primary text-black">Assign</button>
                                                </td>
                                            </tr>)
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default AssignRider;