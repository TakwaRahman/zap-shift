import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";



const UsersManagement = () => {

    const axiosSecure = useAxiosSecure()

    const {refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')

            return res.data;
        }
    })



    const handleMakeUser = async (user) => {
        const roleInfo = { role: 'admin' };


        const alert = await Swal.fire({
            title: 'Are You Sure!',
            text: 'Make You Admin This User',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Apply!"
        })



        if (alert.isConfirmed) {
            const res = await axiosSecure.patch(`/users/${user._id}/role`, roleInfo);
            refetch()
            if (res.data?.modifiedCount) {
                Swal.fire({
                    title: 'Your User is Admin Succesfully',
                    text: "Apply Succeces",
                    icon: "success"
                });
            }
        }
    }

    const handleRemoveAdmin = async (user) => {
        const roleInfo = { role: 'user' };


        const alert = await Swal.fire({
            title: 'Are You Sure!',
            text: 'This User Admin Delete?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Apply!"
        })



        if (alert.isConfirmed) {
            const res = await axiosSecure.patch(`/users/${user._id}/role`, roleInfo);
            
            refetch();
            if (res.data.modifiedCount) {
                Swal.fire({
                    title: 'Your User Admin is Deleted Succesfully',
                    text: "Apply Succeces",
                    icon: "success"
                });
            }
        }
    }


    return (
        <div>
            <h2 className="text-5xl">User Pending Approvel : {users.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Admin Action</th>
                            <th>Other Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, index) =>
                                <tr>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>

                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user.photoURL}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.displayName}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {
                                            user.email
                                        }

                                    </td>
                                    <td>{user.role}</td>
                                    <th>
                                        {user.role === 'admin' ? <button onClick={() => handleRemoveAdmin(user)} className="btn bg-red-400"><FiShieldOff></FiShieldOff></button> : <button onClick={() => handleMakeUser(user)} className="btn bg-green-500"><FaUserShield></FaUserShield></button>
                                        }
                                    </th>
                                </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default UsersManagement;