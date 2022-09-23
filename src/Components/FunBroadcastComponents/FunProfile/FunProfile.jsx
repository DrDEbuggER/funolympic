

import { EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail } from "firebase/auth"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, firestore } from "../../../firebase"
import { FunLightButton } from "../../CommonComponents"
import "./FunProfile.css"
export const FunProfile = () => {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [currentUser, setCurrentUser] = useState("")
    const onChangePost = (e) => {
        e.preventDefault()
        if (email) {
            sendPasswordResetEmail(auth, "john.sherchan10@gmail.com").then((res)=>{
                setError("Reset Email Sent!!")
            }, (err)=> console.log(err))
        }
    }


    const GetCurrentUser = () => {
        const userQuery = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
        onSnapshot(userQuery, (snap) => {
            setCurrentUser(snap.docs[0].data())
        })
    }


    useEffect(()=> {
        GetCurrentUser()
        console.log("curr",currentUser)
    },[])
    
    return (
        <div className="fun__changePasswordWrapper">
            <div className="fun__changePassword">
                <form className="vid__uploadForm" onSubmit={onChangePost}>
                    <h3>User Preferences</h3>
                    <p>All User Details.</p>
                    <div className="vid__uploadInput">
                        <label>Username</label>
                        <input className='vid__uploadTitle' type={`text`} value={currentUser && currentUser.userName} onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className="vid__uploadInput">
                        <label>FullName</label>
                        <input className='vid__uploadTitle' type={`text`} value={currentUser &&  currentUser.fullName} onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className="vid__uploadInput">
                        <label>Email</label>
                        <input className='vid__uploadTitle' type={`email`} value={currentUser && currentUser.email} onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className="vid__uploadInput">
                        <label>Country</label>
                        <input className='vid__uploadTitle' type={`text`} value={currentUser &&  currentUser.country} onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className="vid__uploadInput">
                        <label>Status</label>
                        <input className='vid__uploadTitle' type={`text`} value={currentUser &&  currentUser.status} onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className="vid__sendReset">
                        <p>{error ? error : "" }</p>
                        {/* <FunLightButton btnLabel={"Send Link"} /> */}
                    </div>
                </form>
            </div>
        </div>
    )
}