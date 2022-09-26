
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { FunUserAuth } from "../FunContext"

export const FunRestrictedAdminRoute = () => {
    const {funUser, loading, GetCurrentUserType, userType} = FunUserAuth();
    useEffect(()=>{
        GetCurrentUserType()
    },[loading])
    
    return (
        window.localStorage.getItem('login') && window.localStorage.getItem('login') === "true" ?
            loading || !userType ? <div>Loading...</div> :
            funUser && !funUser.emailVerified ? <Navigate to="/verify"/>:
            funUser && funUser.emailVerified && userType === "admin" ? <Outlet /> :
            funUser && funUser.emailVerified? <Navigate to="/broadcast"/>:
            <Navigate to="/login"/>
            :
            <Navigate to="/login"/>
    )
}