import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { FunUserAuth } from "../../../FunContext";


export const FunLogout = () => {
    const {funLogout} = FunUserAuth();
    const {logout} = FunUserAuth();
    useEffect(()=>{
        funLogout()
    })
    return (
        <div>
        </div>
    )
}