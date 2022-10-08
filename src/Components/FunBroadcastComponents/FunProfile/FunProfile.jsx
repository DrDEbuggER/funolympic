

import { EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail } from "firebase/auth"
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { useRef } from "react"
import { useEffect, useState } from "react"
import { auth, firestore } from "../../../firebase"
import { FunLightButton } from "../../CommonComponents"
import "./FunProfile.css"
export const FunProfile = ({userType, isDashBoard}) => {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [fullName, setFullName] = useState("")
    const [country, setCountry] = useState("")
    const [docID, setDocID] = useState("")
    const [currentUser, setCurrentUser] = useState("")
    const isUserExist = useRef(false)
    const isUniqueUsername = async(userName) => {
        const userRef = query(collection(firestore, "users"), where("userName", "==", userName))
        await getDocs(userRef).then((snap)=> {
            if (snap.docs.length > 0) {
                isUserExist.current = true
            } else {
                isUserExist.current = false
            } 
        })
        return isUserExist.current
    }

    const onChangePost = (e) => {
        e.preventDefault()
        setError("")
        if (email && userName && fullName && country) {
            isUniqueUsername(userName).then(async(res)=> {
                if(res) {
                    setError("Username already taken")
                    return
                }   
                if (docID) {
                    const docRef = doc(firestore, "users", docID)
                    await updateDoc(docRef, {
                        email: email,
                        userName: userName,
                        fullName: fullName,
                        country: country
                    }).then((res)=>{
                        setError("Profile Updated !!")
                    }, (err) => {setError("Failed to update Profile :/")})
                } else {
                    setError("Error connecting firebase")
                }
            })
        } else {
            setError("Please check all the fields")
        }
        
    }


    const GetCurrentUser = async() => {
        const userQuery = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
        // onSnapshot(userQuery, (snap) => {
        //     setCurrentUser(snap.docs[0].data())
        // })
        await getDocs(userQuery).then((snap)=>{
            setCurrentUser(snap.docs[0].data())
            setEmail(snap.docs[0].data().email)
            setUserName(snap.docs[0].data().userName)
            setFullName(snap.docs[0].data().fullName)
            setCountry(snap.docs[0].data().country)
            setDocID(snap.docs[0].id)
        })
    }


    useEffect(()=> {
        GetCurrentUser()
    },[])
    
    return (
        <div className="fun__changePasswordWrapper">
            <div className="fun__changePassword">
                <form className="vid__uploadForm" onSubmit={onChangePost}>
                    <h3>{`${userType} Profile`}</h3>
                    <p>{`${userType} Details`}</p>
                    <div className="vid__uploadInput">
                        <label>Username</label>
                        <input className='vid__uploadTitle' type={`text`} onChange={(e)=>setUserName(e.target.value)} value={userName}  required></input>
                    </div>
                    <div className="vid__uploadInput">
                        <label>FullName</label>
                        <input className='vid__uploadTitle' type={`text`} onChange={(e)=>setFullName(e.target.value)} value={fullName} required></input>
                    </div>
                    <div className="vid__uploadInput">
                        <label>Email</label>
                        <input className='vid__uploadTitle' type={`email`} onChange={(e)=>setEmail(e.target.value)} value={email} required></input>
                    </div>
                    <div className="vid__uploadInput">
                        <label>Country</label>
                        <input className='vid__uploadTitle' type={`text`} onChange={(e)=>setCountry(e.target.value)} value={country} required></input>
                    </div>
                    <div className="fun__userStat">
                        <div className="fun__userStatus">
                            <label>Status: </label>
                            <p>{currentUser.status}</p>
                            {/* <input className='vid__uploadTitle' type={`text`} value={currentUser &&  currentUser.status} onChange={(e)=>setEmail(e.target.value)}></input> */}
                        </div>
                        {
                            isDashBoard ?
                                <div className="fun__userStatus">
                                    <label>User Type: </label>
                                    <p>{currentUser.userType}</p>
                                </div>
                                :""
                        }
                    </div>
                    
                    <div className="vid__sendReset">
                        <p>{error ? error : "" }</p>
                        <FunLightButton btnLabel={"Update"} />
                    </div>
                </form>
            </div>
        </div>
    )
}