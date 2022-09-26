
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FunUserAuth } from "../FunContext"

export const FunProtectedRoute = () => {
    const {funUser, loading, GetCurrentUserType, banned} = FunUserAuth();
    useEffect(()=>{
        GetCurrentUserType()
    },[loading])
    return (
        loading || banned === undefined ? <div>Loading...</div> :
        funUser && !funUser.emailVerified ?  <Navigate to="/verify"/>:
        funUser && funUser.emailVerified && banned !== undefined && banned === true ?  <Navigate to="/banned"/>:
        funUser && funUser.emailVerified ? <Outlet /> :
        <Navigate to="/login"/> 
    )
}