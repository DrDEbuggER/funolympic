import { FunBroadcastMain, FunBroadcastNavBar } from "../../Components"

import "./FunBroadcast.css";

export const FunBroadcast = ({pageName}) => {
    return (
        <div className="fun__broadcastContainer">
            <div className="fun__broadcastNav">
                <FunBroadcastNavBar navColor="#6A0DAD" btnText="Logout" toPage="/logout"/>
            </div>
            <div className="fun__broadcastBody">
                {   pageName === "home" ? <FunBroadcastMain /> :
                    pageName === "score" ? <h1> Score </h1> :
                    pageName === "news" ? <h1> news </h1> : 
                    pageName === "highlights" ? <h1> highlights </h1>:
                    pageName === "profile"? <h1>Profile</h1> :
                    pageName === "watch" ? <h1> Watch </h1> : 
                    <h1> Page Not found </h1>
                }
            </div>
        </div>
    )
}