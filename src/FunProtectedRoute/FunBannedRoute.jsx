import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FunUserAuth } from "../FunContext"

export const FunBannedRoute = () => {
    const {funUser, loading, GetCurrentUserType, banned} = FunUserAuth();
    useEffect(()=>{
        GetCurrentUserType()
    },[loading])
    return (
        window.localStorage.getItem('login') && window.localStorage.getItem('login') === "true" ?
            loading || banned === undefined ? <div>Loading...</div> :
            funUser && funUser.emailVerified && banned !== undefined && banned === true ?  <Outlet />:
            funUser && funUser.emailVerified? <Navigate to="/broadcast"/>:
            <Navigate to="/"/>
            :
            <Navigate to="/"/>
    )
}