import { Navigate, Outlet } from "react-router-dom";
import { FunUserAuth } from "../FunContext"

export const FunRestrictedRoute = () => {
    const {funUser, loading} = FunUserAuth();

    return (
        loading ? <div>Loading...</div> :
        funUser && !funUser.emailVerified ? <Navigate to="/verify"/>:
        funUser && funUser.emailVerified? <Navigate to="/broadcast"/>:
        <Outlet />
    )
}