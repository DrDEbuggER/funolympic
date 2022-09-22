

import { EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { auth } from "../../../firebase"
import { FunLightButton } from "../../CommonComponents"
import "./FunChangePassword.css"
export const FunChangePassword = () => {
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const onChangePost = (e) => {
        e.preventDefault()
        if (password) {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                password
            )
            console.log("auth",auth, password)
            reauthenticateWithCredential(auth.currentUser, credential).then((cred)=>{
                sendPasswordResetEmail(auth, auth.currentUser.email).then((res)=>{
                    setError("Reset Email Sent!!")
                }, (err)=> console.log(err))
            },(err)=>setError("Wrong Password"))
        }
    }
    
    return (
        <div className="fun__changePasswordWrapper">
            <div className="fun__changePassword">
                <form className="vid__uploadForm" onSubmit={onChangePost}>
                    <h3>Change Password</h3>
                    <p>Please enter your current email and password to change new password.</p>
                    <div className="vid__uploadInput">
                        <label>Current Email</label>
                        <input className='vid__uploadTitle' value={auth.currentUser.email} disabled></input>
                    </div>
                    <div className="vid__uploadInput">
                        <label>Current Password</label>
                        <input className='vid__uploadTitle' onChange={(e)=>setPassword(e.target.value)} required></input>
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