import { Navigate, Outlet } from "react-router-dom";
import { FunUserAuth } from "../FunContext"

export const FunRestrictVerificationRoute = () => {
    const {funUser, loading} = FunUserAuth();
    return (
        loading? <div>Loading...</div> :
        funUser && !funUser.emailVerified ? <Outlet />:
        funUser && funUser.emailVerified? <Navigate to="/broadcast"/>:
        <Navigate to="/"/>
    )
}