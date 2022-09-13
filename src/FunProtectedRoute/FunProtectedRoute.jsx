
import { Navigate, Outlet } from "react-router-dom";
import { FunUserAuth } from "../FunContext"

export const FunProtectedRoute = () => {
    const {funUser, loading} = FunUserAuth();
    console.log("funUser:", funUser, loading)
    return (
        loading ? <div>Loading..</div> :
        funUser && !funUser.emailVerified ?  <Navigate to="/verify"/>:
        funUser && funUser.emailVerified ? <Outlet /> :
        <Navigate to="/login"/> 
    )
}