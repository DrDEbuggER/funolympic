import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FunBroadcastMain, FunBroadcastNavBar, FunHighlights, FunLiveGames, FunLogout } from "../../Components"
import { auth, firestore } from "../../firebase";

import "./FunBroadcast.css";

export const FunBroadcast = ({pageName}) => {
    const [userName, setUserName] = useState()

    const GetCurrentUser = () => {
        const userQuery = query(collection(firestore, "users"), where("uuid", "==", auth.currentUser.uid))
        onSnapshot(userQuery,(snap)=>{
            setUserName(snap.docs[0].data().userName)
        })
    }

    useEffect(()=>{
        GetCurrentUser()
    },[])

    return (
        <div className="fun__broadcastContainer">
            <div className="fun__broadcastNav">
                <FunBroadcastNavBar navColor="#6A0DAD" userName={userName}/>
            </div>
            <div className="fun__broadcastBody">
                {   pageName === "home" ? <FunBroadcastMain /> :
                    pageName === "live" ? <FunLiveGames /> :
                    pageName === "score" ? <h1> Score </h1> :
                    pageName === "news" ? <h1> news </h1> : 
                    pageName === "highlights" ? <FunHighlights />:
                    pageName === "profile"? <h1>Profile</h1> :
                    pageName === "logout"? <FunLogout /> :
                    pageName === "watch" ? <h1> Watch </h1> : 
                    pageName === "changepass" ? <h1>Change Password</h1>:
                    <h1> Page Not found </h1>
                }
            </div>
        </div>
    )
}