import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaRegTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";
import { useState } from "react";
// import { set } from "react-hook-form";


const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedRider, setSelectedRider] = useState();

    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })


    const updateRider = async (rider, status) => {
        const updateInfo = { status: status, email: rider.email };


        const isApproved = status === 'approved';



        const alert = await Swal.fire({
            title: isApproved ? 'Approved Rider?' : 'Reject Rider',
            text: isApproved ? 'Do you want to approve this rider?' : 'Do you want to reject this rider?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Apply!"
        })

        if (alert.isConfirmed) {

            const res = await axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            refetch()
            if (res.data.modifiedCount) {
                Swal.fire({
                    title: isApproved ? 'Rider Approved Succesfully' : 'Rider Rejected Succesfully',
                    text: "Apply Succeces",
                    icon: "success"
                });
            }
        }

        // axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then(res => {
        //     if (res.data.modifiedCount) {
        //         Swal.fire({
        //             title: "Are you sure?",
        //             text: "You want to apply as a Rider!",
        //             icon: "warning",
        //             showCancelButton: true,
        //             confirmButtonColor: "#3085d6",
        //             cancelButtonColor: "#d33",
        //             confirmButtonText: "Yes, Apply!"
        //         })

        //     }

        // })
    }

    const handleApproval = (rider) => {
        updateRider(rider, 'approved')
    }


    const handleReject = (rider) => {
        updateRider(rider, 'reject')
    }

    const handleDeleteRider = async (rider) => {


        const alert = await Swal.fire({
            title: "Are you sure?",
            text: "You want to delete This Rider",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        })

        if (alert.isConfirmed) {
            const res = await axiosSecure.delete(`/riders/${rider._id}`)

            if (res.data.deletedCount) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Rider has been deleted.",
                    icon: "success"
                });

                refetch()
            }
        }
    }

    const handleShowModal = (rider) => {
        setSelectedRider(rider)
        document.getElementById('my_modal_1').showModal();
    }
    return (
        <div>
            <h2 className="text-5xl">Riders Pending Approval : {riders.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>District</th>
                            <th>Work Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            riders.map((rider, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td><p className={`${rider.status === 'approved' ? 'text-green-500' : 'text-red-600'}`}>{rider.status}</p></td>
                                <td>{rider.district}</td>
                                <td>
                                    {rider.status === 'approved' && rider.workStatus}
                                </td>
                                <td className="space-x-3">
                                    <button className="btn" onClick={() => handleShowModal(rider)}>
                                        <FaEye></FaEye>
                                    </button>
                                    <button className="btn" onClick={() => handleApproval(rider)}>
                                        <FaUserCheck ></FaUserCheck>
                                    </button>
                                    <button className="btn" onClick={() => handleReject(rider)} >
                                        <IoPersonRemove />
                                    </button>
                                    <button onClick={() => handleDeleteRider(rider)} className="btn">
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Rider Name : {selectedRider?.name}</h3>
                    <p className="py-4">Rider Email : {selectedRider?.email}</p>
                    <p className="py-4">Rider Status : {selectedRider?.status}</p>
                    <p className="py-4">Rider District : {selectedRider?.district}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default ApproveRiders;