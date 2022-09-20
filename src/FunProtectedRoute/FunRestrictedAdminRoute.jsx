import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth, firestore } from "../firebase";
import { FunUserAuth } from "../FunContext"

export const FunRestrictedAdminRoute = () => {
    const {funUser, loading, GetCurrentUserType, userType} = FunUserAuth();
    useEffect(()=>{
        GetCurrentUserType()
        console.log("localstorage", window.localStorage.getItem('login'))
    })
    
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