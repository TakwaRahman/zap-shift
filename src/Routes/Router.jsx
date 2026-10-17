import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../Pages/Rider/Rider";
import AboutUs from "../Pages/AboutUs/AboutUs";
import SendParcel from "../Pages/SendParcel/SendParcel";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashBoardLayout from "../Layout/DashBoardLayout";
import MyParcel from "../Pages/Dashboard/MyParcel/MyParcel";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSucces from "../Pages/Dashboard/Payment/PaymentSucces";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import RiderRoutes from "./RiderRoutes";
import DeliveriesRider from "../Pages/Dashboard/DeliveriesRider/DeliveriesRider";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../Pages/Dashboard/ParcelTrack/ParcelTrack";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'rider',
                element: <PrivateRoutes>
                    <Rider></Rider>
                </PrivateRoutes>,
                loader: () => fetch('/services.json').then(res => res.json())
            },
            {
                path: 'send-parcel',
                element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
                loader: () => fetch('/services.json').then(res => res.json())
            },
            {
                path: 'aboutUs',
                Component: AboutUs
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('/services.json').then(res => res.json())
            },
            {
                path: 'parcel-track/:trackingId',
                Component: ParcelTrack
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
        children: [
            {
                path: 'my-parcel',
                Component: MyParcel
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'payment-success',
                Component: PaymentSucces
            },
            {
                path: 'payment-cancelled',
                Component: PaymentCancelled
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },


            {
                path: 'deliveries-rider',
                element: <RiderRoutes><DeliveriesRider></DeliveriesRider></RiderRoutes>
            },
            {
                path: 'completed-deliveries',
                element: <RiderRoutes><CompletedDeliveries></CompletedDeliveries></RiderRoutes>
            },

            {
                path: 'approve-riders',

                element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
            },
            {
                path: 'user-management',
                element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
            },
            {
                path: 'assign-riders',
                element: <AdminRoute> <AssignRider></AssignRider></AdminRoute>
            }
        ]
    }
]);