
import { FunVideoPlayer } from "../../CommonComponents"
import { FunChatBox } from "../FunChatBox"
import { FunCardBox } from "../FunOlympicAtoms"
import "./FunBroadcastMain.css"
export const FunBroadcastMain = () => {
    return (
        <div className="fun__broadcastMain">
            <div className="fun__boradcastHeader">
                <h1>ALL broadcast </h1>
            </div>
            <div className="fun__broadcastMainWrapper">
                <div className="fun__broadcastLiveWatch">
                    <FunVideoPlayer url="https://www.youtube.com/watch?v=jzJW0gTYB9k"/>
                </div>
                <div className="fun__broadcastChatBox">
                    <FunChatBox game="football"/>
                </div>
            </div>
        </div>
    )
}