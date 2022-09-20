
import { Navigate, Outlet } from "react-router-dom";
import { FunUserAuth } from "../FunContext"

export const FunProtectedRoute = () => {
    const {funUser, loading, userType} = FunUserAuth();
    console.log("funUser:",FunUserAuth())
    
    return (
        loading ? <div>Loading..</div> :
        funUser && !funUser.emailVerified ?  <Navigate to="/verify"/>:
        funUser && funUser.emailVerified ? <Outlet /> :
        <Navigate to="/login"/> 
    )
}