

import { EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { auth } from "../../../firebase"
import { FunLightButton } from "../../CommonComponents"
import "./FunChangePassword.css"
export const FunForgotPassword = () => {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const onChangePost = (e) => {
        e.preventDefault()
        if (email) {
            sendPasswordResetEmail(auth, email).then((res)=>{
                setError("Reset Email Sent!!")
            }, (err)=> console.log(err))
        }
    }
    
    return (
        <div className="fun__changePasswordWrapper">
            <div className="fun__changePassword">
                <form className="vid__uploadForm" onSubmit={onChangePost}>
                    <h3>Reset Password</h3>
                    <p>Please enter your registered email to get reset password link.</p>
                    <div className="vid__uploadInput">
                        <label>Email</label>
                        <input className='vid__uploadTitle' type={`email`} onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className="vid__sendReset">
                        <p>{error ? error : "" }</p>
                        <FunLightButton btnLabel={"Send Link"} />
                    </div>
                </form>
            </div>
        </div>
    )
}