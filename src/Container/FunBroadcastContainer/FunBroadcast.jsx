import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BannedComponent, FunBroadcastMain, FunBroadcastNavBar, FunChangePassword, FunHighlights, FunLiveGames, FunLogout, FunNavBar, FunNews, FunProfile, FunResultsMain, FunScore } from "../../Components"
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
        if (auth.currentUser) {
            GetCurrentUser()
        }
        
    },[])

    return (
        <div className="fun__broadcastContainer">
            <div className="fun__broadcastNav">
                {
                    auth.currentUser && userName ? 
                        <FunBroadcastNavBar navColor="#6A0DAD" userName={userName}/>
                        :
                        <FunNavBar />
                }
                
            </div>
            <div className="fun__broadcastBody">
                {   pageName === "home" ? <FunBroadcastMain /> :
                    pageName === "live" ? <FunLiveGames /> :
                    pageName === "score" ? <FunResultsMain /> :
                    pageName === "news" ? <FunNews /> : 
                    pageName === "highlights" ? <FunHighlights />:
                    pageName === "profile"? <FunProfile userType={`User`} isDashBoard={false}/> :
                    pageName === "logout"? <FunLogout /> :
                    pageName === "watch" ? <FunBroadcastMain /> : 
                    pageName === "hWatch" ? <FunHighlights /> : 
                    pageName === "hNews" ? <FunNews /> : 
                    pageName === "changepass" ? <FunChangePassword />:
                    pageName === "banned" ? <BannedComponent />:
                    <h1> Page Not found </h1>
                }
            </div>
        </div>
    )
}