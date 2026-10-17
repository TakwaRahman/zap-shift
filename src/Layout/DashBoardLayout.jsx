import { Link, NavLink, Outlet } from "react-router";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaBicycle, FaMotorcycle, FaRegCreditCard, FaTasks, FaUser } from "react-icons/fa";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";
import { SiGoogletasks } from "react-icons/si";



const DashBoardLayout = () => {
    const { role, roleIsLoading } = useRole()
    const { user } = useAuth()

    console.log({
        email: user?.email,
        role,
        roleIsLoading
    });
    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4">Zap Shift Dashboard</div>
                </nav>
                {/* Page content here */}
                <Outlet></Outlet>

            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <Link to='/'>
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </button>
                            </li>
                        </Link>


                        <li>
                            <NavLink to='/dashboard/my-parcel' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="MyParcel">
                                <CiDeliveryTruck className="my-1.5 inline-block size-4" />
                                <span className="is-drawer-close:hidden">
                                    My Parcel</span></NavLink>
                        </li>

                        <li>
                            <NavLink to='/dashboard/payment-history' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My History">
                                <FaRegCreditCard className="my-1.5 inline-block size-4" />
                                <span className="is-drawer-close:hidden">
                                    My Payment History</span></NavLink>
                        </li>

                        {
                            role === 'rider' && <li>
                                <NavLink to='/dashboard/deliveries-rider' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Deliveries Rider">
                                    <FaTasks className="my-1.5 inline-block size-4" />
                                    <span className="is-drawer-close:hidden">
                                        Deliveries Rider</span></NavLink>
                            </li>
                        }
                        {
                            role === 'rider' && <li>
                                <NavLink to='/dashboard/completed-deliveries' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Complete Deliveries">
                                    <SiGoogletasks></SiGoogletasks>
                                    <span className="is-drawer-close:hidden">
                                        Complete Deliveries</span></NavLink>
                            </li>
                        }


                        {
                            role === 'admin' && <li>
                                <NavLink to='/dashboard/assign-riders' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Assign Riders">
                                    <FaMotorcycle className="my-1.5 inline-block size-4" />
                                    <span className="is-drawer-close:hidden">
                                        Approve Riders</span></NavLink>
                            </li>
                        }

                        {
                            role === 'admin' && <li>
                                <NavLink to='/dashboard/approve-riders' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approve Riders">
                                    <FaBicycle className="my-1.5 inline-block size-4" />
                                    <span className="is-drawer-close:hidden">
                                        Approve Riders</span></NavLink>
                            </li>
                        }


                        {
                            role === 'admin' && <li>
                                <NavLink to='/dashboard/user-management' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approve users">
                                    <FaUser className="my-1.5 inline-block size-4" />
                                    <span className="is-drawer-close:hidden">
                                        Approve users</span></NavLink>
                            </li>
                        }

                        {/* List item */}
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>

                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;